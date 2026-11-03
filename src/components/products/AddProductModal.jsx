import React, { useState, useRef } from 'react';
import { ChevronLeft, Camera, Check, ChevronDown, Inbox, Download } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { prodBluetooth } from '../../data/mockData';

export default function AddProductModal({ onClose }) {
  const { addProduct } = useDashboard();
  
  // State initialized exactly matching the Figma screenshot (Image 3)
  const [productName, setProductName] = useState('Mackbook Pro 2021 14"');
  const [brand, setBrand] = useState('Apple');
  const [price, setPrice] = useState('$1200');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [description, setDescription] = useState(
    'This the New creation Of apple  This the New creation Of apple This the New creation Of apple This the New creation Of apple.'
  );
  const [productImage, setProductImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProductImage(ev.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e?.preventDefault();
    if (!productName.trim()) return;

    addProduct({
      name: productName.trim(),
      price: price.startsWith('$') ? price : `$${price}`,
      totalOrder: '10,000 Piece',
      totalSales: '$1,20,000',
      brand: brand,
      isNegotiable,
      thumb: productImage || prodBluetooth
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Dimmed Backdrop matching Image 3 */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-[2px] transition-opacity"
      />

      {/* Slide-over Drawer on Right matching Image 3 */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] md:w-[480px] bg-white z-50 shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-slide-left select-none">
        <div className="space-y-6">
          {/* Top Header with Back Arrow and Title */}
          <div className="flex items-center gap-3 pb-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
              title="Close drawer"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
            <h2 className="text-base sm:text-lg font-bold text-[#1E293B]">
              Add a New Product
            </h2>
          </div>

          {/* Photo Upload Circle */}
          <div className="flex justify-center py-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#F4F6F9] hover:bg-slate-200/80 border-2 border-dashed border-slate-200 hover:border-[#4379EE] flex items-center justify-center cursor-pointer transition-all relative overflow-hidden group shadow-soft-sm"
              title="Upload product image"
            >
              {productImage ? (
                <img
                  src={productImage}
                  alt="Uploaded Product"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#E8EDF5]/60 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                  <Camera size={24} className="text-slate-800" />
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} id="add-product-form" className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 bg-[#F4F6F9] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-800 font-medium transition-all outline-none"
                placeholder="Mackbook Pro 2021 14&quot;"
              />
            </div>

            {/* Brand Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-2">
                Brand
              </label>
              <div className="relative">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-[#F4F6F9] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-800 font-medium transition-all outline-none cursor-pointer pr-10"
                >
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Sony">Sony</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Lenovo">Lenovo</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* Price & Negotiable */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-2">
                Price
              </label>
              <div className="flex items-center gap-6">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-36 px-4 py-3 bg-[#F4F6F9] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-800 font-medium transition-all outline-none"
                  placeholder="$1200"
                />

                {/* Checkbox: Negotiable */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setIsNegotiable(!isNegotiable)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      isNegotiable
                        ? 'bg-[#4379EE] border-[#4379EE] text-white'
                        : 'border-slate-300 hover:border-slate-400 bg-white'
                    }`}
                  >
                    {isNegotiable && <Check size={13} strokeWidth={3} />}
                  </button>
                  <span className="text-xs font-bold text-[#1E293B]">
                    Negotiable
                  </span>
                </label>
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-2">
                Descriptions
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 bg-[#F4F6F9] border border-transparent focus:border-[#4379EE] focus:bg-white rounded-2xl text-xs sm:text-sm text-slate-700 font-normal leading-relaxed transition-all outline-none resize-none"
                placeholder="Write product description..."
              />
            </div>
          </form>
        </div>

        {/* Bottom Save Product Button */}
        <div className="pt-6">
          <button
            type="submit"
            form="add-product-form"
            className="w-full py-3.5 rounded-2xl bg-[#4379EE] hover:bg-[#3465D9] active:scale-[0.99] text-white text-sm font-bold shadow-soft flex items-center justify-center gap-2.5 transition-all"
          >
            {/* Tray/Save icon matching Figma */}
            <Inbox size={18} strokeWidth={2.2} />
            <span>Save Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}
