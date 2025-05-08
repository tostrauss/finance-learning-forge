import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, logout, loading } = useAuth(); // ✅ includes loading state
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Delay rendering until Firebase auth state is fully known
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-app-light-gray">
      <Sidebar />
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Top header */}
        <div className="flex justify-end items-center p-4 bg-white border-b relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="px-4 py-2 bg-app-pink hover:bg-app-pink/90 text-white rounded"
              >
                {user.displayName || user.email || 'User'}
              </button>
              {menuOpen && (
                <div className="absolute right-4 top-full mt-2 w-40 bg-white border rounded shadow-lg z-10">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/signin');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-x-2">
              <Link to="/signup">
                <Button variant="default" className="bg-app-pink hover:bg-app-pink/90 text-white">
                  Sign Up
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="default" className="bg-app-green hover:bg-app-green/90 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Page content */}
        <div className="p-6 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
