'use client';

import React from 'react';
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Facebook
} from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';

interface InstagramSectionProps {
  settings: ClinicSettings;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ settings }) => {
  const posts = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
      caption: 'Sublimation des lèvres tout en délicatesse avec acide hyaluronique certifié ✨ #RussianLips #KhemisMiliana',
      likes: '482',
      comments: '34'
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600&auto=format&fit=crop',
      caption: 'Protocole Hydrafacial MD médical : le secret d’un teint lumineux sans filtre 💫 #Hydrafacial #Glow',
      likes: '620',
      comments: '51'
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
      caption: 'Focus sur notre laser triple onde : adieu les poils incarnés et confort maximal à -5°C ❄️ #LaserMedical',
      likes: '512',
      comments: '40'
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=600&auto=format&fit=crop',
      caption: 'Baby Botox : ouvrir le regard et lisser les ridules sans figer les expressions 🌸 #BotoxNaturel',
      likes: '745',
      comments: '63'
    }
  ];

  return (
    <section className="py-16 bg-[#FAF8F5] border-y border-[#E5D4CB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#9E6B55] uppercase tracking-wider">
              <Instagram className="w-4 h-4" />
              <span>Communauté & Conseils Beauté</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
              Suivez @gh_clinic10 sur Instagram
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-[#E5D4CB] hover:border-[#9E6B55] text-stone-800 text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-[#9E6B55]" />
              <span>Rejoindre sur Instagram</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>

            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-[#E5D4CB] hover:border-[#9E6B55] text-stone-800 text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
            >
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
          </div>
        </div>

        {/* Instagram Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-3xl overflow-hidden bg-white border border-[#E5D4CB]/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-stone-100">
                <img
                  src={post.image}
                  alt="Post Instagram GH Clinic"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="pt-2 text-[10px] text-[#9E6B55] font-semibold flex items-center gap-1">
                  <span>Voir sur Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
