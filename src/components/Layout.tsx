import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // FIX: Move useEffect hook before any conditional returns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    // Only add listener if menu might be open or dropdown exists
    // However, to strictly follow rules of hooks, the effect itself runs,
    // but its internal logic can be conditional.
    // For this specific case, the listener is for the dropdown, which is always rendered.
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []); // dropdownRef is stable, so empty dependency array is fine here.

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-app-light-gray">
      <Sidebar />
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Header */}
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
                    onClick={() => setMenuOpen(false)} // Close menu on navigation
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)} // Close menu on navigation
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false); // Close menu
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