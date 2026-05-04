/**
 * QuickSuggestions.jsx — Suggestion chips (mobile-responsive)
 *
 * On small screens the chips scroll horizontally so they never wrap
 * into multiple crowded rows inside the narrow popup.
 */

import { QUICK_SUGGESTIONS } from '../utils/api';

export default function QuickSuggestions({ onSelect, visible }) {
  if (!visible) return null;

  return (
    <div className="px-3 pb-2 msg-enter">
      <p className="text-[11px] text-gray-400 font-body mb-2 font-medium tracking-wide uppercase">
        Quick questions
      </p>
      {/*
       * `overflow-x-auto` + `flex-nowrap` → horizontal scroll on mobile.
       * `sm:flex-wrap`                    → wraps normally on larger screens.
       * `scrollbar-hide` via inline style → hides the scrollbar on mobile for polish.
       */}
      <div
        className="flex gap-2 overflow-x-auto sm:flex-wrap pb-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {QUICK_SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s)}
            className="chip flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-body font-medium
                       bg-rub-panelBg border border-rub-borderLight
                       text-rub-deepBlue hover:bg-rub-deepBlue hover:text-white
                       hover:border-rub-deepBlue
                       transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}