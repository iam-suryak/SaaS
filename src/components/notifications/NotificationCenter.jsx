import React, { useState } from 'react';
import { Bell, Check, ShoppingBag, FileText, UserPlus, Sparkles, Trash2 } from 'lucide-react';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'New Order Received',
      desc: 'Order #876364 for Camera Lens was successfully placed ($1,46,660).',
      time: '10 minutes ago',
      icon: ShoppingBag,
      color: '#3B82F6',
      bg: '#EBF4FF',
      read: false
    },
    {
      id: 'n2',
      title: 'Invoice Paid',
      desc: 'Invoice #871345 from Anne Jacob was marked Complete ($2,890).',
      time: '1 hour ago',
      icon: FileText,
      color: '#10B981',
      bg: '#E8F8F0',
      read: false
    },
    {
      id: 'n3',
      title: 'New Customer Registered',
      desc: 'David Vance joined the platform under Acme Inc.',
      time: '3 hours ago',
      icon: UserPlus,
      color: '#8B5CF6',
      bg: '#EDE9FE',
      read: true
    },
    {
      id: 'n4',
      title: 'Weekly Performance Report Ready',
      desc: 'Your weekly analytics digest for sales and transactions has been generated.',
      time: 'Yesterday',
      icon: Sparkles,
      color: '#F59E0B',
      bg: '#FFF4EB',
      read: true
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-content-title">Notification Center</h2>
          <p className="text-xs text-content-muted mt-0.5">Stay updated on sales, invoices, and system alerts</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#F0F2F8] text-xs font-bold text-content-body hover:text-brand-500 transition-colors shadow-soft-sm"
          >
            <Check size={14} />
            <span>Mark all read</span>
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#F0F2F8] text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors shadow-soft-sm"
          >
            <Trash2 size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] divide-y divide-[#F8F9FD]">
        {notifications.length === 0 ? (
          <div className="text-center py-16 text-content-muted text-xs">
            No notifications right now. You're all caught up!
          </div>
        ) : (
          notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`py-4 px-3 flex items-start gap-4 rounded-xl transition-colors ${
                  !item.read ? 'bg-brand-50/20' : 'hover:bg-slate-50/60'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-content-title">{item.title}</h4>
                    <span className="text-[11px] text-content-muted">{item.time}</span>
                  </div>
                  <p className="text-xs text-content-muted mt-1 leading-relaxed">{item.desc}</p>
                </div>
                {!item.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500 mt-2 shrink-0"></span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
