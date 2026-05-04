/**
 * App.jsx — Root component orchestrating the chatbot UI states
 * States: hidden → popup → fullscreen
 *
 * Mobile-first positioning:
 *  - The popup container is right-aligned but uses a small right inset
 *    on phones so the fluid-width popup never bleeds off-screen.
 */

import { useState, useCallback } from 'react';
import ChatbotButton  from './components/ChatbotButton';
import ChatPopup      from './components/ChatPopup';
import ChatFullscreen from './components/ChatFullscreen';
import { useChat }    from './hooks/useChat';

export default function App() {
  // UI state: 'hidden' | 'popup' | 'fullscreen'
  const [uiState, setUiState] = useState('hidden');

  const {
    messages, input, setInput, isTyping,
    bottomRef, handleSubmit, handleSuggestion, clearHistory,
  } = useChat();

  const openPopup      = useCallback(() => setUiState('popup'),      []);
  const minimize       = useCallback(() => setUiState('hidden'),     []);
  const openFullscreen = useCallback(() => setUiState('fullscreen'), []);
  const closeChat      = useCallback(() => setUiState('hidden'),     []);

  const toggleFullscreen = useCallback(() => {
    setUiState(prev => prev === 'fullscreen' ? 'popup' : 'fullscreen');
  }, []);

  const handleButtonClick = useCallback(() => {
    if (uiState === 'hidden') openPopup();
    else closeChat();
  }, [uiState, openPopup, closeChat]);

  const sharedProps = {
    messages, input, setInput,
    isTyping, bottomRef,
    onSubmit:           handleSubmit,
    onSuggestion:       handleSuggestion,
    onToggleFullscreen: toggleFullscreen,
    onClear:            clearHistory,
  };

  return (
    <>
      {/* ── Demo page background (replace with your actual site) ── */}
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="text-center space-y-4 max-w-lg w-full px-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-white shadow-popup flex items-center justify-center">
            <img
              src="/rub-logo.png"
              alt="RUB Logo"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-full"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-rub-deepBlue">
            Royal University of Bhutan
          </h1>
          <p className="text-rub-darkText/60 font-body text-sm leading-relaxed">
            AI-powered assistant for programs, admissions, campus info, and more.
            Tap the chat button in the bottom-right corner to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-2">
            {['Programs', 'Admissions', 'Colleges', 'Research'].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-body font-medium
                           bg-rub-panelBg border border-rub-borderLight text-rub-deepBlue"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Fullscreen chat ── */}
      {uiState === 'fullscreen' && (
        <ChatFullscreen {...sharedProps} />
      )}

      {/*
       * ── Floating button + popup ──
       *
       * Positioning notes:
       *  - `right-3`    (0.75rem / 12px) on mobile  → leaves ≥12px gap from edge
       *  - `sm:right-6` (1.5rem  / 24px) on ≥640px  → standard desktop gap
       *  - `bottom-4 sm:bottom-6` → slightly closer to edge on phones
       *
       * The popup itself is fluid-width (see ChatPopup.jsx), so it will
       * never be wider than (100vw - 1.5rem).
       */}
      <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end gap-3">
        {/* Popup */}
        {uiState === 'popup' && (
          <ChatPopup
            {...sharedProps}
            onMinimize={minimize}
            onClose={closeChat}
          />
        )}

        {/* FAB */}
        <div className="group">
          <ChatbotButton
            isOpen={uiState !== 'hidden'}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </>
  );
}