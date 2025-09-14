import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWindow({ messages, typing }) {
  const containerRef = useRef();

  // auto-scroll to bottom on new messages
  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    node.scrollTo({
      top: node.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, typing]);

  // group messages by role for grouping display (simple grouping)
  function groupedMessages() {
    const groups = [];
    messages.forEach((m) => {
      const last = groups[groups.length - 1];
      if (!last || last.role !== m.role) {
        groups.push({ role: m.role, items: [m] });
      } else {
        last.items.push(m);
      }
    });
    return groups;
  }

  return (
    <div className="p-4 overflow-auto" style={{ height: '60vh' }} ref={containerRef}>
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {groupedMessages().map((g, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <div className={`flex ${g.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[80%] space-y-2">
                  {g.items.map((m) => (
                    <MessageBubble key={m.id} role={m.role} text={m.text} ts={m.ts} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-full bg-white/8" />
            <div className="bg-[var(--glass)] px-3 py-2 rounded-lg inline-block">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 rounded-full animate-pulse delay-150"></div>
                <div className="h-2 w-2 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
