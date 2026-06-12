import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoodStep } from './FoodStep';
import { defaultFootprintInput } from '@/lib';
import type { FoodInput } from '../validation';

describe('FoodStep', () => {
  function renderFood(overrides: Partial<FoodInput> = {}) {
    const onChange = vi.fn();
    const value = { ...defaultFootprintInput.food, ...overrides };
    render(<FoodStep value={value} onChange={onChange} errors={{}} />);
    return { onChange };
  }

  it('renders diet and food waste choices and calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const { onChange } = renderFood({ diet: 'medium_meat', foodWaste: 'medium' });

    // Verify legends are present
    expect(screen.getByText('Which best describes your diet?')).toBeInTheDocument();
    expect(screen.getByText('How much food do you waste?')).toBeInTheDocument();

    // Select Vegetarian option
    await user.click(screen.getByLabelText(/^Vegetarian$/i));
    expect(onChange).toHaveBeenCalledWith({ diet: 'vegetarian' });

    // Select Low food waste option
    await user.click(screen.getByLabelText(/Low — I rarely waste food/i));
    expect(onChange).toHaveBeenCalledWith({ foodWaste: 'low' });
  });
});
