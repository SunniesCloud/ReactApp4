export interface VotingItem {
  id: string;
  name: string;
  voteCount: number;
}

export type VotingAction =
  | { type: 'INCREMENT_VOTE'; payload: { id: string } }
  | { type: 'DECREMENT_VOTE'; payload: { id: string } }
  | { type: 'ADD_ITEM'; payload: { name: string } };