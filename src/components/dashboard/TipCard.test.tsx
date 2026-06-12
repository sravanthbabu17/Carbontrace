import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TipCard } from './TipCard';
import type { Tip } from '@/lib';

const MOCK_TIP: Tip = {
  id: 'tip-1',
  category: 'transport',
  title: 'Walk or bike for short trips',
  description: 'Walking or biking instead of driving saves emissions.',
  estimatedSavingKg: 350,
  effort: 'low',
};

describe('TipCard', () => {
  it('renders tip details, savings, and tags', () => {
    render(<TipCard tip={MOCK_TIP} rank={1} />);

    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('Walk or bike for short trips')).toBeInTheDocument();
    expect(
      screen.getByText('Walking or biking instead of driving saves emissions.'),
    ).toBeInTheDocument();
    expect(screen.getByText(/Saves ~350\s*kg/)).toBeInTheDocument();
    expect(screen.getByText(/low effort/i)).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
  });
});
