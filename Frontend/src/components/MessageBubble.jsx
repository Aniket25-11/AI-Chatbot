import React from 'react';
import { User, Bot } from 'lucide-react';

function timeFor(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ role, text, ts }) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mr-3">
          <div className="w-9 h-9 rounded-full bg-white/8" />
        </div>
      )}

      <div className={`max-w-[80%] space-y-2 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block px-3 py-2 rounded-lg ${isUser ? 'bg-indigo-600 text-white' : 'bg-[var(--glass)]'}`}>
          <div className="whitespace-pre-wrap break-words">
            {text}
          </div>
          <div className="text-[10px] text-[var(--muted)] mt-1 text-right">
            {timeFor(ts)}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="ml-3">
          <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
            <Bot size={16} />
          </div>
        </div>
      )}
    </div>
  );
}
