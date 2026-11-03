import React, { useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  ArrowUpDown,
  Star,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Check,
  Filter,
  FilePlus,
  List
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import AddInvoiceModal from './AddInvoiceModal';
import CreateInvoiceView from './CreateInvoiceView';

export default function InvoiceList() {
  const {
    invoices,
    toggleInvoiceStar,
    deleteInvoices,
    isAddInvoiceOpen,
    setIsAddInvoiceOpen
  } = useDashboard();

  // Mode: 'create' (Image 1) or 'list' (Table list)
  const [subView, setSubView] = useState('create');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortField, setSortField] = useState('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  // If in 'create' view, render CreateInvoiceView
  if (subView === 'create') {
    return <CreateInvoiceView onSwitchToList={() => setSubView('list')} />;
  }

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredInvoices.map(i => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    deleteInvoices(selectedIds);
    setSelectedIds([]);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Complete':
        return (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#E8F8F0] text-[#10B981]">
            Complete
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#FFF4EB] text-[#F59E0B]">
            Pending
          </span>
        );
      case 'Cancel':
        return (
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-[#FEECEB] text-[#EF4444]">
            Cancel
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Bar: Search & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', 'Complete', 'Pending', 'Cancel'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab
                  ? 'bg-brand-500 text-white shadow-glow'
                  : 'bg-white text-content-body hover:bg-slate-50 border border-[#F0F2F8]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search, Switch to Create Invoice, and Add Invoice Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted" />
            <input
              type="text"
              placeholder="Search invoice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-48 sm:w-60 bg-white rounded-xl border border-[#F0F2F8] text-xs text-content-title placeholder:text-content-muted focus:outline-none focus:border-brand-500 transition-colors shadow-soft-sm"
            />
          </div>

          <button
            onClick={() => setSubView('create')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-brand-500 text-brand-500 text-xs font-bold shadow-soft-sm transition-all"
          >
            <FilePlus size={16} />
            <span className="hidden sm:inline">Create Invoice</span>
          </button>

          <button
            onClick={() => setIsAddInvoiceOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-glow transition-all"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Quick Add</span>
          </button>
        </div>
      </div>

      {/* Selected Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-brand-50 border border-brand-200 rounded-2xl p-4 flex items-center justify-between animate-fade-in shadow-soft-sm">
          <span className="text-xs font-bold text-brand-600">
            {selectedIds.length} invoice(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-soft transition-colors"
          >
            <Trash2 size={14} />
            <span>Delete Selected</span>
          </button>
        </div>
      )}

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#F0F2F8] text-content-muted font-bold">
                <th className="pb-4 pl-2 w-10">
                  <input
                    type="checkbox"
                    checked={
                      filteredInvoices.length > 0 &&
                      selectedIds.length === filteredInvoices.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded text-brand-500 border-slate-300 focus:ring-brand-500 cursor-pointer"
                  />
                </th>
                <th className="pb-4 font-bold">Invoice ID</th>
                <th className="pb-4 font-bold">Name</th>
                <th className="pb-4 font-bold">Email</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 font-bold text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F9FD]">
              {filteredInvoices.map((inv) => {
                const isSelected = selectedIds.includes(inv.id);
                return (
                  <tr
                    key={inv.id}
                    className={`hover:bg-slate-50/60 transition-colors group ${
                      isSelected ? 'bg-brand-50/20' : ''
                    }`}
                  >
                    <td className="py-4 pl-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(inv.id)}
                        className="w-4 h-4 rounded text-brand-500 border-slate-300 focus:ring-brand-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 font-bold text-content-title">
                      {inv.invoiceId}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={inv.avatar}
                          alt={inv.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                        />
                        <span className="font-bold text-content-title">
                          {inv.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-content-muted font-medium">
                      {inv.email}
                    </td>
                    <td className="py-4 text-content-muted font-medium">
                      {inv.date}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(inv.status)}
                    </td>
                    <td className="py-4 text-right pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleInvoiceStar(inv.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-300 hover:text-amber-400 transition-colors"
                          title="Star invoice"
                        >
                          <Star
                            size={16}
                            className={
                              inv.starred
                                ? 'fill-amber-400 text-amber-400'
                                : ''
                            }
                          />
                        </button>
                        <button
                          onClick={() => deleteInvoices([inv.id])}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Delete invoice"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Invoice Modal */}
      {isAddInvoiceOpen && (
        <AddInvoiceModal onClose={() => setIsAddInvoiceOpen(false)} />
      )}
    </div>
  );
}
