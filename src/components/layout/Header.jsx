import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Menu, Search, Bell, Sparkles } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function Header({ onMobileMenuToggle }) {
  const { currentView, dateRange, setDateRange, setIsUpgradeModalOpen, currentUser } = useDashboard();
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  // Views that have their own custom top header from Figma designs
  const viewsWithOwnHeader = ['invoice', 'schedule', 'calendar', 'analytics', 'customers', 'products', 'messages'];

  // If the view has its own header, render only the mobile hamburger button on small screens
  if (viewsWithOwnHeader.includes(currentView)) {
    return (
      <div className="md:hidden pb-4 pt-1 flex items-center justify-between">
        <button
          onClick={onMobileMenuToggle}
          className="p-2.5 rounded-xl bg-white border border-[#E5E9F2] text-content-body hover:text-brand-500 shadow-sm"
        >
          <Menu size={20} />
        </button>
        <span className="font-bold text-sm text-[#1E293B] capitalize">
          {currentView}
        </span>
      </div>
    );
  }

  // Map view id to title
  const viewTitles = {
    dashboard: 'Dashboard',
    messages: 'Messages & Chat',
    notification: 'Notifications',
    settings: 'Settings & Preferences'
  };

  const dates = [
    '10-06-2021',
    '10-07-2021',
    '10-08-2021',
    '10-09-2021',
    '10-10-2021',
    '10-11-2021',
    '10-12-2021',
  ];

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 pt-2">
      {/* Left Title & Mobile Menu Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-xl bg-white border border-[#E5E9F2] text-content-body hover:text-brand-500 shadow-sm"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-2xl lg:text-[28px] font-bold text-content-title tracking-tight font-sans">
            {viewTitles[currentView] || 'Dashboard'}
          </h1>
          <p className="text-xs text-content-muted mt-0.5 md:hidden">
            Welcome back, {currentUser.name}
          </p>
        </div>
      </div>

      {/* Right Controls: Date Range Pickers (as seen in Figma) */}
      <div className="flex items-center gap-3 self-end md:self-auto">
        {/* From Date Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFromPicker(!showFromPicker);
              setShowToPicker(false);
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-[#F0F2F8] shadow-soft-sm text-xs font-semibold text-content-title hover:border-brand-300 transition-all"
          >
            <span>{dateRange.from}</span>
            <ChevronDown size={14} className="text-content-muted" />
          </button>

          {showFromPicker && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-soft-lg border border-[#F0F2F8] p-2 z-30 animate-fade-in">
              <p className="text-[11px] font-bold text-content-muted px-2 py-1 uppercase tracking-wider">Start Date</p>
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDateRange(prev => ({ ...prev, from: d }));
                    setShowFromPicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    dateRange.from === d ? 'bg-brand-50 text-brand-500 font-bold' : 'text-content-body hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To Date Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setShowToPicker(!showToPicker);
              setShowFromPicker(false);
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-[#F0F2F8] shadow-soft-sm text-xs font-semibold text-content-title hover:border-brand-300 transition-all"
          >
            <span>{dateRange.to}</span>
            <ChevronDown size={14} className="text-content-muted" />
          </button>

          {showToPicker && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-soft-lg border border-[#F0F2F8] p-2 z-30 animate-fade-in">
              <p className="text-[11px] font-bold text-content-muted px-2 py-1 uppercase tracking-wider">End Date</p>
              {dates.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDateRange(prev => ({ ...prev, to: d }));
                    setShowToPicker(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    dateRange.to === d ? 'bg-brand-50 text-brand-500 font-bold' : 'text-content-body hover:bg-slate-50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
