'use client';

import { useVotes } from '@/context/VotesContext';

interface VotingWidgetProps {
  itemId: string;
  showName?: boolean;
}

export default function VotingWidget({ itemId, showName = true }: VotingWidgetProps) {
  const { items, dispatch } = useVotes();
  const item = items.find(i => i.id === itemId);

  if (!item) return <div className="text-red-500 p-2">Item not found</div>;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showName && <span className="font-medium text-gray-800">{item.name}</span>}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'INCREMENT_VOTE', payload: { id: itemId } })}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            aria-label={`Upvote ${item.name}`}
          >
            👍 {item.voteCount}
          </button>
          <button
            onClick={() => dispatch({ type: 'DECREMENT_VOTE', payload: { id: itemId } })}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            aria-label={`Downvote ${item.name}`}
          >
            👎
          </button>
        </div>
      </div>
    </div>
  );
}