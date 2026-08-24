"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Code2, 
  Briefcase, 
  MessageSquare, 
  FileText, 
  BarChart, 
  Box, 
  Bookmark, 
  TrendingUp, 
  Bell, 
  Settings,
  Search,
  Menu,
  X,
  Flame,
  BrainCircuit,
  LogOut
} from 'lucide-react';
import './dashboard.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('placement_user_profile');
      window.location.href = '/auth?mode=login';
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'DSA', path: '/dashboard/dsa', icon: Code2 },
    { name: 'Companies', path: '/dashboard/companies', icon: Briefcase },
    { name: 'Interview Questions', path: '/dashboard/interviews', icon: MessageSquare },
    { name: 'Resume Analyzer', path: '/dashboard/resume', icon: FileText },
    { name: 'ATS Reports', path: '/dashboard/ats', icon: BarChart },
    { name: 'Coding Platforms', path: '/dashboard/platforms', icon: Box },
    { name: 'Bookmarks', path: '/dashboard/bookmarks', icon: Bookmark },
    { name: 'Progress', path: '/dashboard/progress', icon: TrendingUp },
  ];

  const bottomItems = [
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar glass-panel ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <BrainCircuit color="var(--color-primary)" />
          <span>PlacementAI</span>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-nav">
          <div className="nav-group">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="nav-group bottom-group">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <button 
              onClick={handleLogout} 
              className="sidebar-link logout-btn"
              style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="dashboard-main">
        {/* Topbar */}
        <header className="topbar glass-panel">
          <div className="topbar-left">
            <button className="mobile-toggle" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} color="var(--color-on-surface-variant)" />
              <input type="text" placeholder="Search for companies, questions, topics..." />
            </div>
          </div>
          
          <div className="topbar-right">
            <div className="streak-badge">
              <Flame size={18} color="#ff9800" />
              <span>12 Day Streak</span>
            </div>
            <button className="icon-btn" title="Notifications">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <button className="icon-btn logout-topbar-btn" onClick={handleLogout} title="Logout">
              <LogOut size={18} color="#ff4d4d" />
            </button>
            <div className="profile-avatar" title="Account">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}
