import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VotingWidget from '@/components/VotingWidget';
import { VotesProvider } from '@/context/VotesContext';

const renderWithProvider = (itemId: string) =>
  render(
    <VotesProvider>
      <VotingWidget itemId={itemId} showName={true} />
    </VotesProvider>
  );

describe('VotingWidget', () => {
  test('renders item name and vote count', () => {
    renderWithProvider('1');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('👍 42')).toBeInTheDocument();
  });

  test('increments vote count on upvote', async () => {
    renderWithProvider('1');
    const upvoteButton = screen.getByRole('button', { name: /upvote react/i });
    await userEvent.click(upvoteButton);
    expect(screen.getByText('👍 43')).toBeInTheDocument();
  });

  test('decrements vote count on downvote', async () => {
    renderWithProvider('1');
    const downvoteButton = screen.getByRole('button', { name: /downvote react/i });
    await userEvent.click(downvoteButton);
    expect(screen.getByText('👍 41')).toBeInTheDocument();
  });

  test('shows error for missing item', () => {
    renderWithProvider('invalid-id');
    expect(screen.getByText('Item not found')).toBeInTheDocument();
  });
});
