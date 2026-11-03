import React from 'react';
import heartIcon from '../../Images/dashboard/stat-heart.png';
import gameIcon from '../../Images/dashboard/stat-game.png';
import bagIcon from '../../Images/dashboard/stat-bag.png';
import jobIcon from '../../Images/dashboard/stat-job.png';

export default function StatCard({ item }) {
  const getIconImg = () => {
    switch (item.icon) {
      case 'heart':
        return heartIcon;
      case 'cube':
        return gameIcon;
      case 'bag':
        return bagIcon;
      case 'briefcase':
        return jobIcon;
      default:
        return heartIcon;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-soft border border-[#F4F7FE] flex items-center gap-4 transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-0.5">
      {/* Exact Circular Icon from Figma */}
      <div className="w-14 h-14 shrink-0 flex items-center justify-center">
        <img
          src={getIconImg()}
          alt={item.title}
          className="w-14 h-14 object-contain select-none transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Numerical value & Subtitle */}
      <div>
        <h3 className="text-2xl font-bold text-[#1B2559] tracking-tight font-sans leading-none mb-1.5">
          {item.value}
        </h3>
        <p className="text-xs font-medium text-[#8F9BBA]">
          {item.title}
        </p>
      </div>
    </div>
  );
}
