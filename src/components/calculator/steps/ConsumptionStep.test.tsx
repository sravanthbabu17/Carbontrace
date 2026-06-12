import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConsumptionStep } from './ConsumptionStep';
import { defaultFootprintInput } from '@/lib';
import type { ConsumptionInput } from '../validation';

describe('ConsumptionStep', () => {
  function renderConsumption(overrides: Partial<ConsumptionInput> = {}) {
    const onChange = vi.fn();
    const value = { ...defaultFootprintInput.consumption, ...overrides };
    render(<ConsumptionStep value={value} onChange={onChange} errors={{}} />);
    return { onChange };
  }

  it('renders shopping options and recycling checkbox and handles change', async () => {
    const user = userEvent.setup();
    const { onChange } = renderConsumption({ shopping: 'average', recycles: false });

    // Verify legends and labels
    expect(screen.getByText('How much do you buy?')).toBeInTheDocument();
    expect(screen.getByText('Recycling')).toBeInTheDocument();

    // Select Minimal shopping option
    await user.click(screen.getByLabelText(/Minimal/i));
    expect(onChange).toHaveBeenCalledWith({ shopping: 'minimal' });

    // Click recycling checkbox
    await user.click(screen.getByLabelText(/I recycle consistently/i));
    expect(onChange).toHaveBeenCalledWith({ recycles: true });
  });
});
