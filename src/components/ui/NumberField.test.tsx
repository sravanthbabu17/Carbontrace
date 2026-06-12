import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NumberField } from './NumberField';

describe('NumberField', () => {
  it('renders with label, unit, value, and triggers onChange', () => {
    const onChange = vi.fn();
    render(<NumberField label="Quantity" value={10} onChange={onChange} unit="units" />);

    const input = screen.getByLabelText('Quantity');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(10);
    expect(screen.getByText('units')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '15' } });
    expect(onChange).toHaveBeenCalledWith(15);
  });

  it('handles empty value by falling back to 0', () => {
    const onChange = vi.fn();
    render(<NumberField label="Quantity" value={10} onChange={onChange} />);

    const input = screen.getByLabelText('Quantity');
    fireEvent.change(input, { target: { value: '' } });
    expect(onChange).toHaveBeenCalledWith(0);
  });
});
