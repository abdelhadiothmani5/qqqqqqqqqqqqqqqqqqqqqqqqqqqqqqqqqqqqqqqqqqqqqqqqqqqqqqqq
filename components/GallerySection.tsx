'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Maximize2,
  X,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { GalleryItem } from '@/lib/clinicData';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'Toutes les Photos' },
    { id: 'clinic', label: 'Le Cabinet & Salles' },
    { id: 'equipment', label: 'Plateau Laser' },
    { id: 'treatment', label: 'Soins en Action' },
    { id: 'doctor', label: 'Consultations' },
  ];

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E5D4CB] shadow-xs">
            <Camera className="w-3.5 h-3.5 text-[#9E6B55]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6B55]">
              Immersion Visuelle
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
            Le Sanctuaire GH Clinic
          </h2>

          <p className="text-stone-600 font-light text-base sm:text-lg leading-relaxed">
            Pénétrez dans un environnement raffiné, apaisant et strictement aseptisé, conçu pour votre confort et votre bien-être absolu à Khemis Miliana.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white shadow-md'
                  : 'bg-[#FAF8F5] text-stone-700 hover:bg-stone-100 border border-[#E5D4CB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3] bg-stone-100 border border-[#E5D4CB]/70"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#9E6B55] text-xs font-bold shadow-xs">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white space-y-1">
                <h3 className="font-serif font-bold text-lg text-white">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-stone-300 font-light line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md border border-white/20 z-10">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors z-10 border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-stone-900">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F4DCD6] text-[#9E6B55] text-xs font-bold uppercase">
                  {selectedImage.categoryLabel}
                </span>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  {selectedImage.title}
                </h3>
              </div>
              {selectedImage.description && (
                <p className="text-sm text-stone-600 font-light">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
