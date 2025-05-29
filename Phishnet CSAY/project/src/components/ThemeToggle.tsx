import React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 transition-colors duration-300 hover:bg-slate-300 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
    >
      {/* Sun Icon (visible in light mode) */}
      <Sun
        className={`absolute h-5 w-5 text-slate-800 transition-opacity transform duration-300 ${
          theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      />
      {/* Moon Icon (visible in dark mode) */}
      <Moon
        className={`absolute h-5 w-5 text-slate-100 transition-opacity transform duration-300 ${
          theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
      />
    </button>
  );
}
