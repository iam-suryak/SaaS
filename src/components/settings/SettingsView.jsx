import React, { useState, useRef } from 'react';
import { User, Bell, Lock, Shield, Check, Sparkles, Camera } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import avatarImg from '../../Images/avatar.png';

export default function SettingsView() {
  const { currentUser, setCurrentUser, setIsUpgradeModalOpen } = useDashboard();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentUser(prev => ({ ...prev, avatar: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetAvatar = () => {
    setCurrentUser(prev => ({ ...prev, avatar: avatarImg }));
  };

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReport: true,
    newOrders: true,
    marketing: false
  });

  const handleSave = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({ ...prev, name, email }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#F0F2F8] pb-4">
        {[
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security & Password', icon: Lock },
          { id: 'billing', label: 'Billing & Plan', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-500 text-white shadow-glow'
                  : 'bg-white text-content-muted hover:text-content-title border border-[#F0F2F8]'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] max-w-3xl">
          <h3 className="text-lg font-bold text-content-title mb-1">Personal Information</h3>
          <p className="text-xs text-content-muted mb-6">Update your personal and contact details</p>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Avatar section */}
            <div className="flex items-center gap-5 pb-6 border-b border-[#F0F2F8]">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <img
                  src={currentUser.avatar || avatarImg}
                  alt="Profile"
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-100 shadow-sm"
                />
                <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera size={18} />
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <div>
                <h4 className="font-bold text-sm text-content-title">{currentUser.name}</h4>
                <p className="text-xs text-content-muted">{currentUser.plan}</p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-brand-500 font-bold hover:underline"
                  >
                    Upload New Avatar
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={handleResetAvatar}
                    className="text-[11px] text-slate-500 font-medium hover:text-slate-800"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-content-title mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-content-title mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                defaultValue="Lead UI/UX Product Designer"
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#F0F2F8]">
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                  <Check size={14} /> Changes saved successfully!
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-glow transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] max-w-3xl space-y-5">
          <h3 className="text-lg font-bold text-content-title mb-1">Notification Preferences</h3>
          <p className="text-xs text-content-muted mb-6">Choose how and when you want to receive alerts</p>

          {[
            { key: 'emailAlerts', title: 'Email Alerts', desc: 'Receive real-time notifications about system events' },
            { key: 'weeklyReport', title: 'Weekly Reports', desc: 'Summary of orders, invoices, and analytics' },
            { key: 'newOrders', title: 'Order Notifications', desc: 'Get alerted when a customer creates a new purchase' },
            { key: 'marketing', title: 'Product Updates', desc: 'News about new features and product enhancements' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-[#F0F2F8] last:border-none">
              <div>
                <h4 className="font-bold text-sm text-content-title">{item.title}</h4>
                <p className="text-xs text-content-muted mt-0.5">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                checked={notifications[item.key]}
                onChange={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                className="w-5 h-5 rounded text-brand-500 focus:ring-brand-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] max-w-3xl space-y-6">
          <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 text-white">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">Current Plan</span>
              <h3 className="text-2xl font-black mt-2">{currentUser.plan}</h3>
              <p className="text-xs opacity-90 mt-1">Unlock all 22 Figma dashboard modules & unlimited exports.</p>
            </div>
            <button
              onClick={() => setIsUpgradeModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-white text-brand-600 font-bold text-xs shadow-md hover:bg-slate-50 transition-colors"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] max-w-3xl space-y-4">
          <h3 className="text-lg font-bold text-content-title mb-1">Security & Password</h3>
          <p className="text-xs text-content-muted mb-6">Manage authentication credentials</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-content-title mb-1">Current Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-content-title mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs" />
            </div>
            <button className="px-6 py-2.5 rounded-xl bg-brand-500 text-white text-xs font-bold shadow-glow">
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
