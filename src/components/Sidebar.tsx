// src/components/Sidebar.tsx
import React, { useState } from 'react';
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
  LineChart,
  ChevronLeft,
  ChevronRight,
  History,
} from 'lucide-react';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
};

const NavItem = ({ to, icon, label, active, collapsed }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all relative group",
      active 
        ? "bg-app-light-purple text-white font-medium" 
        : "text-gray-600 hover:bg-gray-100"
    )}
    title={collapsed ? label : undefined}
  >
    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    {!collapsed && <span className="whitespace-nowrap">{label}</span>}
    {collapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const navItems = [
    { to: "/dashboard",       icon: <Home size={18} />,           label: "Dashboard" },
    { to: "/watchlist",       icon: <Star size={18} />,           label: "Watchlist" },
    { to: "/stock-analysis",  icon: <BarChart2 size={18} />,      label: "Stock Analysis" },
    { to: "/charting",        icon: <LineChart size={18} />,      label: "Charting" },
    { to: "/show-historical", icon: <History size={18} />,        label: "Historical Data" },
    { to: "/options-trading", icon: <FileSpreadsheet size={18} />, label: "Options Trading" },
    { to: "/backtesting",     icon: <Clock size={18} />,          label: "Backtesting" },
    { to: "/learning",        icon: <School size={18} />,         label: "Learning Hub" },
    { to: "/practice",        icon: <Edit3 size={18} />,          label: "Practice" },
    { to: "/risk-calculator", icon: <CreditCard size={18} />,     label: "Risk Calculator" },
    { to: "/crypto",          icon: <BookOpen size={18} />,        label: "Crypto & Bonds" },
    { to: "/settings",        icon: <Settings size={18} />,        label: "Settings" },
  ];

  // Determine if sidebar should appear expanded (either not collapsed or hovered when collapsed)
  const isExpanded = !collapsed || (collapsed && hovered);

  return (
    <div 
      className={cn(
        "h-full bg-white border-r flex flex-col transition-all duration-300 relative",
        isExpanded ? "w-56" : "w-16"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={cn(
        "p-3 flex items-center",
        isExpanded ? "justify-between" : "justify-center"
      )}>
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-2",
            isExpanded ? "flex-1 min-w-0" : "justify-center"
          )}
        >
          <img 
            src="/lovable-uploads/9c884c7d-61d5-4f77-afd9-d6b2d00e9c68.png" 
            alt="Avatar" 
            className="w-8 h-8 object-cover flex-shrink-0"
          />
          {isExpanded && (
            <h1 className="text-lg font-semibold text-app-purple whitespace-nowrap overflow-hidden text-ellipsis">
              Stock Trading App
            </h1>
          )}
        </Link>
        {isExpanded && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors flex-shrink-0 ml-2"
            aria-label={collapsed ? "Keep sidebar expanded" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>
      
      <div className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={pathname === item.to}
            collapsed={!isExpanded}
          />
        ))}
      </div>
      
      {isExpanded && (
        <div className="p-4 text-xs text-gray-500 border-t">
          <p>Developed by:</p>
          <p>Tobias Strauss</p>
          <p>Jaxon Holden</p>
          <p>Lars Dukart</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
