/**
 * ChatPopup.jsx — Compact floating chat window
 */

import { useRef, useEffect } from 'react';
import ChatHeader       from './ChatHeader';
import MessageBubble    from './MessageBubble';
import TypingIndicator  from './TypingIndicator';
import ChatInput        from './ChatInput';
import QuickSuggestions from './QuickSuggestions';
import rubLogo          from '../assets/rub-logo.png';

export default function ChatPopup({
  messages,
  isTyping,
  input,
  setInput,
  onSubmit,
  onSuggestion,
  onMinimize,
  onClose,
  onToggleFullscreen,
  onClear,
  bottomRef,
}) {
  const showSuggestions = messages.length <= 1; // Show after welcome only

  return (
    <div
      className="popup-enter flex flex-col rounded-[20px] overflow-hidden
                 border border-rub-borderLight"
      style={{
        width:     '360px',
        height:    '520px',
        boxShadow: '0 12px 48px rgba(58,110,165,0.22), 0 2px 16px rgba(0,0,0,0.10)',
        background: '#ffffff',
      }}
    >
      {/* Header */}
      <ChatHeader
        logoSrc={rubLogo}
        onMinimize={onMinimize}
        onClose={onClose}
        onToggleFullscreen={onToggleFullscreen}
        onClear={onClear}
        isFullscreen={false}
      />

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto chat-scroll px-4 py-4 space-y-3"
        style={{ background: 'linear-gradient(180deg, #f7f9fd 0%, #ffffff 100%)' }}
      >
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Quick suggestions */}
      <QuickSuggestions onSelect={onSuggestion} visible={showSuggestions} />

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={onSubmit}
        disabled={isTyping}
        autoFocus
      />
    </div>
  );
}
