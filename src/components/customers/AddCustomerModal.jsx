import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function AddCustomerModal({ onClose }) {
  const { addCustomer } = useDashboard();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Active');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    addCustomer({
      name,
      email,
      phone: phone || '+1 (555) 000-0000',
      company: company || 'Enterprise Corp',
      status
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-soft-lg border border-[#F0F2F8] relative">
        <div className="flex items-center justify-between pb-5 border-b border-[#F0F2F8]">
          <div>
            <h3 className="text-xl font-bold text-content-title">Add Customer</h3>
            <p className="text-xs text-content-muted mt-0.5">Register a new client or contact</p>
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
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. David Vance"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content-title mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="david.vance@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Company
              </label>
              <input
                type="text"
                placeholder="Acme Inc."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Phone
              </label>
              <input
                type="text"
                placeholder="+1 (555) 987-6543"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-content-title mb-1.5">
              Account Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 bg-white"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
