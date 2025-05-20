// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart2,
  BookOpen,
  Clock,
  CreditCard,
  FileSpreadsheet,
  Home,
  School,
  Settings,
  Star,
  Edit3,
} from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
};

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
      active 
        ? "bg-app-light-purple text-white font-medium" 
        : "text-gray-600 hover:bg-gray-100"
    )}
  >
    <div className="w-5 h-5 flex items-center justify-center">
      {icon}
    </div>
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const navItems = [
    { to: "/dashboard",       icon: <Home size={18} />,           label: "Dashboard" },
    { to: "/watchlist",       icon: <Star size={18} />,           label: "Watchlist" },
    { to: "/stock-analysis",  icon: <BarChart2 size={18} />,      label: "Stock Analysis" },
    { to: "/options-trading", icon: <FileSpreadsheet size={18} />, label: "Options Trading" },
    { to: "/backtesting",     icon: <Clock size={18} />,          label: "Backtesting" },
    { to: "/learning",        icon: <School size={18} />,         label: "Learning Hub" },
    { to: "/practice",        icon: <Edit3 size={18} />,          label: "Practice" },
    { to: "/risk-calculator", icon: <CreditCard size={18} />,     label: "Risk Calculator" },
    { to: "/crypto",          icon: <BookOpen size={18} />,        label: "Crypto & Bonds" },
    { to: "/settings",        icon: <Settings size={18} />,        label: "Settings" },
  ];

  return (
    <div className="h-full w-56 bg-white border-r flex flex-col">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/9c884c7d-61d5-4f77-afd9-d6b2d00e9c68.png" 
            alt="Avatar" 
            className="w-10 h-10 object-cover" 
          />
          <h1 className="text-xl font-semibold text-app-purple">Stock Trading App</h1>
        </Link>
      </div>
      
      <div className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={pathname === item.to}
          />
        ))}
      </div>
      
      <div className="p-4 text-xs text-gray-500 border-t">
        <p>Developed by:</p>
        <p>Tobias Strauss</p>
        <p>Jaxon Holden</p>
        <p>Lars Dukart</p>
      </div>
    </div>
);
}

export default Sidebar;
