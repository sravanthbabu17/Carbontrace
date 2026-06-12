import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewStep } from './ReviewStep';
import { defaultFootprintInput } from '@/lib';

describe('ReviewStep', () => {
  it('renders summary layout and calculated footprint total', () => {
    render(<ReviewStep input={defaultFootprintInput} />);

    // Verify sections exist
    expect(screen.getByText('Estimated annual footprint')).toBeInTheDocument();
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Shopping & goods')).toBeInTheDocument();
  });
});
