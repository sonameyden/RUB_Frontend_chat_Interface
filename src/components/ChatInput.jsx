/**
 * ChatInput.jsx — Message input bar
 */

import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ value, onChange, onSubmit, disabled, autoFocus = true }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [autoFocus]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 px-3 py-2.5
                 border-t border-rub-borderLight bg-white"
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask about programs, admissions, or campus info…"
        className="flex-1 px-3.5 py-2.5 text-sm rounded-xl
                   bg-rub-lightGray border border-transparent
                   text-rub-darkText placeholder-gray-400
                   focus:outline-none focus:border-rub-royalBlue focus:bg-white
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                   bg-rub-gold hover:bg-rub-goldHover active:scale-95
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-150 shadow-sm"
      >
        <Send size={15} className="text-white" strokeWidth={2.2} />
      </button>
    </form>
  );
}
