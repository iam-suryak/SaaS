import React from 'react';
import StatCard from './StatCard';
import ReportsChart from './ReportsChart';
import AnalyticsDonut from './AnalyticsDonut';
import RecentOrdersTable from './RecentOrdersTable';
import TopSellingProducts from './TopSellingProducts';
import { useDashboard } from '../../context/DashboardContext';

export default function DashboardView() {
  const { kpis } = useDashboard();

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* 4 Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      {/* Middle Row: Reports Spline Chart (2/3) + Analytics Donut (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ReportsChart />
        </div>
        <div className="lg:col-span-4">
          <AnalyticsDonut />
        </div>
      </div>

      {/* Bottom Row: Recent Orders Table (2/3) + Top Selling Products (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <RecentOrdersTable />
        </div>
        <div className="lg:col-span-4">
          <TopSellingProducts />
        </div>
      </div>
    </div>
  );
}
