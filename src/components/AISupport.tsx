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
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-20 right-0 w-[320px] md:w-[400px] h-[550px] technical-panel flex flex-col overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Scan Line Animation Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="scan-line" style={{ animationDuration: '8s' }} />
            </div>

            {/* Header */}
            <div className="p-5 border-b border-nero-steel/30 bg-nero-void flex items-center justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.3em] text-nero-bone uppercase font-bold">
                  NR0_STRATEGIST_PROT0COL
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-nero-bronze animate-pulse" />
                    <p className="text-[9px] tracking-[0.1em] text-nero-concrete uppercase font-mono">
                      System_Active // Port_AI_01
                    </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 border border-nero-steel hover:border-nero-bronze text-nero-concrete hover:text-nero-bronze transition-all"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-10 h-10 border border-nero-bronze/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 border border-nero-bronze/10 animate-ping" />
                    <div className="w-2 h-2 bg-nero-bronze" />
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-[10px] tracking-[0.4em] text-nero-concrete uppercase">
                    INITIALIZING_DATA_STREAM
                  </p>
                </div>
              )}
              
              {messages.map((m) => (
                <div 
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] px-5 py-4 text-[13px] font-[family-name:var(--font-inter)] leading-relaxed relative
                    ${m.role === 'user' 
                      ? 'bg-nero-steel/20 border-l border-nero-bronze/50 text-nero-bone' 
                      : 'bg-nero-void border-l border-nero-steel text-nero-smoke'}
                  `}>
                    <span className="absolute top-0 left-0 text-[8px] font-mono opacity-20 p-1">
                        {m.role === 'user' ? 'USR' : 'SYS'}
                    </span>
                    <div className="mt-1">
                        {(m as any).content || (m as any).parts?.map((p: any) => p.text).join('')}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-nero-void border-l border-nero-bronze px-5 py-4 flex gap-1 items-center">
                    <span className="text-[10px] font-mono text-nero-bronze mr-2 animate-pulse">PROCESSING...</span>
                    <span className="w-1 h-3 bg-nero-bronze/50 animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={onChatSubmit}
              className="p-5 border-t border-nero-steel/30 bg-nero-void"
            >
              <div className="relative group">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="INPUT_QUERY_PROTOCOL..."
                  className="w-full bg-nero-obsidian border border-nero-steel px-5 py-4 text-[12px] font-[family-name:var(--font-space)] text-nero-bone placeholder:text-nero-steel/50 focus:outline-none focus:border-nero-bronze transition-all tracking-widest"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-nero-bronze disabled:opacity-20 transition-all hover:scale-110"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB - SYSTEM DOCK */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-nero-void border border-nero-bronze/40 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center group relative overflow-hidden"
      >
        {/* Persistent Rim Light for Visibility */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-nero-bronze/50" />
        <div className="absolute bottom-0 right-0 w-[1px] h-1/2 bg-nero-bronze/30" />
        
        {/* Bronze inner glow on hover */}
        <div className="absolute inset-0 bg-nero-bronze/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-nero-bronze">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <div className="flex flex-col items-center gap-1">
             <div className="w-1.5 h-1.5 bg-nero-bronze shadow-[0_0_10px_rgba(184,151,106,1)]" />
             <span className="text-[8px] font-mono tracking-tighter text-nero-bronze opacity-50 group-hover:opacity-100 uppercase transition-opacity">SYS</span>
          </div>
        )}
      </motion.button>
    </div>

  );
}
