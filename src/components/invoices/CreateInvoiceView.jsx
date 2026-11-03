import React, { useState, useRef } from 'react';
import {
  Camera,
  Calendar as CalendarIcon,
  MapPin,
  Plus,
  Trash2,
  Printer,
  Download,
  Share2,
  ChevronDown,
  CheckCircle2,
  FileText,
  List
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function CreateInvoiceView({ onSwitchToList }) {
  const { addInvoice } = useDashboard();

  // Form State initialized with the exact data from Figma design
  const [invoiceId, setInvoiceId] = useState('#876370');
  const [date, setDate] = useState('01/12/2021');
  const [name, setName] = useState('Alison G.');
  const [email, setEmail] = useState('Example@gmail.com');
  const [address, setAddress] = useState('Street');
  const [logoImage, setLogoImage] = useState(null);
  const fileInputRef = useRef(null);

  // Products Table in Create Form
  const [products, setProducts] = useState([
    { id: 1, name: 'ipod 2021', rate: 1000, qty: 10, amount: 10000 },
    { id: 2, name: 'Apple Mackbook', rate: 1500, qty: 10, amount: 150000 },
    { id: 3, name: 'i phone 12', rate: 885, qty: 10, amount: 8850 }
  ]);

  const [notification, setNotification] = useState('');

  // Handle Logo Upload
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogoImage(ev.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete product row
  const handleDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Add new product row
  const handleAddProductRow = () => {
    const newId = Date.now();
    setProducts(prev => [
      ...prev,
      { id: newId, name: 'New Item', rate: 500, qty: 1, amount: 500 }
    ]);
  };

  // Handle Invoice Creation
  const handleCreateInvoice = (e) => {
    e?.preventDefault();
    const totalCalc = products.reduce((acc, curr) => acc + curr.amount, 0);
    addInvoice({
      name: name || 'Alison G.',
      email: email || 'Example@gmail.com',
      date: '10 Dec, 2021',
      status: 'Complete',
      amount: `$${totalCalc.toLocaleString()}`
    });
    setNotification('Invoice created and saved successfully!');
    setTimeout(() => setNotification(''), 4000);
  };

  // Handle Send
  const handleSendInvoice = () => {
    setNotification(`Invoice sent to ${email || 'recipient'}!`);
    setTimeout(() => setNotification(''), 4000);
  };

  // Print invoice
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner & Quick Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#4379EE] font-bold text-xs">
            Create Mode
          </span>
          {notification && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg animate-fade-in">
              <CheckCircle2 size={14} />
              {notification}
            </span>
          )}
        </div>

        {onSwitchToList && (
          <button
            onClick={onSwitchToList}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-[#F0F2F8] shadow-soft-sm transition-all"
          >
            <List size={15} className="text-[#4379EE]" />
            <span>View All Invoices</span>
          </button>
        )}
      </div>

      {/* Main Two-Column Layout from Figma */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Create New Invoice Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-[#F4F7FE] space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
            Create New Invoice
          </h2>

          {/* Camera Avatar Upload Circle */}
          <div className="flex justify-center pt-2 pb-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F8F9FD] border-2 border-dashed border-[#E2E8F0] hover:border-[#4379EE] flex items-center justify-center cursor-pointer transition-all relative overflow-hidden group shadow-soft-sm"
              title="Click to upload invoice logo/avatar"
            >
              {logoImage ? (
                <img
                  src={logoImage}
                  alt="Invoice Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#E2E8F0]/50 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                  <Camera size={22} className="text-slate-800" />
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleCreateInvoice} className="space-y-4">
            {/* Row 1: Invoice Id & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-2">
                  Invoice Id
                </label>
                <input
                  type="text"
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-700 font-medium transition-colors outline-none"
                  placeholder="#876370"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-700 font-medium transition-colors outline-none"
                    placeholder="01/12/2021"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4379EE] pointer-events-none">
                    <CalendarIcon size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Name */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-700 font-medium transition-colors outline-none"
                placeholder="Alison G."
              />
            </div>

            {/* Row 3: Email & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-700 font-medium transition-colors outline-none"
                  placeholder="Example@gmail.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-2">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-4 pr-11 py-3 bg-[#F8F9FD] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-700 font-medium transition-colors outline-none"
                    placeholder="Street"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4379EE] pointer-events-none">
                    <MapPin size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Description Section with + Button */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-[#1E293B]">
                  Product Description
                </span>
                <button
                  type="button"
                  onClick={handleAddProductRow}
                  className="w-8 h-8 rounded-xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-95 text-white flex items-center justify-center shadow-soft transition-all"
                  title="Add product row"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Products Table matching Figma */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-500 font-bold border-b border-[#F0F2F8]">
                      <th className="pb-3 font-semibold">
                        Product Name <span className="text-[10px] text-slate-400">▾</span>
                      </th>
                      <th className="pb-3 font-semibold text-center">
                        Rate <span className="text-[10px] text-slate-400">▾</span>
                      </th>
                      <th className="pb-3 font-semibold text-center">
                        QTY <span className="text-[10px] text-slate-400">▾</span>
                      </th>
                      <th className="pb-3 font-semibold text-right">
                        Amount <span className="text-[10px] text-slate-400">▾</span>
                      </th>
                      <th className="pb-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F8F9FD]">
                    {products.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 font-medium text-[#4379EE] hover:underline cursor-pointer">
                          {item.name}
                        </td>
                        <td className="py-3.5 text-center text-slate-700 font-medium">
                          ${item.rate}
                        </td>
                        <td className="py-3.5 text-center text-slate-700 font-medium">
                          {item.qty} Pcs
                        </td>
                        <td className="py-3.5 text-right font-bold text-[#10B981]">
                          ${item.amount.toLocaleString()}
                        </td>
                        <td className="py-3.5 text-right pl-3">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(item.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                            title="Remove row"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleSendInvoice}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#4379EE] hover:bg-blue-50/30 text-[#4379EE] text-sm font-bold shadow-soft-sm transition-all text-center"
              >
                Send Invoice
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.99] text-white text-sm font-bold shadow-soft transition-all text-center"
              >
                Create Invoice
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Preview of Invoice matching Figma */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
              Preview
            </h2>

            {/* Device & Printer Action Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#4379EE] border border-[#F0F2F8] shadow-soft-sm transition-all"
                title="Print Invoice"
              >
                <Printer size={18} />
              </button>
              <button
                onClick={() => {
                  setNotification('Invoice downloaded as PDF!');
                  setTimeout(() => setNotification(''), 3000);
                }}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#4379EE] border border-[#F0F2F8] shadow-soft-sm transition-all"
                title="Download / Export"
              >
                <Download size={18} />
              </button>
            </div>
          </div>

          {/* Printable Invoice Sheet matching Image 1 */}
          <div
            id="printable-invoice"
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft-lg border border-[#F4F7FE] space-y-6 text-[#1E293B]"
          >
            {/* Header: Logo and Company Info */}
            <div className="flex items-start justify-between">
              {/* Monogram J Logo matching design */}
              <div className="w-10 h-10 rounded-xl bg-[#0062FF] flex items-center justify-center text-white font-extrabold text-xl shadow-sm tracking-wider">
                J
              </div>

              {/* Company contact right */}
              <div className="text-right text-[11px] text-slate-500 space-y-0.5">
                <p className="flex items-center justify-end gap-1.5 text-[#0062FF]">
                  <span className="text-[10px]">@</span>
                  <span>your.mail@gmail.com</span>
                </p>
                <p className="flex items-center justify-end gap-1.5">
                  <span className="text-[10px] text-slate-400">m</span>
                  <span>+386 989 271 3115</span>
                </p>
              </div>
            </div>

            {/* Recipient & Invoice Title Rows */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-2">
              {/* Recipient Box */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  RECIPIENT
                </span>
                <p className="font-bold text-slate-800 text-sm">JOHN SMITH</p>
                <p className="text-slate-500 text-[11px]">4304 Liberty Avenue</p>
                <p className="text-slate-500 text-[11px]">92680 Tustin, CA</p>
                <p className="text-slate-500 text-[11px]">VAT no. : 12345678</p>
                <div className="pt-1 text-[11px] text-slate-500 space-y-0.5">
                  <p className="flex items-center gap-1.5 text-[#0062FF]">
                    <span className="text-[10px]">@</span> company.mail@gmail.com
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400">m</span> +386 714 505 8385
                  </p>
                </div>
              </div>

              {/* Invoice Title & Meta */}
              <div className="text-left sm:text-right space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Invoice
                </h1>
                <div className="text-[10px] text-slate-500 pt-1 space-y-0.5">
                  <p className="font-medium">
                    INVOICE NO. <span className="font-bold text-slate-800">001/2021</span>
                  </p>
                  <p className="font-medium">
                    INVOICE DATE <span className="font-bold text-slate-800">January 1, 2021</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Line Items Table from Image 1 */}
            <div className="pt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-[#F0F2F8]">
                    <th className="pb-2.5 font-bold">TASK DESCRIPTION</th>
                    <th className="pb-2.5 font-bold text-center">HOURS</th>
                    <th className="pb-2.5 font-bold text-center">RATE</th>
                    <th className="pb-2.5 font-bold text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F9FD]">
                  <tr>
                    <td className="py-3 text-slate-700 font-medium">Website redesign</td>
                    <td className="py-3 text-center text-slate-600 font-medium">60</td>
                    <td className="py-3 text-center text-slate-600 font-medium">15 USD</td>
                    <td className="py-3 text-right text-slate-800 font-semibold">900,00 USD</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-slate-700 font-medium">Newsletter template design</td>
                    <td className="py-3 text-center text-slate-600 font-medium">20</td>
                    <td className="py-3 text-center text-slate-600 font-medium">12 USD</td>
                    <td className="py-3 text-right text-slate-800 font-semibold">240,00 USD</td>
                  </tr>
                </tbody>
              </table>

              {/* Subtotal, Discount, Total */}
              <div className="pt-4 flex justify-end">
                <div className="w-56 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold uppercase tracking-wider text-slate-500">SUBTOTAL</span>
                    <span className="font-semibold text-slate-800">1140,00 USD</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold uppercase tracking-wider text-slate-500">DISCOUNT 5%</span>
                    <span className="font-semibold text-slate-800">57,00 USD</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#F0F2F8] text-sm">
                    <span className="font-bold uppercase tracking-wider text-slate-900">TOTAL</span>
                    <span className="font-extrabold text-[#0062FF]">1083,00 USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Transfer Info */}
            <div className="pt-2 text-[10px] text-slate-500 border-t border-[#F0F2F8] space-y-1">
              <p>
                Transfer the amount to the business account below. Please include invoice number on your check.
              </p>
              <p className="font-bold text-slate-700">
                BANK: <span className="font-medium">FTSBUS33</span> • IBAN: <span className="font-medium">GB82-1111-2222-3333</span>
              </p>
            </div>

            {/* Notes Section */}
            <div className="text-[10px] text-slate-500 space-y-2 pt-2">
              <span className="font-bold uppercase tracking-wider text-slate-400 block">
                NOTES
              </span>
              <p className="leading-relaxed">
                All amounts are in dollars. Please make the payment within 15 days from the issue of date of this invoice. Tax is not charged on the basis of paragraph 1 of Article 94 of the Value Added Tax Act (I am not liable for VAT).
              </p>
              <p className="italic">Thank you for you confidence in my work.</p>
              <div className="pt-1">
                <span className="font-serif italic text-sm text-slate-800">Signature</span>
              </div>
            </div>

            {/* Footer company metadata */}
            <div className="pt-4 border-t border-[#F0F2F8] flex flex-col sm:flex-row items-center justify-between text-[9px] text-slate-400 gap-2">
              <span>YOUR COMPANY</span>
              <span>1331 Heart Ridge Road, 48430 Gaines, MI</span>
              <span>The company is registered in the business register under no. 87654380</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
