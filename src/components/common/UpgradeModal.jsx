import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function UpgradeModal() {
  const { isUpgradeModalOpen, setIsUpgradeModalOpen, upgradeToPro } = useDashboard();

  if (!isUpgradeModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-soft-lg border border-[#F0F2F8] relative text-center">
        <button
          onClick={() => setIsUpgradeModalOpen(false)}
          className="absolute top-6 right-6 p-2 text-content-muted hover:text-content-title rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Lamp Icon */}
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
          <Sparkles size={28} />
        </div>

        <span className="text-[11px] font-bold text-brand-500 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full">
          Pro Upgrade
        </span>
        <h3 className="text-2xl font-black text-content-title mt-2">Unlock Unlimited Base Pro</h3>
        <p className="text-xs text-content-muted mt-1.5 max-w-sm mx-auto">
          Gain full access to all 22 dashboard views, custom chart analytics, live team sync, and unlimited invoice generation.
        </p>

        <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-[#F0F2F8] text-left space-y-2.5">
          {[
            'All 22 Figma Dashboard screens unlocked',
            'Interactive Spline Reports & Sales analytics',
            'Full Kanban task board with custom columns',
            'Real-time messaging & file attachments',
            'Export to PDF, CSV, and Figma tokens'
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-content-body font-medium">
              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check size={11} strokeWidth={3} />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsUpgradeModalOpen(false)}
            className="px-5 py-2.5 rounded-xl border border-[#E5E9F2] text-xs font-semibold text-content-muted hover:text-content-title"
          >
            Maybe Later
          </button>
          <button
            onClick={upgradeToPro}
            className="px-7 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-glow transition-all"
          >
            Upgrade for $29/mo
          </button>
        </div>
      </div>
    </div>
  );
}
