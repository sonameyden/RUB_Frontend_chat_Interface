/**
 * ChatHeader.jsx — Chat window header bar (mobile-responsive)
 */

import { Minus, Maximize2, Minimize2, Trash2, X } from 'lucide-react';

export default function ChatHeader({
  onMinimize,
  onToggleFullscreen,
  onClose,
  onClear,
  isFullscreen = false,
  logoSrc,
}) {
  return (
    <div
      className="relative flex items-center px-3 sm:px-4 py-3 flex-shrink-0 select-none overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2d5a8e 0%, #3A6EA5 45%, #6FA3D2 100%)',
      }}
    >
      {/* Decorative gold accent line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]"
           style={{ background: 'linear-gradient(90deg, transparent, #C9A34E 30%, #e8c96a 50%, #C9A34E 70%, transparent)' }} />

      {/* Left: logo + title */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        {logoSrc ? (
          <img
            src={logoSrc}
            alt="RUB Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-contain bg-white p-0.5 shadow-md flex-shrink-0"
          />
        ) : (
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 border border-white/30
                          flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="text-white font-display font-bold text-xs">R</span>
          </div>
        )}

        <div className="min-w-0">
          <h3 className="text-white font-display font-semibold text-sm leading-tight truncate">
            RUB Assistant
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
            <span className="text-white/70 text-[10px] font-body">Online · Ready to help</span>
          </div>
        </div>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
        {/* Clear chat */}
        <button
          onClick={onClear}
          aria-label="Clear chat"
          title="Clear chat history"
          className="w-7 h-7 rounded-lg flex items-center justify-center
                     text-white/60 hover:text-white hover:bg-white/15
                     transition-all duration-150"
        >
          <Trash2 size={13} strokeWidth={2} />
        </button>

        {/* Minimize (popup only) */}
        {!isFullscreen && onMinimize && (
          <button
            onClick={onMinimize}
            aria-label="Minimize chat"
            className="w-7 h-7 rounded-lg flex items-center justify-center
                       text-white/70 hover:text-white hover:bg-white/15
                       transition-all duration-150"
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>
        )}

        {/* Expand / Shrink — hidden on mobile to save space (fullscreen is better) */}
        <button
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          className="hidden sm:flex w-7 h-7 rounded-lg items-center justify-center
                     text-white/70 hover:text-white hover:bg-white/15
                     transition-all duration-150"
        >
          {isFullscreen
            ? <Minimize2 size={13} strokeWidth={2} />
            : <Maximize2 size={13} strokeWidth={2} />}
        </button>

        {/* Close */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="w-7 h-7 rounded-lg flex items-center justify-center
                       text-white/70 hover:text-red-300 hover:bg-white/15
                       transition-all duration-150"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}