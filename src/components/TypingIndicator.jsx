/**
 * TypingIndicator.jsx — Animated "bot is typing" indicator
 */

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 msg-enter">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rub-deepBlue to-rub-royalBlue
                      flex items-center justify-center flex-shrink-0 shadow-md">
        <span className="text-white text-[10px] font-bold">R</span>
      </div>

      {/* Bubble */}
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm
                      bg-white border border-rub-borderLight shadow-message
                      flex items-center gap-1.5">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}
