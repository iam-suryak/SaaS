import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function AnalyticsDonut() {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // SVG dimensions for Donut
  const size = 230;
  const center = size / 2;
  const strokeWidth = 24;
  const radius = 76;
  const circumference = 2 * Math.PI * radius; // ~477.52

  // Segments matching 80% gauge in Figma
  // Segment lengths adjusted for round caps to create clean separation
  const segments = [
    {
      name: 'Sale',
      percent: 40,
      color: '#4379EE',
      length: 155,
      offset: 0,
    },
    {
      name: 'Distribute',
      percent: 25,
      color: '#FFC542',
      length: 110,
      offset: -(155 + 16),
    },
    {
      name: 'Return',
      percent: 15,
      color: '#FF6B4A',
      length: 62,
      offset: -(155 + 16 + 110 + 16),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-content-title tracking-tight font-sans">
          Analytics
        </h2>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-content-muted hover:text-content-title p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <MoreHorizontal size={20} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-soft-lg border border-[#F0F2F8] p-1.5 z-20 animate-fade-in">
              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-content-body hover:bg-slate-50"
              >
                Export Report
              </button>
              <button
                onClick={() => setDropdownOpen(false)}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-content-body hover:bg-slate-50"
              >
                View Analytics
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative flex items-center justify-center my-auto py-2">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-[50deg] select-none"
        >
          {/* Subtle Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#EEF2F8"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Slices with rounded caps */}
          {segments.map((seg) => {
            const isHovered = hoveredSegment === seg.name;
            return (
              <circle
                key={seg.name}
                cx={center}
                cy={center}
                r={radius}
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                strokeDasharray={`${seg.length} ${circumference}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredSegment(seg.name)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </svg>

        {/* Center Text: 80% Transactions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-[32px] font-extrabold text-[#1B2559] tracking-tight font-sans leading-none">
            {hoveredSegment
              ? `${segments.find((s) => s.name === hoveredSegment)?.percent}%`
              : '80%'}
          </span>
          <span className="text-xs font-medium text-[#8F9BBA] mt-1.5">
            {hoveredSegment || 'Transactions'}
          </span>
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="flex items-center justify-center gap-6 pt-3 select-none">
        {segments.map((seg) => {
          const isHovered = hoveredSegment === seg.name;
          return (
            <button
              key={seg.name}
              onMouseEnter={() => setHoveredSegment(seg.name)}
              onMouseLeave={() => setHoveredSegment(null)}
              className={`flex items-center gap-2 text-xs font-medium transition-all ${
                isHovered
                  ? 'text-[#1B2559] font-bold scale-105'
                  : 'text-[#718096] hover:text-[#1B2559]'
              }`}
            >
              <span
                className="w-3.5 h-2 rounded-full shrink-0 transition-transform"
                style={{ backgroundColor: seg.color }}
              />
              <span>{seg.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
