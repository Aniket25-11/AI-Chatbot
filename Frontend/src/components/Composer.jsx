import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Composer({ onSend }) {
  const [text, setText] = useState('');
  const textareaRef = useRef();

  useEffect(() => {
    // autoresize
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [text]);

  function submit() {
    if (!text || !text.trim()) return;
    onSend(text.trim());
    setText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  return (
    <div className="p-4 border-t border-[var(--glass)]">
      <div className="flex items-center gap-3">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="flex-1 bg-transparent resize-none focus:outline-none p-3 rounded-lg border border-[var(--glass)] placeholder:text-[var(--muted)]"
          rows={1}
          placeholder="Type your message..."
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={submit}
          className="p-3 rounded-md bg-gradient-to-br from-indigo-500 to-teal-400"
        >
          <Send size={18} />
        </motion.button>
      </div>
    </div>
  );
}
