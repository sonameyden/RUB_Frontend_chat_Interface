/**
 * api.js — RUB Chatbot API Utility
 * ─────────────────────────────────
 * Replace VITE_API_URL in your .env file with your backend URL.
 * Example .env:  VITE_API_URL=https://your-backend.com/api/chat
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/chat';

/**
 * Send a message to the RUB Assistant backend.
 * @param {string} message - User's message text
 * @param {Array}  history - Optional conversation history
 * @returns {Promise<string>} Bot response text
 */
export async function sendMessage(message, history = []) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept':        'application/json',
    },
    body: JSON.stringify({
      message,
      history: history.map(m => ({
        role:    m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      })),
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => 'Unknown error');
    throw new Error(`API error ${response.status}: ${errText}`);
  }

  const data = await response.json();

  // Support multiple response shapes
  return (
    data?.response   ||
    data?.message    ||
    data?.reply      ||
    data?.answer     ||
    data?.content    ||
    'Sorry, I could not process your request.'
  );
}

/**
 * Quick-suggestion messages mapped to pre-canned or live queries.
 */
export const QUICK_SUGGESTIONS = [
  { label: '🎓 Programs Offered',      message: 'What programs and courses does RUB offer?' },
  { label: '📋 Admissions 2025/26',    message: 'What are the admission requirements and deadlines for 2025/26?' },
  { label: '📍 Campus & Colleges',     message: 'Where are the RUB colleges located across Bhutan?' },
  { label: '📞 Contact Information',   message: 'How can I contact the Royal University of Bhutan?' },
];
