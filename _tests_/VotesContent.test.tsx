import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useVotes, VotesProvider } from '@/context/VotesContext';

function TestComponent() {
  const { items, dispatch } = useVotes();
  return (
    <>
      <div data-testid="count">{items.length}</div>
      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: { name: 'New' } })}>
        Add
      </button>
    </>
  );
}

describe('VotesContext', () => {
  test('provides initial items', () => {
    render(
      <VotesProvider>
        <TestComponent />
      </VotesProvider>
    );
    expect(screen.getByTestId('count')).toHaveTextContent('3');
  });

  test('adds new item when dispatched', async () => {
    render(
      <VotesProvider>
        <TestComponent />
      </VotesProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByTestId('count')).toHaveTextContent('4');
  });

  test('throws error when useVotes used outside provider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow(
      'useVotes must be used within a VotesProvider'
    );
  });
});