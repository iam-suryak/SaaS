import React, { useState } from 'react';
import { MoreHorizontal, Star } from 'lucide-react';
import nikeBoxImg from '../../Images/dashboard/nike-box.png';
import iphoneBoxImg from '../../Images/dashboard/iphone-box.png';

export default function TopSellingProducts() {
  const [menuOpen, setMenuOpen] = useState(false);

  const products = [
    {
      id: 'tp-1',
      name: 'NIKE Shoes Black Pattern',
      price: '$87',
      rating: 4,
      img: nikeBoxImg,
    },
    {
      id: 'tp-2',
      name: 'iPhone 12',
      price: '$987',
      rating: 4,
      img: iphoneBoxImg,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-[#F4F7FE] flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-content-title tracking-tight font-sans">
          Top selling Products
        </h2>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-content-muted hover:text-content-title p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <MoreHorizontal size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-soft-lg border border-[#F0F2F8] p-1.5 z-20 animate-fade-in">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-content-body hover:bg-slate-50"
              >
                View Catalog
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product List */}
      <div className="my-auto space-y-1">
        {products.map((prod, index) => (
          <React.Fragment key={prod.id}>
            <div className="flex items-center gap-4 py-2 cursor-pointer group">
              {/* Exact Product Box from Figma Screenshot */}
              <div className="w-[74px] h-[74px] rounded-2xl overflow-hidden shrink-0 flex items-center justify-center transition-transform group-hover:scale-105">
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#1B2559] text-sm group-hover:text-brand-500 transition-colors truncate">
                  {prod.name}
                </h3>

                {/* Star Rating (4 filled, 1 unfilled matching Figma) */}
                <div className="flex items-center gap-1 my-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      className={
                        star <= prod.rating
                          ? 'text-[#FFC542] fill-[#FFC542]'
                          : 'text-[#FFE8B2] fill-[#FFE8B2]'
                      }
                    />
                  ))}
                </div>

                {/* Price */}
                <p className="font-bold text-[#1B2559] text-sm font-sans">
                  {prod.price}
                </p>
              </div>
            </div>

            {/* Faint divider line between items matching Figma */}
            {index < products.length - 1 && (
              <div className="border-b border-[#F4F7FE] my-2" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
