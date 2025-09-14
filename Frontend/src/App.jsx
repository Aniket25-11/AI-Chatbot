import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatWindow from './components/ChatWindow';
import Composer from './components/Composer';
import Header from './components/Header';

// set this to your backend address
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export default function App() {
  const [messages, setMessages] = useState([]); // {role, text, ts, id}
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // initialize socket after component mounts
    const s = io(BACKEND_URL, { transports: ['websocket','polling'], reconnectionDelayMax: 5000 });
    // store socket on window for debugging
    window.__chat_socket = s;

    s.on('chat-history', (history) => {
      setMessages(history || []);
    });

    s.on('ai-typing', (payload) => {
      setTyping(!!(payload && payload.typing));
    });

    s.on('ai-message-response', (entry) => {
      const msg = {
        id: entry.id || `${entry.ts || Date.now()}-ai`,
        role: entry.role === 'assistant' ? 'model' : entry.role,
        text: entry.text || '',
        ts: entry.ts || Date.now()
      };
      setMessages((m) => [...m, msg]);
      setTyping(false);
    });

    s.on('connect', () => {
      // console.log('✅ Connected to backend:', s.id);
    });

    s.on('connect_error', (err) => {
      console.error('❌ Socket connect error:', err);
    });

    s.on('disconnect', (reason) => {
      console.log('⚠️ Socket disconnected:', reason);
    });

    // cleanup on unmount
    return () => {
      try { s.disconnect(); } catch (e) {}
    };
  }, []);

  function sendMessage(text) {
    if (!text || !text.trim()) return;
    const entry = {
      id: `${Date.now()}-user`,
      role: 'user',
      text,
      ts: Date.now()
    };
    // optimistic add
    setMessages((m) => [...m, entry]);

    // emit to server via the socket stored on window
    const s = window.__chat_socket;
    if (s && s.connected) {
      s.emit('ai-message', text);
    } else {
      console.warn('Socket not connected — cannot send message');
    }
  }

  function clearChat() {
    const s = window.__chat_socket;
    if (s && s.connected) s.emit('clear-chat');
    setMessages([]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div
        className="w-full max-w-3xl bg-[var(--panel)] rounded-2xl shadow-xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.03)' }}
      >
        <Header onClear={clearChat} />
        <ChatWindow messages={messages} typing={typing} />
        <Composer onSend={sendMessage} />
      </div>
    </div>
  );
}
