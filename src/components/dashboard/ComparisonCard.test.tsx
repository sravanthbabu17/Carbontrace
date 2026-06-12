import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComparisonCard } from './ComparisonCard';

describe('ComparisonCard', () => {
  it('renders all title, headline, detail, and status badge correctly', () => {
    render(
      <ComparisonCard
        title="Science-based Target"
        status="below"
        headline="1.8 tonnes"
        detail="You are 10% below the target limit."
      />,
    );

    expect(screen.getByRole('heading', { name: /science-based target/i })).toBeInTheDocument();
    expect(screen.getByText('1.8 tonnes')).toBeInTheDocument();
    expect(screen.getByText('You are 10% below the target limit.')).toBeInTheDocument();
    expect(screen.getByText('On track')).toBeInTheDocument();
  });

  it('renders different statuses with correct badges', () => {
    const { rerender } = render(
      <ComparisonCard
        title="Science-based Target"
        status="above"
        headline="5 tonnes"
        detail="Over target limit."
      />,
    );
    expect(screen.getByText('Over')).toBeInTheDocument();

    rerender(
      <ComparisonCard
        title="Science-based Target"
        status="near"
        headline="2 tonnes"
        detail="Close to target limit."
      />,
    );
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
