/**
 * MessageBubble.jsx — Individual message bubble (user or bot)
 * Supports basic markdown: **bold**, *italic*, line breaks, bullet lists
 */

function formatText(text) {
  if (!text) return [];

  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part.split(/(\*[^*]+\*)/g).map((p, k) => {
        if (p.startsWith('*') && p.endsWith('*')) {
          return <em key={k}>{p.slice(1, -1)}</em>;
        }
        return p;
      });
    });

    const isBullet = line.trimStart().startsWith('- ') || line.trimStart().startsWith('• ');
    if (isBullet) {
      return (
        <div key={i} className="flex items-start gap-1.5 leading-relaxed">
          <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
          <span>{parts}</span>
        </div>
      );
    }

    if (line === '') return <div key={i} className="h-1.5" />;
    return <div key={i} className="leading-relaxed">{parts}</div>;
  });
}

function TimeStamp({ timestamp, isUser }) {
  const time = timestamp instanceof Date
    ? timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';
  return (
    <div className={`text-[10px] mt-1 opacity-50 select-none
      ${isUser ? 'text-right text-rub-lightBlue' : 'text-left text-gray-400'}`}>
      {time}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser  = message.sender === 'user';
  const isError = message.isError;

  return (
    <div className={`flex items-end gap-2.5 msg-enter ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

      {/* Bot avatar — left side */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rub-deepBlue to-rub-royalBlue
                        flex items-center justify-center flex-shrink-0 shadow-md self-end mb-4">
          <span className="text-white text-[10px] font-bold font-display">R</span>
        </div>
      )}

      {/*
        User avatar — BEFORE the bubble in DOM order.
        flex-row-reverse makes the first DOM child appear on the RIGHT visually. ✓
      */}
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rub-gold to-rub-goldHover
                        flex items-center justify-center flex-shrink-0 shadow-md self-end mb-4">
          <span className="text-white text-[10px] font-bold">U</span>
        </div>
      )}

      {/* Message bubble + timestamp */}
      <div className={`flex flex-col max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`
            px-4 py-3 text-sm font-body leading-relaxed
            ${isUser
              ? 'bg-gradient-to-br from-rub-deepBlue to-[#2d5a8e] text-white rounded-2xl rounded-br-sm shadow-md'
              : isError
                ? 'bg-red-50 text-red-700 border border-red-200 rounded-2xl rounded-bl-sm shadow-message'
                : 'bg-white text-rub-darkText border border-rub-borderLight rounded-2xl rounded-bl-sm shadow-message'
            }
          `}
        >
          <div className="space-y-0.5">
            {formatText(message.text)}
          </div>
        </div>
        <TimeStamp timestamp={message.timestamp} isUser={isUser} />
      </div>

    </div>
  );
}