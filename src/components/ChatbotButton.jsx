/**
 * ChatbotButton.jsx — Floating action button to open the chat
 */

import { MessageCircle, X } from 'lucide-react';
import rubLogo from '../assets/rub-logo.png';

export default function ChatbotButton({ isOpen, onClick }) {
  return (
    <div className="relative">
      {/* Pulse ring (shown only when closed) */}
      {!isOpen && (
        <span
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            animation: 'pulseRing 2.5s ease-out infinite',
            background: 'rgba(58,110,165,0.25)',
          }}
        />
      )}

      <button
        onClick={onClick}
        aria-label={isOpen ? 'Close RUB Assistant' : 'Open RUB Assistant'}
        className="btn-glow relative w-14 h-14 rounded-full flex items-center justify-center
                   transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden"
        style={{
          background:  'linear-gradient(145deg, #3A6EA5, #2d5a8e)',
          boxShadow:   '0 6px 24px rgba(58,110,165,0.45)',
        }}
      >
        {/* Inner gradient ring */}
        <div className="absolute inset-[2px] rounded-full"
             style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15), transparent)' }} />

        {/* Icon — toggles between logo/chat icon and X */}
        <div className={`transition-all duration-300 relative z-10
                         ${isOpen ? 'rotate-90 scale-90' : 'rotate-0 scale-100'}`}>
          {isOpen ? (
            <X size={22} className="text-white" strokeWidth={2.5} />
          ) : (
            <img
              src={rubLogo}
              alt="RUB"
              className="w-8 h-8 rounded-full object-contain bg-white/10"
              onError={e => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextSibling.style.display = 'block';
              }}
            />
          )}
          <MessageCircle size={22} className="text-white hidden" strokeWidth={2.2} />
        </div>
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5
                        bg-rub-darkText text-white text-xs font-body rounded-lg
                        whitespace-nowrap pointer-events-none
                        opacity-0 group-hover:opacity-100 transition-opacity
                        shadow-lg">
          Chat with RUB Assistant
          <div className="absolute top-full right-4 border-4 border-transparent border-t-rub-darkText" />
        </div>
      )}
    </div>
  );
}
