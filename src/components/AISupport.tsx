'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';

export default function AISupport() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    api: '/api/chat',
  } as any);

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    try {
      const currentInput = input;
      setInput(''); // Clear immediately for better UX
      await sendMessage({
        parts: [{ type: 'text', text: currentInput }]
      } as any); 
    } catch (err) {
      console.error('Send failed', err);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-[320px] md:w-[380px] h-[500px] bg-nero-obsidian border border-nero-steel/50 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-nero-steel/30 bg-nero-void flex items-center justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] text-nero-bone uppercase font-bold">
                  NERO STRATEGIST
                </h3>
                <p className="text-[9px] tracking-[0.1em] text-nero-concrete uppercase">
                  ACTIVE PHASE 01 SUPPORT
                </p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-nero-concrete hover:text-nero-bone transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50">
                  <div className="w-8 h-8 rounded-full border border-nero-bronze/30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-nero-bronze rounded-full" />
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-[10px] tracking-widest text-nero-concrete uppercase">
                    System Ready
                  </p>
                </div>
              )}
              
              {messages.map((m) => (
                <div 
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] px-4 py-3 text-[13px] font-[family-name:var(--font-inter)] leading-relaxed
                    ${m.role === 'user' 
                      ? 'bg-nero-steel/20 border border-nero-steel/30 text-nero-bone' 
                      : 'bg-nero-void border border-nero-steel/10 text-nero-smoke'}
                  `}>
                    {(m as any).content || (m as any).parts?.map((p: any) => p.text).join('')}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-nero-void border border-nero-steel/10 px-4 py-3 flex gap-1">
                    <span className="w-1 h-1 bg-nero-concrete animate-bounce" />
                    <span className="w-1 h-1 bg-nero-concrete animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-nero-concrete animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={onChatSubmit}
              className="p-4 border-t border-nero-steel/30 bg-nero-void"
            >
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Query protocol..."
                  className="w-full bg-nero-obsidian border border-nero-steel/50 px-4 py-3 text-[12px] font-[family-name:var(--font-space)] text-nero-bone placeholder:text-nero-steel focus:outline-none focus:border-nero-bronze/50 transition-colors tracking-wider"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-nero-bronze disabled:opacity-30 disabled:grayscale transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-nero-void border border-nero-bronze/30 shadow-xl flex items-center justify-center group relative overflow-hidden"
      >
        {/* Bronze inner glow */}
        <div className="absolute inset-0 bg-nero-bronze/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-nero-bronze">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <div className="relative">
             <div className="w-2 h-2 rounded-full bg-nero-bronze animate-pulse shadow-[0_0_10px_rgba(184,151,106,0.5)]" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
