'use client';

import React from 'react';
import { Sun, Moon, Monitor, Sparkles } from 'lucide-react';
import { useTheme, Theme } from '@/lib/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'compact' | 'segmented' | 'floating';
  className?: string;
  showTooltip?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
  showTooltip = true,
}) => {
  const { theme, resolvedTheme, isDark, toggleTheme, setTheme } = useTheme();

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-full bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 shadow-inner ${className}`}
        role="group"
        aria-label="Sélection du thème"
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            theme === 'light'
              ? 'bg-white text-stone-900 shadow-xs font-semibold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
          title="Thème Clair"
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Clair</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#9E2A50] to-[#78243E] text-white shadow-xs font-semibold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
          title="Thème Sombre"
        >
          <Moon className="w-3.5 h-3.5 text-pink-300" />
          <span>Sombre</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('system')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            theme === 'system'
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
          title="Thème Automatique (Système)"
        >
          <Monitor className="w-3.5 h-3.5 text-[#C5A089]" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
          isDark
            ? 'bg-stone-800/80 hover:bg-stone-700 text-pink-200 border border-pink-900/40 shadow-xs'
            : 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 shadow-xs'
        } ${className}`}
        aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
        title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-300 transition-transform duration-300 rotate-0 hover:rotate-90" />
            <span className="font-serif tracking-wide text-[11px]">Mode Clair</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-[#9E2A50] transition-transform duration-300 -rotate-12 hover:rotate-0" />
            <span className="font-serif tracking-wide text-[11px]">Mode Sombre</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 pointer-events-auto backdrop-blur-md ${
          isDark
            ? 'bg-stone-900/90 text-amber-300 border border-pink-900/50 hover:bg-stone-800 hover:border-pink-500/60 shadow-pink-950/40'
            : 'bg-white/95 text-stone-700 border border-stone-200/90 hover:bg-white hover:border-[#DFBA9D] shadow-stone-300/40'
        } ${className}`}
        aria-label={isDark ? 'Activer le thème clair' : 'Activer le thème sombre'}
        title={isDark ? 'Activer le mode clair' : 'Activer le mode sombre luxueux'}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-300 animate-in spin-in-90 duration-300" />
        ) : (
          <Moon className="w-5 h-5 text-[#9E2A50] animate-in zoom-in-75 duration-300" />
        )}
      </button>
    );
  }

  // Default 'icon' variant
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative group p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
        isDark
          ? 'bg-stone-800/80 hover:bg-stone-700 text-amber-300 border border-pink-900/40 hover:border-pink-500/50 shadow-xs'
          : 'bg-white/90 hover:bg-white text-stone-700 border border-stone-200 hover:border-[#DFBA9D] shadow-xs'
      } ${className}`}
      aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
      title={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {/* Subtle Glow Ring */}
      <span
        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xs ${
          isDark ? 'bg-amber-400/20' : 'bg-pink-400/20'
        }`}
        aria-hidden="true"
      />

      {isDark ? (
        <Sun className="w-4 h-4 text-amber-300 relative z-10 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#9E2A50] relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
};
