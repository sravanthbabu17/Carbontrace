import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegionStep } from './RegionStep';

describe('RegionStep', () => {
  it('renders all region options and calls onChange when selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    
    render(<RegionStep value="GLOBAL" onChange={onChange} errors={{}} />);

    // Check that legend exists
    expect(screen.getByText('Where do you live?')).toBeInTheDocument();

    // Check that radio options are rendered
    expect(screen.getByLabelText(/United States/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/United Kingdom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/European Union/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/India/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Global Average/i)).toBeInTheDocument();

    // Select United States option
    await user.click(screen.getByLabelText(/United States/i));
    
    expect(onChange).toHaveBeenCalledWith('US');
  });

  it('renders error messages when provided', () => {
    render(<RegionStep value="GLOBAL" onChange={vi.fn()} errors={{ region: 'Region selection is required' }} />);
    expect(screen.getByText('Region selection is required')).toBeInTheDocument();
  });
});
