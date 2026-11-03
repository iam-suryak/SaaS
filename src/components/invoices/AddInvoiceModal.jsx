import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function AddInvoiceModal({ onClose }) {
  const { addInvoice } = useDashboard();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');
  const [date, setDate] = useState('02 Nov, 2026');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    addInvoice({
      name,
      email,
      amount: amount.startsWith('$') ? amount : `$${amount || '500'}`,
      status,
      date
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-soft-lg border border-[#F0F2F8] relative">
        <div className="flex items-center justify-between pb-5 border-b border-[#F0F2F8]">
          <div>
            <h3 className="text-xl font-bold text-content-title">Add New Invoice</h3>
            <p className="text-xs text-content-muted mt-0.5">Generate a billing invoice for your customer</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-content-muted hover:text-content-title rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-content-title mb-1.5">
              Customer Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content-title mb-1.5">
              Customer Email Address
            </label>
            <input
              type="email"
              required
              placeholder="sarah.jenkins@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Amount ($)
              </label>
              <input
                type="text"
                placeholder="1,250"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors bg-white"
              >
                <option value="Complete">Complete</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F0F2F8]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#E5E9F2] text-xs font-semibold text-content-muted hover:text-content-title transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-glow transition-all"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
