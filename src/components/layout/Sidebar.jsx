import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

// Exact icons and assets extracted directly from the user's design image
import dashboardActiveIcon from '../../Images/icons/dashboard-active.png';
import dashboardIcon from '../../Images/icons/dashboard.png';
import analyticsIcon from '../../Images/icons/analytics.png';
import analyticsActiveIcon from '../../Images/icons/analytics-active.png';
import invoiceIcon from '../../Images/icons/board.png';
import invoiceActiveIcon from '../../Images/icons/board-active.png';
import scheduleIcon from '../../Images/icons/invoice.png';
import scheduleActiveIcon from '../../Images/icons/invoice-active.png';
import calendarIcon from '../../Images/icons/calendar.png';
import calendarActiveIcon from '../../Images/icons/calendar-active.png';
import messagesIcon from '../../Images/icons/activity.png';
import messagesActiveIcon from '../../Images/icons/activity-active.png';
import notificationIcon from '../../Images/icons/bell.png';
import notificationActiveIcon from '../../Images/icons/bell-active.png';
import settingsIcon from '../../Images/icons/settings.png';
import settingsActiveIcon from '../../Images/icons/settings-active.png';
import lampCardImg from '../../Images/lamp-card.png';
import avatarImg from '../../Images/avatar.png';
import logoutIcon from '../../Images/icons/logout.png';

