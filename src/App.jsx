/**
 * App.jsx — Root component orchestrating the chatbot UI states
 * States: hidden → popup → fullscreen
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
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-4 max-w-lg">
          <div className="w-20 h-20 mx-auto rounded-full bg-white shadow-popup flex items-center justify-center">
            <img
              src="/rub-logo.png"
              alt="RUB Logo"
              className="w-16 h-16 object-contain rounded-full"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-rub-deepBlue">
            Royal University of Bhutan
          </h1>
          <p className="text-rub-darkText/60 font-body text-sm leading-relaxed">
            AI-powered assistant for programs, admissions, campus info, and more.
            Click the chat button in the bottom-right corner to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
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

      {/* ── Floating button + popup ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
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
