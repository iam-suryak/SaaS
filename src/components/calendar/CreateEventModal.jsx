import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function CreateEventModal({ onClose }) {
  const { addEvent } = useDashboard();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-04');
  const [time, setTime] = useState('10:00 AM - 11:30 AM');
  const [category, setCategory] = useState('Product');
  const [color, setColor] = useState('#605BFF');

  const colorOptions = [
    { name: 'Indigo', value: '#605BFF' },
    { name: 'Emerald', value: '#10B981' },
    { name: 'Amber', value: '#F59E0B' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Rose', value: '#EF4444' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addEvent({
      title,
      date,
      time,
      category,
      color
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-soft-lg border border-[#F0F2F8] relative">
        <div className="flex items-center justify-between pb-5 border-b border-[#F0F2F8]">
          <div>
            <h3 className="text-xl font-bold text-content-title">Create New Event</h3>
            <p className="text-xs text-content-muted mt-0.5">Schedule a meeting or calendar event</p>
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
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design Team Standup"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Time Interval
              </label>
              <input
                type="text"
                placeholder="10:00 AM - 11:30 AM"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-content-title mb-1.5">
              Event Color Tag
            </label>
            <div className="flex items-center gap-3 pt-1">
              {colorOptions.map((c) => (
                <button
                  type="button"
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c.value ? 'ring-2 ring-offset-2 ring-brand-500 scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
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
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