export default function Sidebar() {
  const {
    currentView,
    setCurrentView,
    setAuthModal,
    setIsUpgradeModalOpen,
    sidebarExpanded,
    setSidebarExpanded,
    currentUser
  } = useDashboard();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: dashboardIcon,
      activeIcon: dashboardActiveIcon,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: analyticsIcon,
      activeIcon: analyticsActiveIcon,
    },
    {
      id: 'invoice',
      label: 'Invoice',
      icon: invoiceIcon,
      activeIcon: invoiceActiveIcon,
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: scheduleIcon,
      activeIcon: scheduleActiveIcon,
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: calendarIcon,
      activeIcon: calendarActiveIcon,
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: messagesIcon,
      activeIcon: messagesActiveIcon,
      badge: '49',
    },
    {
      id: 'notification',
      label: 'Notification',
      icon: notificationIcon,
      activeIcon: notificationActiveIcon,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: settingsIcon,
      activeIcon: settingsActiveIcon,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-[#F0F2F8] flex flex-col justify-between py-6 select-none shadow-soft-sm overflow-y-auto transition-all duration-300 ${
        sidebarExpanded ? 'w-[220px]' : 'w-20 items-center'
      }`}
    >
      <div>
        {/* Top: Base Logo & Title + Navigate Button Near Base */}
        {sidebarExpanded ? (
          <div className="flex items-center justify-between px-6 mb-7">
            <div
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-3.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-[#5F5BFF] flex items-center justify-center shrink-0 shadow-glow transition-transform group-hover:scale-105">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 13.5L8.5 16L15.5 10L21 13"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.5" cy="16" r="2" fill="white" />
                  <circle cx="15.5" cy="10" r="2" fill="white" />
                </svg>
              </div>
              <span className="text-[22px] font-bold text-[#1B2559] tracking-tight font-sans">
                Base
              </span>
            </div>

            {/* Navigate Button near Base (Collapse action) */}
            <button
              onClick={() => setSidebarExpanded(false)}
              className="w-7 h-7 rounded-lg bg-[#F8F9FD] hover:bg-[#F0F2FF] border border-[#E5E9F2] flex items-center justify-center text-[#8F9BBA] hover:text-[#605BFF] transition-all cursor-pointer shadow-2xs group"
              title="Collapse sidebar navigation"
              aria-label="Navigate sidebar collapse"
            >
              <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-6">
            <div
              onClick={() => setCurrentView('dashboard')}
              className="w-11 h-11 rounded-full bg-[#5F5BFF] flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 shadow-glow"
              title="Base Home"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 13.5L8.5 16L15.5 10L21 13"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="8.5" cy="16" r="2" fill="white" />
                <circle cx="15.5" cy="10" r="2" fill="white" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5 mt-2">
              <span
                onClick={() => setCurrentView('dashboard')}
                className="text-[#1B2559] font-bold text-base tracking-tight cursor-pointer font-sans"
              >
                Base
              </span>
              {/* Navigate Button near Base (Expand action) */}
              <button
                onClick={() => setSidebarExpanded(true)}
                className="w-5 h-5 rounded bg-[#F8F9FD] hover:bg-[#F0F2FF] border border-[#E5E9F2] flex items-center justify-center text-[#8F9BBA] hover:text-[#605BFF] transition-all cursor-pointer"
                title="Expand sidebar navigation"
                aria-label="Navigate sidebar expand"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}

        {/* Menu Navigation Items */}
        <nav className={`space-y-1 ${!sidebarExpanded ? 'w-full flex flex-col items-center' : ''}`}>
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <div key={item.id} className="relative group w-full">
                <button
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center transition-all duration-200 relative ${
                    sidebarExpanded
                      ? 'gap-3.5 px-6 py-3 text-sm font-medium'
                      : 'h-12 justify-center px-0'
                  } ${
                    isActive
                      ? sidebarExpanded
                        ? 'bg-gradient-to-r from-[#F0F2FF] to-transparent text-[#605BFF] font-semibold'
                        : 'bg-[#F2F1FF] text-[#635FFF]'
                      : 'text-[#8F9BBA] hover:text-[#1B2559] hover:bg-slate-50/70'
                  }`}
                  title={!sidebarExpanded ? item.label : undefined}
                >
                  {/* Active Left Pill */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 bg-[#605BFF] rounded-r-md" />
                  )}

                  {/* Icon Image */}
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    <img
                      src={isActive ? item.activeIcon : item.icon}
                      alt={item.label}
                      className="w-5 h-5 object-contain"
                    />
                  </div>

                  {/* Label (when expanded) */}
                  {sidebarExpanded && (
                    <span className="truncate">{item.label}</span>
                  )}

                  {/* Red Badge for Messages if present */}
                  {item.badge && sidebarExpanded && (
                    <span className="ml-auto bg-[#FEECEB] text-[#EF4444] text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Tooltip on hover when collapsed */}
                {!sidebarExpanded && (
                  <div className="absolute left-20 top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-[#0F172A] text-white text-xs font-semibold rounded-xl shadow-soft-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-r-[#0F172A]" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Promo Card + User Profile */}
      <div className={`space-y-4 pt-4 ${sidebarExpanded ? 'px-5' : 'flex flex-col items-center'}`}>
        {/* Hanging Lamp Upgrade Card (shown when expanded) */}
        {sidebarExpanded ? (
          <div
            onClick={() => setIsUpgradeModalOpen(true)}
            className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.99]"
            title="Upgrade to Base Pro"
          >
            <img
              src={lampCardImg}
              alt="Upgrade Now"
              className="w-full h-auto drop-shadow-sm rounded-3xl"
            />
          </div>
        ) : null}

        {/* User Card */}
        <div
          className={`flex items-center justify-between border-t border-[#F0F2F8] pt-3 ${
            sidebarExpanded ? 'w-full' : 'flex-col gap-3'
          }`}
        >
          <div
            onClick={() => setCurrentView('settings')}
            className={`flex items-center gap-3 cursor-pointer overflow-hidden group ${
              !sidebarExpanded ? 'justify-center' : ''
            }`}
            title="Account Settings"
          >
            <img
              src={currentUser?.avatar || avatarImg}
              alt={currentUser?.name || "Easin Arafat"}
              className="w-10 h-10 rounded-2xl object-cover ring-1 ring-slate-100 group-hover:scale-105 transition-transform"
            />
            {sidebarExpanded && (
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-[#1B2559] truncate group-hover:text-[#605BFF] transition-colors">
                  {currentUser?.name || 'Easin Arafat'}
                </p>
                <p className="text-[11px] text-[#9CA3AF] truncate">
                  {currentUser?.plan || 'Free Account'}
                </p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setAuthModal('login')}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors group shrink-0"
            title="Sign Out"
          >
            <img
              src={logoutIcon}
              alt="Logout"
              className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
