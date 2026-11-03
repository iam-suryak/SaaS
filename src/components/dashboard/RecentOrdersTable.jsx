import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

import cameraThumb from '../../Images/dashboard/thumb-camera.png';
import dressThumb from '../../Images/dashboard/thumb-dress.png';
import arganThumb from '../../Images/dashboard/thumb-argan.png';
import parfumThumb from '../../Images/dashboard/thumb-parfum.png';

export default function RecentOrdersTable() {
  const { orders } = useDashboard();
  const [menuOpen, setMenuOpen] = useState(false);

  const getProductThumb = (type) => {
    switch (type) {
      case 'camera':
        return cameraThumb;
      case 'dress':
        return dressThumb;
      case 'bottle':
        return arganThumb;
      case 'perfume':
        return parfumThumb;
      default:
        return cameraThumb;
    }
  };

  // Caret Icon component matching Figma
  const CaretDown = () => (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="inline-block text-[#A3AED0] shrink-0">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-content-title tracking-tight font-sans">
          Recent Orders
        </h2>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-content-muted hover:text-content-title p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <MoreHorizontal size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-soft-lg border border-[#F0F2F8] p-1.5 z-20 animate-fade-in">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-content-body hover:bg-slate-50"
              >
                View All Orders
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-content-body hover:bg-slate-50"
              >
                Export CSV
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr className="border-b border-[#F0F2F8] text-[12px] font-semibold text-[#8F9BBA]">
              <th className="pb-3 pr-4 font-normal">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-content-title">
                  <span>Tracking no</span>
                  <CaretDown />
                </div>
              </th>
              <th className="pb-3 px-4 font-normal">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-content-title">
                  <span>Product Name</span>
                  <CaretDown />
                </div>
              </th>
              <th className="pb-3 px-4 font-normal">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-content-title">
                  <span>Price</span>
                  <CaretDown />
                </div>
              </th>
              <th className="pb-3 px-4 font-normal">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-content-title">
                  <span>Total Order</span>
                  <CaretDown />
                </div>
              </th>
              <th className="pb-3 pl-4 font-normal">
                <span>Total Amount</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8F9FD] text-xs font-medium text-content-body">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#F8F9FE]/60 transition-colors group"
              >
                {/* Tracking no */}
                <td className="py-3.5 pr-4 font-semibold text-[#1B2559]">
                  {order.trackingNo}
                </td>

                {/* Product Name with Exact High-Definition Thumbnail */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
                      <img
                        src={getProductThumb(order.imageType)}
                        alt={order.productName}
                        className="w-full h-full object-contain select-none"
                      />
                    </div>
                    <span className="font-semibold text-[#1B2559] group-hover:text-brand-500 transition-colors">
                      {order.productName}
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-3.5 px-4 text-[#1B2559] font-medium">
                  {order.price}
                </td>

                {/* Total Order (Cyan pill badge matching Figma) */}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center justify-center min-w-[50px] py-1 px-3 rounded-lg bg-[#E5F9F6] text-[#00B5B8] font-bold text-[11px]">
                    {order.totalOrder}
                  </span>
                </td>

                {/* Total Amount */}
                <td className="py-3.5 pl-4 font-semibold text-[#1B2559]">
                  {order.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
