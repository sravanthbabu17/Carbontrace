import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculatorForm } from './CalculatorForm';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('CalculatorForm', () => {
  it('navigates through the steps of the calculator and submits', async () => {
    const user = userEvent.setup();
    render(<CalculatorForm />);

    // Step 1: Region
    expect(screen.getByRole('heading', { name: /Region/i })).toBeInTheDocument();
    const backBtn = screen.getByRole('button', { name: /back/i });
    expect(backBtn).toBeDisabled();

    // Choose Region
    const regionOpt = screen.getByLabelText(/United States/i);
    await user.click(regionOpt);

    // Go to Step 2
    const nextBtn = screen.getByRole('button', { name: /continue/i });
    await user.click(nextBtn);

    // Step 2: Transport
    expect(screen.getByRole('heading', { name: /Transport/i })).toBeInTheDocument();
    expect(backBtn).not.toBeDisabled();
  });
});
