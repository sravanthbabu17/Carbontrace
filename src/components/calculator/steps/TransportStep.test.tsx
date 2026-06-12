import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TransportStep } from './TransportStep';
import { defaultFootprintInput } from '@/lib';
import type { TransportInput } from '../validation';

describe('TransportStep', () => {
  function renderTransport(overrides: Partial<TransportInput> = {}) {
    const onChange = vi.fn();
    const value = { ...defaultFootprintInput.transport, ...overrides };
    render(<TransportStep value={value} onChange={onChange} errors={{}} />);
    return { onChange };
  }

  it('renders all transport inputs and handles fuel type selection', async () => {
    const user = userEvent.setup();
    const { onChange } = renderTransport({ carFuel: 'petrol' });

    // Verify labels are rendered
    expect(screen.getByLabelText(/What do you drive/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Distance driven/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Public transport/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Short-haul flights/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Long-haul flights/i)).toBeInTheDocument();

    // Select diesel instead of petrol
    await user.selectOptions(screen.getByLabelText(/What do you drive/i), 'diesel');
    expect(onChange).toHaveBeenCalledWith({ carFuel: 'diesel' });
  });

  it('handles distance input changes', async () => {
    const user = userEvent.setup();
    // Start with 0 so typing "5" calls onChange with 5
    const { onChange } = renderTransport({ carKmPerWeek: 0 });

    const carInput = screen.getByLabelText(/Distance driven/i);
    await user.type(carInput, '5');
    expect(onChange).toHaveBeenCalledWith({ carKmPerWeek: 5 });
  });
});
