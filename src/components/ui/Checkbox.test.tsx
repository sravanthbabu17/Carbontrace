import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders label and description, and handles change events', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Checkbox
        label="Test Checkbox"
        description="This is a description"
        checked={false}
        onChange={onChange}
      />,
    );

    expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { name: /test checkbox/i });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders in checked state', () => {
    render(<Checkbox label="Checked Box" checked={true} onChange={vi.fn()} />);
    const checkbox = screen.getByRole('checkbox', { name: /checked box/i });
    expect(checkbox).toBeChecked();
  });
});
