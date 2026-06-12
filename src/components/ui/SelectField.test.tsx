import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectField } from './SelectField';

const OPTIONS = [
  { value: 'x', label: 'X Label' },
  { value: 'y', label: 'Y Label' },
] as const;

describe('SelectField', () => {
  it('renders select with options and handles selection change', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SelectField label="Choose" value="x" options={OPTIONS} onChange={onChange} />);

    const select = screen.getByLabelText('Choose');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('x');

    await user.selectOptions(select, 'y');
    expect(onChange).toHaveBeenCalledWith('y');
  });
});
