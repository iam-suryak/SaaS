import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import ReportsChart from '../dashboard/ReportsChart';
import AnalyticsDonut from '../dashboard/AnalyticsDonut';

export default function AnalyticsDeepDive() {
  const metrics = [
    { title: 'Total Revenue', value: '$84,250.00', change: '+14.2%', isPos: true, icon: DollarSign, color: '#605BFF', bg: '#F4F5FF' },
    { title: 'Total Customers', value: '42,890', change: '+8.7%', isPos: true, icon: Users, color: '#00CFDE', bg: '#E0F7FA' },
    { title: 'Total Transactions', value: '18,420', change: '-2.4%', isPos: false, icon: ShoppingCart, color: '#F59E0B', bg: '#FFF4EB' },
    { title: 'Conversion Rate', value: '3.84%', change: '+1.6%', isPos: true, icon: Activity, color: '#10B981', bg: '#E8F8F0' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.title} className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-content-muted">{m.title}</p>
                <h3 className="text-2xl font-bold text-content-title mt-1">{m.value}</h3>
                <div className="flex items-center gap-1.5 mt-2">
                  {m.isPos ? (
                    <TrendingUp size={14} className="text-emerald-500" />
                  ) : (
                    <TrendingDown size={14} className="text-rose-500" />
                  )}
                  <span className={`text-xs font-bold ${m.isPos ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {m.change}
                  </span>
                  <span className="text-[11px] text-content-muted">vs last month</span>
                </div>
              </div>

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: m.bg, color: m.color }}
              >
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ReportsChart />
        </div>
        <div className="lg:col-span-4">
          <AnalyticsDonut />
        </div>
      </div>
    </div>
  );
}
