'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';

export default function AISupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
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

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[400px] h-[min(550px,80vh)] z-[201] technical-panel flex flex-col overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Scan Line Animation Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="scan-line" style={{ animationDuration: '8s' }} />
            </div>

            {/* Header */}
            <div className="p-5 border-b border-nero-steel/30 bg-nero-void flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.3em] text-nero-bone uppercase font-bold">
                  NERO AI
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-nero-bronze animate-pulse" />
                    <p className="text-[9px] tracking-[0.1em] text-nero-concrete uppercase font-mono">
                      Ask anything about NERO
                    </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 border border-nero-steel hover:border-nero-bronze text-nero-concrete hover:text-nero-bronze transition-all cursor-pointer"
                aria-label="Close chat"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-10 h-10 border border-nero-bronze/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 border border-nero-bronze/10 animate-ping" />
                    <div className="w-2 h-2 bg-nero-bronze" />
                  </div>
                  <p className="font-[family-name:var(--font-space)] text-[10px] tracking-[0.3em] text-nero-concrete uppercase">
                    Ask about sizing, materials, or the vision
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
                        {m.role === 'user' ? 'YOU' : 'NERO'}
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
                    <span className="text-[10px] font-mono text-nero-bronze mr-2 animate-pulse">THINKING...</span>
                    <span className="w-1 h-3 bg-nero-bronze/50 animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form 
              onSubmit={onChatSubmit}
              className="p-4 border-t border-nero-steel/30 bg-nero-void shrink-0"
            >
              <div className="relative group">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask NERO anything..."
                  className="w-full bg-nero-obsidian border border-nero-steel px-5 py-4 text-[12px] font-[family-name:var(--font-inter)] text-nero-bone placeholder:text-nero-smoke/80 focus:outline-none focus:border-nero-bronze transition-all tracking-wide"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-nero-bronze disabled:opacity-20 transition-all hover:scale-110 cursor-pointer"
                  aria-label="Send message"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button — bottom-right corner */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[200] flex items-center gap-3 cursor-pointer group"
        aria-label="Open NERO AI chat"
      >
        {/* Label pill — shows until first opened */}
        {!hasOpened && !isOpen && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="hidden md:flex items-center bg-nero-void/90 border border-nero-steel/30 px-4 py-2 backdrop-blur-sm"
          >
            <span className="font-[family-name:var(--font-space)] text-[10px] tracking-[0.15em] text-nero-smoke">
              ASK NERO
            </span>
          </motion.span>
        )}

        {/* Main button */}
        <div className="relative w-14 h-14 bg-nero-void border border-nero-bronze/50 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
          {/* Bronze glow pulse */}
          <div className={`absolute inset-0 bg-nero-bronze/10 ${!hasOpened ? 'animate-pulse' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500`} />
          
          {/* Top rim light */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-nero-bronze/60" />
          <div className="absolute bottom-0 right-0 w-[1px] h-1/2 bg-nero-bronze/30" />
          
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-nero-bronze relative z-10">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          ) : (
            <div className="flex flex-col items-center gap-1 relative z-10">
              <div className="w-2 h-2 bg-nero-bronze shadow-[0_0_12px_rgba(184,151,106,0.8)]" />
              <span className="text-[7px] font-[family-name:var(--font-space)] tracking-[0.1em] text-nero-bronze/80 uppercase">AI</span>
            </div>
          )}
        </div>
      </motion.button>
    </>
  );
}
