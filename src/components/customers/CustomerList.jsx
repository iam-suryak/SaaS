import React, { useState, useRef } from 'react';
import {
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Trash2,
  X,
  Camera,
  MoreHorizontal,
  ChevronDown,
  Check
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

import jhonImg from '../../Images/jhon.png';
import arroraImg from '../../Images/Arrora.png';

export default function CustomerList() {
  const {
    customers,
    addCustomer,
    deleteCustomer,
    updateCustomer,
    isAddCustomerOpen,
    setIsAddCustomerOpen,
    analyticsTab,
    setAnalyticsTab,
    setCurrentView
  } = useDashboard();

  // Selected customer (defaults to John Deo / first customer)
  const [selectedId, setSelectedId] = useState(customers[0]?.id || 'cust-1');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Right panel mode: 'details' | 'add' | 'edit'
  const [panelMode, setPanelMode] = useState(isAddCustomerOpen ? 'add' : 'details');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Form states for Add / Edit Customer
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    role: 'UI/UX Designer',
    address: '2231 / Sycamore Lake Road',
    avatar: null
  });

  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  const selectedCustomer = customers.find(c => c.id === selectedId) || customers[0] || null;

  // Filter customers by search
  const filteredCustomers = customers.filter(c =>
    (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.phone || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male',
      role: 'Client Member',
      address: '742 / Evergreen Terrace',
      avatar: null
    });
    setGenderDropdownOpen(false);
    setPanelMode('add');
    setIsAddCustomerOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setFormData({
      firstName: customer.firstName || customer.name.split(' ')[0] || '',
      lastName: customer.lastName || customer.name.split(' ').slice(1).join(' ') || '',
      email: customer.email || '',
      phone: customer.phone || '',
      gender: customer.gender || 'Male',
      role: customer.role || 'Client Member',
      address: customer.address || '2231 / Sycamore Lake Road',
      avatar: customer.avatar
    });
    setSelectedId(customer.id);
    setGenderDropdownOpen(false);
    setPanelMode('edit');
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, avatar: event.target?.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!formData.firstName && !formData.email) return;

    if (panelMode === 'add') {
      const created = addCustomer({
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone || '+33757005467',
        gender: formData.gender,
        role: formData.role || 'Client Member',
        address: formData.address || '2231 / Sycamore Lake Road',
        avatar: formData.avatar || (formData.gender === 'Female' ? arroraImg : jhonImg)
      });
      if (created) {
        setSelectedId(created.id);
      }
    } else if (panelMode === 'edit' && selectedCustomer) {
      updateCustomer(selectedCustomer.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        role: formData.role,
        address: formData.address,
        ...(formData.avatar ? { avatar: formData.avatar } : {})
      });
    }

    setPanelMode('details');
    setIsAddCustomerOpen(false);
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Top Bar: Customer List title & Add Customer Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#1E293B] tracking-tight">
          Customer List
        </h1>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.98] text-white text-xs font-semibold shadow-soft-sm transition-all"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Sub Bar: Product / Customer Toggle Pill */}
      <div className="flex items-center">
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
      </div>

      {/* Main Grid: Left Table (8 cols) + Right Panel (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Customer Table */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-soft border border-[#F4F7FE] overflow-hidden">
          {/* Optional Search / Quick Filter */}
          <div className="p-4 border-b border-[#F0F2F8] flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#F8F9FD] rounded-lg text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#4379EE] border border-transparent transition-all"
              />
            </div>
            <span className="text-[11px] text-slate-400 font-medium shrink-0">
              Total {customers.length} customers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[#F0F2F8] text-[12px] font-semibold text-[#8F9BBA]">
                  <th className="py-3.5 px-4 font-medium">Name</th>
                  <th className="py-3.5 px-4 font-medium">Email</th>
                  <th className="py-3.5 px-4 font-medium">Phone number</th>
                  <th className="py-3.5 px-4 font-medium">Gender</th>
                  <th className="py-3.5 px-4 text-right font-medium w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F9FD] text-xs">
                {filteredCustomers.map((cust) => {
                  const isSelected = cust.id === selectedId;
                  return (
                    <tr
                      key={cust.id}
                      onClick={() => {
                        setSelectedId(cust.id);
                        if (panelMode === 'add') setPanelMode('details');
                      }}
                      className={`cursor-pointer transition-all duration-150 group ${
                        isSelected
                          ? 'bg-[#F4F7FE] ring-1 ring-inset ring-[#4379EE]'
                          : 'hover:bg-[#F8F9FD]'
                      }`}
                    >
                      {/* Name with circular avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={cust.avatar}
                            alt={cust.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-100"
                          />
                          <span className="font-semibold text-[#1E293B] group-hover:text-[#4379EE] transition-colors whitespace-nowrap">
                            {cust.name}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3 px-4 text-[#718096] whitespace-nowrap">
                        {cust.email}
                      </td>

                      {/* Phone Number */}
                      <td className="py-3 px-4 text-[#718096] whitespace-nowrap">
                        {cust.phone}
                      </td>

                      {/* Gender Badge */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                            cust.gender === 'Female'
                              ? 'bg-[#FFF0ED] text-[#FF6B4A]'
                              : 'bg-[#E8F2FF] text-[#4379EE]'
                          }`}
                        >
                          {cust.gender}
                        </span>
                      </td>

                      {/* Actions Menu */}
                      <td className="py-3 px-4 text-right relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === cust.id ? null : cust.id);
                          }}
                          className="p-1 text-[#A3AED0] hover:text-[#1E293B] rounded-lg hover:bg-slate-200/50 transition-colors"
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {activeMenuId === cust.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-4 mt-1 w-32 bg-white rounded-xl shadow-soft-lg border border-[#F0F2F8] p-1.5 z-30 animate-fade-in"
                          >
                            <button
                              onClick={() => {
                                handleOpenEdit(cust);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Pencil size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => {
                                deleteCustomer(cust.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Details Panel OR Add / Edit Customer Form */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE]">
          {panelMode === 'details' && selectedCustomer && (
            <div className="space-y-6 animate-fade-in">
              {/* Top edit button */}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleOpenEdit(selectedCustomer)}
                  className="p-1.5 text-[#A3AED0] hover:text-[#1E293B] hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit Customer"
                >
                  <Pencil size={16} />
                </button>
              </div>

              {/* Large circular avatar & Name/Role */}
              <div className="text-center -mt-2">
                <div className="w-20 h-20 rounded-full mx-auto overflow-hidden ring-2 ring-slate-100 shadow-sm bg-slate-50 flex items-center justify-center">
                  <img
                    src={selectedCustomer.largeAvatar || selectedCustomer.avatar}
                    alt={selectedCustomer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-3.5 text-base font-bold text-[#1E293B]">
                  {selectedCustomer.name}
                </h3>
                <p className="text-xs text-[#8F9BBA] mt-0.5 font-medium">
                  {selectedCustomer.role || 'UI/UX Designer'}
                </p>
              </div>

              {/* Contact Info Items */}
              <div className="pt-2 pb-1 space-y-3 border-y border-[#F0F2F8]">
                <div className="flex items-center gap-3 text-xs text-[#718096]">
                  <div className="w-7 h-7 rounded-lg bg-[#F4F7FE] flex items-center justify-center text-[#4379EE] shrink-0">
                    <Mail size={14} />
                  </div>
                  <span className="truncate">{selectedCustomer.email}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#718096]">
                  <div className="w-7 h-7 rounded-lg bg-[#F4F7FE] flex items-center justify-center text-[#4379EE] shrink-0">
                    <Phone size={14} />
                  </div>
                  <span>{selectedCustomer.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#718096]">
                  <div className="w-7 h-7 rounded-lg bg-[#F4F7FE] flex items-center justify-center text-[#4379EE] shrink-0">
                    <MapPin size={14} />
                  </div>
                  <span className="truncate">{selectedCustomer.address}</span>
                </div>
              </div>

              {/* Performance Section */}
              <div className="pt-1">
                <h4 className="text-sm font-bold text-[#1E293B] mb-4">
                  Performance
                </h4>

                {/* 6-Month Bar Chart with Feb Peak Badge */}
                <div className="h-32 flex items-end justify-between px-2 pt-6 relative border-b border-[#F0F2F8] pb-2">
                  {(selectedCustomer.performance?.months || [
                    { label: 'Jan', value: 38 },
                    { label: 'Feb', value: 85, isPeak: true, peakBadge: 'Feb 2.33k' },
                    { label: 'Mar', value: 54 },
                    { label: 'Apr', value: 42 },
                    { label: 'May', value: 68 },
                    { label: 'Jun', value: 50 }
                  ]).map((bar) => {
                    const isPeak = bar.isPeak;
                    const heightPercent = bar.value;
                    return (
                      <div key={bar.label} className="flex flex-col items-center relative group">
                        {/* Peak Floating Tooltip Badge */}
                        {isPeak && (
                          <div className="absolute -top-7 flex flex-col items-center z-10">
                            <span className="bg-[#FF6B4A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                              {bar.peakBadge || 'Feb 2.33k'}
                            </span>
                            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-[#FF6B4A]" />
                          </div>
                        )}

                        {/* Bar */}
                        <div
                          style={{ height: `${(heightPercent / 100) * 80}px` }}
                          className={`w-3.5 rounded-t-sm transition-all duration-300 ${
                            isPeak
                              ? 'bg-[#FF6B4A]'
                              : 'bg-[#E5E9F2] group-hover:bg-[#CBD5E1]'
                          }`}
                        />
                        <span className="text-[10px] text-[#A3AED0] font-medium mt-2">
                          {bar.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Circular Gauge Progress Rings: 70% (amber) & 60% (blue) */}
                <div className="grid grid-cols-2 gap-4 mt-5">
                  {/* Gauge 1: 70% */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                        {/* Track */}
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          stroke="#FFF4D9"
                          strokeWidth="5"
                          fill="transparent"
                        />
                        {/* 70% Progress */}
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          stroke="#FFC542"
                          strokeWidth="5"
                          strokeDasharray={2 * Math.PI * 24}
                          strokeDashoffset={2 * Math.PI * 24 * (1 - 0.70)}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-[#1E293B]">
                        70%
                      </span>
                    </div>
                  </div>

                  {/* Gauge 2: 60% */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                        {/* Track */}
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          stroke="#E8F2FF"
                          strokeWidth="5"
                          fill="transparent"
                        />
                        {/* 60% Progress */}
                        <circle
                          cx="30"
                          cy="30"
                          r="24"
                          stroke="#4379EE"
                          strokeWidth="5"
                          strokeDasharray={2 * Math.PI * 24}
                          strokeDashoffset={2 * Math.PI * 24 * (1 - 0.60)}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-500"
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-[#1E293B]">
                        60%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADD / EDIT CUSTOMER FORM (Matches Figma Screenshots media_1793615473147_d745bb31 & media_1793615494980_cd5bf63f) */}
          {(panelMode === 'add' || panelMode === 'edit') && (
            <div className="animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0F2F8]">
                <h3 className="text-base font-bold text-[#1E293B]">
                  {panelMode === 'add' ? 'Add Customer' : 'Edit Customer'}
                </h3>
                <button
                  onClick={() => {
                    setPanelMode('details');
                    setIsAddCustomerOpen(false);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmitForm} className="mt-5 space-y-4">
                {/* Avatar Upload Placeholder */}
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-18 h-18 w-[72px] h-[72px] rounded-full border-2 border-dashed border-slate-300 hover:border-[#4379EE] bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden group"
                  >
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera size={22} className="text-slate-400 group-hover:text-[#4379EE]" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1.5 font-medium">
                    Upload Photo
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                {/* First Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FD] rounded-xl text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-[#4379EE] focus:bg-white transition-all"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FD] rounded-xl text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-[#4379EE] focus:bg-white transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FD] rounded-xl text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-[#4379EE] focus:bg-white transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FD] rounded-xl text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-[#4379EE] focus:bg-white transition-all"
                  />
                </div>

                {/* Gender Dropdown (matches Figma media_1793615494980_cd5bf63f) */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                    Gender
                  </label>
                  <button
                    type="button"
                    onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
                    className="w-full px-3.5 py-2.5 bg-[#F8F9FD] rounded-xl text-xs text-slate-800 border border-slate-200 flex items-center justify-between focus:outline-none focus:border-[#4379EE] transition-all"
                  >
                    <span>{formData.gender}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {genderDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 bg-white rounded-xl shadow-soft-lg border border-[#F0F2F8] p-1.5 z-20 animate-fade-in">
                      {['Male', 'Female'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, gender: g });
                            setGenderDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                            formData.gender === g
                              ? 'bg-[#E8F2FF] text-[#4379EE]'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{g}</span>
                          {formData.gender === g && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-4 py-3 rounded-xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.98] text-white text-xs font-bold shadow-soft transition-all"
                >
                  {panelMode === 'add' ? 'Add Customer' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
