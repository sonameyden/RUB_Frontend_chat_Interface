# 🎓 RUB Assistant — AI Chatbot for the Royal University of Bhutan

A modern, polished React chatbot widget built with RUB branding (deep blue + gold). Features a floating button, compact popup, and fullscreen mode — all integrated with your backend API.

---

## ✨ Features

| Feature | Detail |
|---|---|
| **Floating Button** | Fixed bottom-right, pulse animation, RUB logo |
| **Popup Mode** | 360×520 glass-style window, smooth scale-in animation |
| **Fullscreen Mode** | Full-viewport layout, max-width message column |
| **Transitions** | Hidden → Popup → Fullscreen with CSS animations |
| **Typing Indicator** | Animated 3-dot bounce while bot is responding |
| **Quick Suggestions** | 4 pre-set chips (Programs, Admissions, Colleges, Contact) |
| **Chat Persistence** | Last 60 messages saved to `localStorage` |
| **Markdown Support** | Bold (`**text**`), italic (`*text*`), bullet lists |
| **Timestamps** | Per-message timestamps |
| **Clear History** | Trash icon wipes chat and localStorage |
| **Auto-scroll** | Always scrolls to the latest message |
| **Enter to Send** | Standard keyboard UX |
| **Mobile-Ready** | Responsive at all breakpoints |

---

## 📁 Project Structure

```
rub-chatbot/
├── public/
│   └── rub-logo.png          ← RUB logo (served as favicon + fallback)
│
├── src/
│   ├── assets/
│   │   └── rub-logo.png      ← RUB logo for components
│   │
│   ├── components/
│   │   ├── ChatbotButton.jsx  ← Floating FAB with pulse ring
│   │   ├── ChatPopup.jsx      ← 360×520 compact popup
│   │   ├── ChatFullscreen.jsx ← Full-viewport chat page
│   │   ├── ChatHeader.jsx     ← Header bar (logo, title, controls)
│   │   ├── MessageBubble.jsx  ← User/bot message with markdown
│   │   ├── ChatInput.jsx      ← Input field + send button
│   │   ├── TypingIndicator.jsx← Animated 3-dot loader
│   │   └── QuickSuggestions.jsx ← Chip buttons
│   │
│   ├── hooks/
│   │   └── useChat.js         ← All chat state & logic
│   │
│   ├── utils/
│   │   └── api.js             ← fetch wrapper + QUICK_SUGGESTIONS
│   │
│   ├── styles/
│   │   └── index.css          ← Tailwind + custom animations/CSS vars
│   │
│   ├── App.jsx                ← Root: state machine for UI modes
│   └── main.jsx               ← ReactDOM entry point
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### 1 — Prerequisites

- **Node.js** ≥ 18  (check: `node -v`)
- **npm** ≥ 9       (check: `npm -v`)

### 2 — Install dependencies

```bash
cd rub-chatbot
npm install
```

### 3 — Configure the API URL

```bash
cp .env.example .env
```

Open `.env` and set your backend URL:

```env
VITE_API_URL=https://your-backend.com/api/chat
```

> **If you don't have a backend yet**, the chatbot will still run in demo mode and show a friendly error message for each query.

### 4 — Start development server

```bash
npm run dev
```

Vite opens the app at **http://localhost:3000** automatically.

### 5 — Build for production

```bash
npm run build
```

Output goes to `dist/`. Serve with any static host (Netlify, Vercel, Nginx, etc.).

```bash
npm run preview   # preview the production build locally
```

---

## 🔌 Backend API Contract

### Request

```http
POST /api/chat
Content-Type: application/json

{
  "message": "What programs does RUB offer?",
  "history": [
    { "role": "user",      "content": "Hello" },
    { "role": "assistant", "content": "Kuzu Zangpo La! How can I help?" }
  ]
}
```

### Response

```json
{
  "response": "RUB offers programs in engineering, IT, natural resources..."
}
```

The API utility also accepts `message`, `reply`, `answer`, or `content` as the response key — so existing APIs with different key names work without code changes.

---

## 🎨 Design System

### Colors

| Token | Hex | Usage |
|---|---|---|
| `rub-deepBlue` | `#3A6EA5` | Primary, user messages, FAB |
| `rub-royalBlue` | `#6FA3D2` | Header gradient, highlights |
| `rub-lightBlue` | `#8BB8E8` | Hover states |
| `rub-gold` | `#C9A34E` | Send button, accents |
| `rub-goldHover` | `#D4AF37` | Gold hover state |
| `rub-lightGray` | `#F5F7FA` | Bot messages, input bg |
| `rub-panelBg` | `#EFF4FB` | Suggestion chips |

### Fonts

| Font | Usage |
|---|---|
| **Playfair Display** | Headings, brand name (`font-display`) |
| **DM Sans** | All body copy, UI text (`font-body`) |

---

## 🛠 Customisation Guide

### Change API URL
Edit `.env`:
```env
VITE_API_URL=https://my-new-backend.com/api/chat
```

### Change quick suggestions
Edit `src/utils/api.js` → `QUICK_SUGGESTIONS` array.

### Change colors
Edit `tailwind.config.js` → `theme.extend.colors.rub`.

### Change welcome message
Edit `src/hooks/useChat.js` → `WELCOME_MESSAGE.text`.

### Embed in an existing site
Remove the demo background in `App.jsx` and keep only the floating widget markup:

```jsx
// In App.jsx, delete the mesh-bg <div> block.
// Keep only the fixed bottom-right container.
```

Then import `App.jsx` (or a re-exported `<RUBChatbot />` wrapper) in your main site.

---

## 📦 Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Dev server & bundler |
| Tailwind CSS | 3 | Utility-first styling |
| lucide-react | 0.383 | Icons |

No heavy dependencies. Bundle size ≈ **~150 KB** gzipped.

---

## 🗺 Roadmap / Optional Enhancements

- [ ] Dark mode toggle (infrastructure in CSS, just needs a `<button>` to toggle `dark` class on `<html>`)
- [ ] Streaming responses (SSE / ReadableStream)
- [ ] Sidebar with conversation history list
- [ ] File/image upload support
- [ ] Accessibility: full ARIA labelling, focus trap in popup
- [ ] Unit tests (Vitest + Testing Library)

---

## 📜 License

Internal use — Royal University of Bhutan. Contact the IT Division for redistribution rights.

---

*Built with ❤️ for the Royal University of Bhutan*
