import React from 'react';
import ThemeToggle from './ThemeToggle';
import { RefreshCcw } from 'lucide-react';

export default function Header({ onClear }) {
  return (
    <header className="flex items-center justify-between p-4 border-b border-[var(--glass)]">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center font-bold text-black">
          AI
        </div>
        <div>
          <div className="text-sm font-semibold">Aniket's Bot</div>
          <div className="text-xs text-[var(--muted)]">Futuristic assistant</div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onClear}
          className="flex items-center gap-2 px-3 py-1 text-sm rounded-md hover:bg-[var(--glass)]"
          title="Clear chat"
        >
          <RefreshCcw size={16} />
          Clear
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
