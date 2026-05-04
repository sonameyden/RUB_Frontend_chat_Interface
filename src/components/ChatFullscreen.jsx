/**
 * ChatFullscreen.jsx — Full-viewport chat experience (mobile-responsive)
 */

import ChatHeader       from './ChatHeader';
import MessageBubble    from './MessageBubble';
import TypingIndicator  from './TypingIndicator';
import ChatInput        from './ChatInput';
import QuickSuggestions from './QuickSuggestions';
import rubLogo          from '../assets/rub-logo.png';

export default function ChatFullscreen({
  messages,
  isTyping,
  input,
  setInput,
  onSubmit,
  onSuggestion,
  onToggleFullscreen,
  onClear,
  bottomRef,
}) {
  const showSuggestions = messages.length <= 1;

  return (
    <div className="fullscreen-overlay flex flex-col animate-fade-in">

      {/* Top header */}
      <ChatHeader
        logoSrc={rubLogo}
        onToggleFullscreen={onToggleFullscreen}
        onClear={onClear}
        isFullscreen={true}
      />

      {/* Decorative university band — hidden on very small screens */}
      <div className="hidden sm:flex items-center justify-center py-3 px-4
                      border-b border-rub-borderLight bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img src={rubLogo} alt="RUB" className="w-6 h-6 rounded-full object-contain" />
          <span className="text-xs text-rub-deepBlue/70 font-body font-medium tracking-widest uppercase">
            Royal University of Bhutan · AI Assistant
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
            style={{ color: '#C9A34E', borderColor: '#C9A34E', background: '#fdf8ef' }}
          >
            Beta
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto chat-scroll py-4 sm:py-6 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} className="h-2" />
        </div>
      </div>

      {/* Quick suggestions */}
      <div className="max-w-2xl mx-auto w-full px-1">
        <QuickSuggestions onSelect={onSuggestion} visible={showSuggestions} />
      </div>

      {/* Input area */}
      <div className="border-t border-rub-borderLight bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={onSubmit}
            disabled={isTyping}
            autoFocus
          />
        </div>
        <p className="text-center text-[10px] text-gray-400 pb-2 font-body px-4">
          RUB Assistant can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}