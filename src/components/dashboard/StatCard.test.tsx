import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders label, value, icon, and children correctly', () => {
    render(
      <StatCard label="Total Carbon" value="4.2 tonnes" icon="leaf">
        <p>supporting details</p>
      </StatCard>,
    );

    expect(screen.getByText('Total Carbon')).toBeInTheDocument();
    expect(screen.getByText('4.2 tonnes')).toBeInTheDocument();
    expect(screen.getByText('supporting details')).toBeInTheDocument();
  });
});
