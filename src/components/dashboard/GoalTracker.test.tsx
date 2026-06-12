import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GoalTracker } from './GoalTracker';
import * as storage from '@/lib/storage';

// Mock storage layer functions
vi.mock('@/lib/storage', async () => {
  const actual = await vi.importActual<typeof import('@/lib/storage')>('@/lib/storage');
  return {
    ...actual,
    loadGoal: vi.fn(),
    saveGoal: vi.fn(),
    clearGoal: vi.fn(),
  };
});

describe('GoalTracker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pulse card loader and then blank goal setup form', async () => {
    vi.mocked(storage.loadGoal).mockReturnValue(null);

    render(<GoalTracker currentTonnes={10} />);

    // First, it renders loader/placeholder (ssr-mismatch guard). After mount, it shows set goal card.
    expect(screen.getByText(/Set a reduction goal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Annual target/i)).toBeInTheDocument();
  });

  it('allows setting a valid goal and shows progress', async () => {
    const user = userEvent.setup();
    vi.mocked(storage.loadGoal).mockReturnValue(null);

    render(<GoalTracker currentTonnes={10} />);

    const targetInput = screen.getByLabelText(/Annual target/i);
    await user.clear(targetInput);
    await user.type(targetInput, '8');

    const setBtn = screen.getByRole('button', { name: /Set goal/i });
    await user.click(setBtn);

    expect(storage.saveGoal).toHaveBeenCalledWith(
      expect.objectContaining({
        targetTonnes: 8,
        baselineTonnes: 10,
      }),
    );
  });
});
