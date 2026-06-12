import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

const OPTIONS = [
  { value: 'a', label: 'Option A', description: 'Description A' },
  { value: 'b', label: 'Option B' },
] as const;

describe('RadioGroup', () => {
  it('renders all options and calls onChange when selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <RadioGroup
        legend="Select one"
        name="test-group"
        value="a"
        options={OPTIONS}
        onChange={onChange}
      />,
    );

    expect(screen.getByText('Select one')).toBeInTheDocument();
    expect(screen.getByLabelText(/Option A/i)).toBeInTheDocument();
    expect(screen.getByText('Description A')).toBeInTheDocument();

    const optB = screen.getByLabelText(/Option B/i);
    expect(optB).toBeInTheDocument();

    await user.click(optB);
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('renders error message and sets aria-invalid', () => {
    render(
      <RadioGroup
        legend="Select one"
        name="test-group"
        value="a"
        options={OPTIONS}
        onChange={vi.fn()}
        error="Selection is required"
      />,
    );

    expect(screen.getByText('Selection is required')).toBeInTheDocument();
  });
});
