import React, { useState } from 'react';
import { ChevronDown, Plus, MoreHorizontal } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import AddProductModal from './AddProductModal';
import {
  initialProductKpis,
  initialProductAddByMonth,
  initialProductSalesAnalytics,
  donutCenterTrend
} from '../../data/mockData';

export default function ProductAnalytics() {
  const {
    analyticsTab,
    setAnalyticsTab,
    setCurrentView,
    topSellingProducts,
    isAddProductOpen,
    setIsAddProductOpen,
    dateRange,
    setDateRange
  } = useDashboard();

  const [dateFrom, setDateFrom] = useState(dateRange?.from || '10-06-2021');
  const [dateTo, setDateTo] = useState(dateRange?.to || '10-10-2021');
  const [menuOpen, setMenuOpen] = useState(false);

  // Caret Icon component matching Figma
  const CaretDown = () => (
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="inline-block text-[#A3AED0] shrink-0 ml-1">
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header: Title & Date Pickers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-[#1E293B] tracking-tight">
          Product Analytics
        </h1>

        {/* Date Pickers */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-[#F0F2F8] shadow-soft-sm text-xs font-medium text-slate-700 cursor-pointer hover:border-slate-300 transition-colors">
              <span>{dateFrom}</span>
              <ChevronDown size={14} className="text-[#A3AED0]" />
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-[#F0F2F8] shadow-soft-sm text-xs font-medium text-slate-700 cursor-pointer hover:border-slate-300 transition-colors">
              <span>{dateTo}</span>
              <ChevronDown size={14} className="text-[#A3AED0]" />
            </div>
          </div>
        </div>
      </div>

      {/* Sub Bar: Product / Customer Toggle Pill & Add Product Button */}
      <div className="flex items-center justify-between">
        {/* Toggle Pills */}
        <div className="flex items-center bg-white p-1 rounded-xl shadow-soft-sm border border-[#F0F2F8]">
          <button
            onClick={() => {
              setAnalyticsTab('product');
              setCurrentView('analytics');
            }}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              analyticsTab === 'product'
                ? 'bg-[#4379EE] text-white shadow-soft'
                : 'text-[#718096] hover:text-[#1E293B]'
            }`}
          >
            Product
          </button>
          <button
            onClick={() => {
              setAnalyticsTab('customer');
              setCurrentView('customers');
            }}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              analyticsTab === 'customer'
                ? 'bg-[#4379EE] text-white shadow-soft'
                : 'text-[#718096] hover:text-[#1E293B]'
            }`}
          >
            Customer
          </button>
        </div>

        {/* + Add Product Button */}
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.98] text-white text-xs font-bold shadow-soft transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Product</span>
        </button>
      </div>

      {/* Main Grid: Left Column (8 cols) + Right Column (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 2 KPI Cards + Top Selling Products Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Row: Two Wave Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Card 1: Total Product */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={initialProductKpis.totalProduct.icon}
                    alt="Total Product"
                    className="w-10 h-10 object-contain shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#8F9BBA]">
                      {initialProductKpis.totalProduct.title}
                    </p>
                    <h3 className="text-2xl font-bold text-[#1E293B] mt-0.5">
                      {initialProductKpis.totalProduct.value}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#10B981] bg-[#E8F8F0] whitespace-nowrap">
                  {initialProductKpis.totalProduct.badge}
                </span>
              </div>

              {/* Blue Wave Chart */}
              <div className="mt-4 -mx-6 -mb-6">
                <svg className="w-full h-14 overflow-visible" viewBox="0 0 300 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="tpBlueWaveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4379EE" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#4379EE" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,38 C 40,38 70,26 110,26 C 150,26 180,12 220,12 C 255,12 275,22 300,10 L 300,50 L 0,50 Z"
                    fill="url(#tpBlueWaveGrad)"
                  />
                  <path
                    d="M 0,38 C 40,38 70,26 110,26 C 150,26 180,12 220,12 C 255,12 275,22 300,10"
                    fill="none"
                    stroke="#4379EE"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Card 2: Total Sales */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <img
                    src={initialProductKpis.totalSales.icon}
                    alt="Total Sales"
                    className="w-10 h-10 object-contain shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#8F9BBA]">
                      {initialProductKpis.totalSales.title}
                    </p>
                    <h3 className="text-2xl font-bold text-[#1E293B] mt-0.5">
                      {initialProductKpis.totalSales.value}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#10B981] bg-[#E8F8F0] whitespace-nowrap">
                  {initialProductKpis.totalSales.badge}
                </span>
              </div>

              {/* Yellow Wave Chart */}
              <div className="mt-4 -mx-6 -mb-6">
                <svg className="w-full h-14 overflow-visible" viewBox="0 0 300 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="tsGoldWaveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFC542" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FFC542" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0,32 C 35,32 65,36 100,36 C 135,36 160,20 200,20 C 240,20 265,32 300,24 L 300,50 L 0,50 Z"
                    fill="url(#tsGoldWaveGrad)"
                  />
                  <path
                    d="M 0,32 C 35,32 65,36 100,36 C 135,36 160,20 200,20 C 240,20 265,32 300,24"
                    fill="none"
                    stroke="#FFC542"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Card: Top Selling Products Table */}
          <div className="bg-white rounded-2xl p-6 shadow-soft border-2 border-[#4379EE]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#1E293B] tracking-tight">
                Top Selling Products
              </h2>
              <button className="text-xs text-[#4379EE] font-semibold hover:underline">
                See More
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b border-[#F0F2F8] text-[12px] font-semibold text-[#8F9BBA]">
                    <th className="py-3 px-3 w-16">
                      <div className="flex items-center">
                        <span>SN</span>
                        <CaretDown />
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center">
                        <span>Name</span>
                        <CaretDown />
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center">
                        <span>Price</span>
                        <CaretDown />
                      </div>
                    </th>
                    <th className="py-3 px-3">
                      <div className="flex items-center">
                        <span>Total Order</span>
                        <CaretDown />
                      </div>
                    </th>
                    <th className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end">
                        <span>Total Sales</span>
                        <CaretDown />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F9FD] text-xs">
                  {topSellingProducts.map((p, idx) => (
                    <tr key={p.id} className="hover:bg-[#F8F9FD] transition-colors group">
                      {/* SN Column: Medal icon or number */}
                      <td className="py-3 px-3">
                        {p.isMedal || idx < 3 ? (
                          <img
                            src={p.medalIcon || p.thumb}
                            alt="Medal"
                            className="w-5 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-[#718096] font-medium pl-1.5">
                            {p.sn || idx + 1}
                          </span>
                        )}
                      </td>

                      {/* Name with circular product icon */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.thumb}
                            alt={p.name}
                            className="w-8 h-8 rounded-full object-contain shrink-0 shadow-soft-sm"
                          />
                          <span className="font-semibold text-[#0062FF] hover:underline cursor-pointer whitespace-nowrap">
                            {p.name}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3 text-[#1E293B] font-medium whitespace-nowrap">
                        {p.price}
                      </td>

                      {/* Total Order */}
                      <td className="py-3 px-3 text-[#718096] font-medium whitespace-nowrap">
                        {p.totalOrder}
                      </td>

                      {/* Total Sales */}
                      <td className="py-3 px-3 text-right font-semibold text-[#10B981] whitespace-nowrap">
                        {p.totalSales}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Add by Month + Product Sales Analytics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Card: Product Add by Month */}
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE]">
            <h3 className="text-base font-bold text-[#1E293B] mb-5 tracking-tight">
              Product Add&nbsp; by Month
            </h3>

            {/* Horizontal Bar Chart */}
            <div className="space-y-3.5">
              {initialProductAddByMonth.map((item) => {
                const maxVal = 30000;
                const widthPercent = Math.round((item.value / maxVal) * 100);

                return (
                  <div key={item.month} className="flex items-center justify-between gap-3 text-xs">
                    <span className="w-8 text-[#8F9BBA] font-medium shrink-0">
                      {item.month}
                    </span>

                    <div className="flex-1 bg-slate-100/60 rounded-full h-2.5 overflow-hidden">
                      <div
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: item.color
                        }}
                        className="h-full rounded-full transition-all duration-500"
                      />
                    </div>

                    <span className="text-[#1E293B] font-semibold text-right w-14 shrink-0">
                      {item.display}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Card: Product Sales Analytics Donut */}
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#1E293B] tracking-tight">
                Product Sales Analytics
              </h3>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 text-[#A3AED0] hover:text-[#1E293B] rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Donut Chart with Center Trend Icon */}
            <div className="flex items-center justify-center my-4">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#F4F7FE"
                    strokeWidth="15"
                    fill="transparent"
                  />

                  {/* Total Sales (55% Blue #4379EE) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#4379EE"
                    strokeWidth="15"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.55)}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700"
                  />

                  {/* Total Order (30% Yellow #FFC542) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#FFC542"
                    strokeWidth="15"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.30)}
                    strokeLinecap="round"
                    fill="transparent"
                    transform={`rotate(${0.55 * 360} 80 80)`}
                    className="transition-all duration-700"
                  />

                  {/* Order Cancel (15% Coral #FF6B4A) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="58"
                    stroke="#FF6B4A"
                    strokeWidth="15"
                    strokeDasharray={2 * Math.PI * 58}
                    strokeDashoffset={2 * Math.PI * 58 * (1 - 0.15)}
                    strokeLinecap="round"
                    fill="transparent"
                    transform={`rotate(${(0.55 + 0.30) * 360} 80 80)`}
                    className="transition-all duration-700"
                  />
                </svg>

                {/* Center Badge with Trending Icon */}
                <div className="absolute flex items-center justify-center">
                  <img
                    src={donutCenterTrend}
                    alt="Trend"
                    className="w-12 h-12 object-contain select-none"
                  />
                </div>
              </div>
            </div>

            {/* Legend Pills */}
            <div className="flex items-center justify-center gap-4 text-xs mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4379EE]" />
                <span className="text-[#718096] font-medium">Total Sales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFC542]" />
                <span className="text-[#718096] font-medium">Total Order</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B4A]" />
                <span className="text-[#718096] font-medium">Order Cancel</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <AddProductModal onClose={() => setIsAddProductOpen(false)} />
      )}
    </div>
  );
}
