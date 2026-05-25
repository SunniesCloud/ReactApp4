import { VotingItem } from '@/types';

describe('votesReducer', () => {
  const initialState: VotingItem[] = [
    { id: '1', name: 'React', voteCount: 10 },
    { id: '2', name: 'Vue', voteCount: 5 },
  ];

  test('increments vote count', () => {
    const newState = votesReducer(initialState, { type: 'INCREMENT_VOTE', payload: { id: '1' } });
    expect(newState[0].voteCount).toBe(11);
  });

  test('decrements vote count', () => {
    const newState = votesReducer(initialState, { type: 'DECREMENT_VOTE', payload: { id: '2' } });
    expect(newState[1].voteCount).toBe(4);
  });

  test('does not decrement below zero', () => {
    const zeroState = [{ id: '1', name: 'Zero', voteCount: 0 }];
    const newState = votesReducer(zeroState, { type: 'DECREMENT_VOTE', payload: { id: '1' } });
    expect(newState[0].voteCount).toBe(0);
  });

  test('adds a new item', () => {
    const newState = votesReducer(initialState, { type: 'ADD_ITEM', payload: { name: 'Svelte' } });
    expect(newState).toHaveLength(3);
    expect(newState[2].name).toBe('Svelte');
  });
});
