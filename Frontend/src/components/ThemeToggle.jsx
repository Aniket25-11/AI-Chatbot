import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mode, setMode] = useState(() => document.documentElement.classList.contains('light') ? 'light' : 'dark');

  useEffect(() => {
    if (mode === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [mode]);

  return (
    <button
      onClick={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
      className="p-2 rounded-md hover:bg-white/3"
      aria-label="Toggle theme"
    >
      {mode === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
