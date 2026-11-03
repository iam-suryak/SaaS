import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function ReportsChart() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeframe, setTimeframe] = useState('Hourly');

  // Chart coordinates
  const width = 640;
  const height = 280;
  const padding = { top: 38, right: 25, bottom: 42, left: 45 };

  const chartWidth = width - padding.left - padding.right; // 570
  const chartHeight = height - padding.top - padding.bottom; // 200
  const baselineY = padding.top + chartHeight; // 238

  // 10 X-axis hourly ticks evenly distributed
  const xLabels = ['10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am'];
  const getTickX = (index) => padding.left + (index / (xLabels.length - 1)) * chartWidth;

  // 6 Y-axis ticks
  const yTicks = [100, 80, 60, 40, 20, 0];

  // Exact curve spline keyframes matching Figma screenshot (media_1793606381851_5be58faa.png)
  const keyframes = [
    { id: '10am',      xRatio: 0.0, val: 53, label: '10am',    sales: '1,420', hasDot: false },
    { id: '11am',      xRatio: 1.0, val: 31, label: '11am',    sales: '980',   hasDot: false },
    { id: '12am',      xRatio: 2.0, val: 57, label: '12am',    sales: '1,890', hasDot: true,  color: '#7C83FD' },
    { id: '01am',      xRatio: 3.0, val: 36, label: '01am',    sales: '1,240', hasDot: true,  color: '#8B5CF6' },
    { id: '02am',      xRatio: 3.8, val: 22, label: '02am',    sales: '1,050', hasDot: false },
    { id: 'active',    xRatio: 4.6, val: 50, label: '02:30am', sales: '2,678', hasDot: true,  color: '#9B51E0', isDefaultActive: true },
    { id: '03am',      xRatio: 5.2, val: 32, label: '03am',    sales: '1,320', hasDot: false },
    { id: '04am',      xRatio: 6.0, val: 14, label: '04am',    sales: '640',   hasDot: false },
    { id: '05am',      xRatio: 7.0, val: 35, label: '05am',    sales: '2,420', hasDot: true,  color: '#D946EF' },
    { id: '06am',      xRatio: 8.0, val: 68, label: '06am',    sales: '2,890', hasDot: true,  color: '#F43F85' },
    { id: '06-trough', xRatio: 8.6, val: 54, label: '06:30am', sales: '2,310', hasDot: false },
    { id: '07am',      xRatio: 9.0, val: 72, label: '07am',    sales: '3,150', hasDot: false }
  ];

  const points = keyframes.map((kf, i) => {
    const x = padding.left + (kf.xRatio / 9) * chartWidth;
    const y = baselineY - (kf.val / 100) * chartHeight;
    return { ...kf, x, y, index: i };
  });

  const [activePointId, setActivePointId] = useState('active');

  // Smooth Catmull-Rom cubic bezier SVG path generator
  const generateSmoothPath = (pts) => {
    if (pts.length < 2) return '';
    let path = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
    const tension = 4.2;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / tension;
      const cp1y = p1.y + (p2.y - p0.y) / tension;
      const cp2x = p2.x - (p3.x - p1.x) / tension;
      const cp2y = p2.y - (p3.y - p1.y) / tension;

      path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    return path;
  };

  const linePath = generateSmoothPath(points);
  const lastX = points[points.length - 1].x;
  const areaPath = `${linePath} L ${lastX.toFixed(2)} ${baselineY} L ${points[0].x.toFixed(2)} ${baselineY} Z`;

  const activePoint = points.find((p) => p.id === activePointId) || points.find((p) => p.id === 'active');

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-content-title tracking-tight font-sans">
          Reports
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
              {['Hourly', 'Daily', 'Weekly', 'Monthly'].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTimeframe(t);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                    timeframe === t
                      ? 'bg-brand-50 text-brand-500 font-bold'
                      : 'text-content-body hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Responsive Chart */}
      <div className="relative w-full overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Multi-stop Stroke Gradient matching Figma */}
            <linearGradient id="reportsStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38B6FF" />
              <stop offset="22%" stopColor="#4D88FF" />
              <stop offset="45%" stopColor="#6C63FF" />
              <stop offset="65%" stopColor="#9B51E0" />
              <stop offset="85%" stopColor="#F43F85" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>

            {/* Area Fill Gradient under the Curve */}
            <linearGradient id="reportsArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9B51E0" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#6C63FF" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#38B6FF" stopOpacity="0.0" />
            </linearGradient>

            {/* Tooltip Dark Shadow */}
            <filter id="tooltipShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" floodColor="#0F172A" />
            </filter>

            {/* Soft Halo Glow for Circle Markers */}
            <filter id="haloGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35" floodColor="#8B5CF6" />
            </filter>
          </defs>

          {/* Horizontal Grid lines and Y-axis labels */}
          {yTicks.map((tick) => {
            const y = baselineY - (tick / 100) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartWidth}
                  y2={y}
                  stroke="#F4F7FE"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#A3AED0"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#reportsArea)" />

          {/* Smooth Curve Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#reportsStroke)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Vertical dashed guide line from active point down to baseline */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={activePoint.y + 6}
              x2={activePoint.x}
              y2={baselineY}
              stroke="#9B51E0"
              strokeWidth="1.5"
              strokeDasharray="2 3"
              opacity="0.8"
            />
          )}

          {/* Circle Markers matching the exact 5 points in Figma */}
          {points.map((pt) => {
            if (!pt.hasDot) return null;
            const isActive = activePointId === pt.id;

            return (
              <g
                key={pt.id}
                className="cursor-pointer group"
                onClick={() => setActivePointId(pt.id)}
                onMouseEnter={() => setActivePointId(pt.id)}
              >
                {/* Invisible wide hit area */}
                <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                {/* Soft outer translucent halo circle (signature Figma effect) */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? '9' : '8'}
                  fill={pt.color || '#9B51E0'}
                  fillOpacity="0.25"
                  className="transition-all duration-200"
                />

                {/* Main white circle with colored ring stroke */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  fill="#FFFFFF"
                  stroke={pt.color || '#9B51E0'}
                  strokeWidth={isActive ? '3' : '2.5'}
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Dark Tooltip Card above active point */}
          {activePoint && (
            <g
              transform={`translate(${activePoint.x - 36}, ${activePoint.y - 62})`}
              filter="url(#tooltipShadow)"
              className="pointer-events-none transition-all duration-200"
            >
              {/* Tooltip Background Card */}
              <rect
                x="0"
                y="0"
                width="72"
                height="46"
                rx="8"
                fill="#0B0F19"
              />
              {/* Pointer beak pointing directly to the circle */}
              <polygon
                points="31,46 41,46 36,52"
                fill="#0B0F19"
              />
              {/* Tooltip Text - Sales Label */}
              <text
                x="36"
                y="18"
                textAnchor="middle"
                fontSize="10"
                fill="#94A3B8"
                fontWeight="500"
                fontFamily="'Plus Jakarta Sans', sans-serif"
              >
                Sales
              </text>
              {/* Tooltip Text - Metric Value (2,678) */}
              <text
                x="36"
                y="35"
                textAnchor="middle"
                fontSize="14"
                fill="#FFFFFF"
                fontWeight="700"
                fontFamily="'Plus Jakarta Sans', sans-serif"
              >
                {activePoint.sales}
              </text>
            </g>
          )}

          {/* X-axis hourly labels */}
          {xLabels.map((lbl, idx) => (
            <text
              key={lbl}
              x={getTickX(idx)}
              y={baselineY + 22}
              textAnchor="middle"
              fontSize="11"
              fill="#A3AED0"
              fontWeight="500"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              className="select-none"
            >
              {lbl}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
