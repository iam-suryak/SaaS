import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useDashboard } from '../../context/DashboardContext';

export default function Layout({ children }) {
  const { sidebarExpanded, currentView } = useDashboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Full-screen auth pages (Images 1, 2, 3, 4) without sidebar/header
  if (['login', 'signup', 'recover', 'confirm'].includes(currentView)) {
    return <div className="min-h-screen bg-[#F4F5F9]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content Container */}
      <div
        className={`flex-1 transition-all duration-300 min-h-screen flex flex-col ${
          sidebarExpanded ? 'md:ml-[220px]' : 'md:ml-20'
        }`}
      >
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] w-full mx-auto">
          <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
          {children}
        </main>
      </div>
    </div>
  );
}
