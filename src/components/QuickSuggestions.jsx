/**
 * QuickSuggestions.jsx — Suggestion chips displayed in the message area
 */

import { QUICK_SUGGESTIONS } from '../utils/api';

export default function QuickSuggestions({ onSelect, visible }) {
  if (!visible) return null;

  return (
    <div className="px-4 pb-3 msg-enter">
      <p className="text-[11px] text-gray-400 font-body mb-2 font-medium tracking-wide uppercase">
        Quick questions
      </p>
      <div className="flex flex-wrap gap-2">
        {QUICK_SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s)}
            className="chip px-3 py-1.5 rounded-lg text-xs font-body font-medium
                       bg-rub-panelBg border border-rub-borderLight
                       text-rub-deepBlue hover:bg-rub-deepBlue hover:text-white
                       hover:border-rub-deepBlue
                       transition-all duration-200 shadow-sm"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
