'use client';

import { useState } from 'react';
import { useVotes } from '@/context/VotesContext';
import VotingWidget from '@/components/VotingWidget';

export default function Home() {
  const { items, dispatch } = useVotes();
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      dispatch({ type: 'ADD_ITEM', payload: { name: newItemName.trim() } });
      setNewItemName('');
    }
  };
  
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tech Tools Voting</h1>

      <form onSubmit={handleAddItem} className="mb-8 flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter a new tech tool..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Item
        </button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <VotingWidget key={item.id} itemId={item.id} showName={true} />
        ))}
         </div>

         {/* Demonstrate reusability: compact leaderboard without names */}
      <div className="mt-10 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Leaderboard (Compact)</h2>
        <div className="space-y-2">
          {items.slice(0, 3).map((item) => (
            <VotingWidget key={item.id} itemId={item.id} showName={false} />
          ))}
        </div>
      </div>
    </main>
  );
}