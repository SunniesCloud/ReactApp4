'use client';

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { VotingItem, VotingAction } from '@/types';

const initialItems: VotingItem[] = [
  { id: '1', name: 'React', voteCount: 42 },
  { id: '2', name: 'TypeScript', voteCount: 38 },
  { id: '3', name: 'Next.js', voteCount: 55 },
];

function votesReducer(state: VotingItem[], action: VotingAction): VotingItem[] {
  switch (action.type) {
    case 'INCREMENT_VOTE':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, voteCount: item.voteCount + 1 }
          : item
      );
    case 'DECREMENT_VOTE':
      return state.map(item =>
        item.id === action.payload.id && item.voteCount > 0
          ? { ...item, voteCount: item.voteCount - 1 }
          : item
      );
    case 'ADD_ITEM': {
      const newId = Date.now().toString();
      const newItem: VotingItem = {
        id: newId,
        name: action.payload.name,
        voteCount: 0,
      };
      return [...state, newItem];
    }
    default:
      return state;
  }
}

interface VotesContextType {
  items: VotingItem[];
  dispatch: React.Dispatch<VotingAction>;
}

const VotesContext = createContext<VotesContextType | undefined>(undefined);

export function VotesProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(votesReducer, initialItems);
  return (
    <VotesContext.Provider value={{ items, dispatch }}>
      {children}
    </VotesContext.Provider>
  );
}

export function useVotes() {
  const context = useContext(VotesContext);
  if (context === undefined) {
    throw new Error('useVotes must be used within a VotesProvider');
  }
  return context;
}