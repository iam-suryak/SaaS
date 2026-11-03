import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function AddTaskModal({ onClose }) {
  const { addTask } = useDashboard();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState('todo');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('On Track');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    addTask({
      title,
      description: description || 'Discussion for management dashboard ui design',
      column,
      priority,
      status
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-soft-lg border border-[#F0F2F8] relative">
        <div className="flex items-center justify-between pb-5 border-b border-[#F0F2F8]">
          <div>
            <h3 className="text-xl font-bold text-content-title">Add New Task</h3>
            <p className="text-xs text-content-muted mt-0.5">Create a task item on the board</p>
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
              Task Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design User Profile Flow"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-content-title mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Discussion and specifications..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Column
              </label>
              <select
                value={column}
                onChange={(e) => setColumn(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 bg-white"
              >
                <option value="todo">ToDo</option>
                <option value="in_progress">In Progress</option>
                <option value="in_review">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-content-title mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#F0F2F8] text-xs focus:outline-none focus:border-brand-500 bg-white"
              >
                <option value="On Track">On Track</option>
                <option value="At risk">At risk</option>
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
