/**
 * useChat.js — Core chat state management hook
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { sendMessage } from '../utils/api';

const STORAGE_KEY = 'rub_chat_history';

const WELCOME_MESSAGE = {
  id:        'welcome',
  sender:    'bot',
  text:      "Kuzu Zangpo La! 🙏\n\nI'm the **RUB Assistant**, here to help with everything about the Royal University of Bhutan — programs, admissions, colleges, campus life, and more.\n\nHow can I assist you today?",
  timestamp: new Date(),
  isWelcome: true,
};

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Rehydrate Date objects
    return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return null;
  }
}

function saveHistory(messages) {
  try {
    // Save all except the welcome message to keep storage lean
    const toSave = messages.filter(m => !m.isWelcome);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave.slice(-60)));
  } catch {
    // Silently ignore storage errors
  }
}

export function useChat() {
  const [messages, setMessages]   = useState(() => {
    const saved = loadHistory();
    return [WELCOME_MESSAGE, ...(saved || [])];
  });
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [error, setError]         = useState(null);
  const bottomRef                 = useRef(null);
  const abortRef                  = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  // Persist history
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  const addMessage = useCallback((msg) => {
    const full = {
      id:        Date.now() + Math.random(),
      timestamp: new Date(),
      ...msg,
    };
    setMessages(prev => [...prev, full]);
    return full;
  }, []);

  const sendUserMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setError(null);

    // Add user message
    addMessage({ sender: 'user', text: trimmed });
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.filter(m => !m.isWelcome);
      const reply   = await sendMessage(trimmed, history);
      addMessage({ sender: 'bot', text: reply });
    } catch (err) {
      setError('Unable to reach the assistant. Please try again.');
      addMessage({
        sender:  'bot',
        text:    '⚠️ I\'m having trouble connecting right now. Please try again in a moment.',
        isError: true,
      });
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, messages, addMessage]);

  const handleSubmit = useCallback((e) => {
    e?.preventDefault();
    sendUserMessage(input);
  }, [input, sendUserMessage]);

  const handleSuggestion = useCallback((suggestion) => {
    sendUserMessage(suggestion.message);
  }, [sendUserMessage]);

  const clearHistory = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    input,
    setInput,
    isTyping,
    error,
    bottomRef,
    handleSubmit,
    handleSuggestion,
    clearHistory,
    sendUserMessage,
  };
}
