import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardView } from './DashboardView';

vi.mock('@/components/charts/lazy', () => ({
  CategoryBarChart: () => <div data-testid="bar-chart" />,
  CategoryDonutChart: () => <div data-testid="donut-chart" />,
  HistoryTrendChart: () => <div data-testid="trend-chart" />,
}));

describe('DashboardView', () => {
  const mockInput = {
    region: 'US',
    transport: { carKm: 1000, flightHours: 5 },
    home: { electricityKwh: 200, gasKwh: 100, renewablePct: 50 },
    food: { diet: 'omnivore', meatDays: 3, localPct: 20 },
    consumption: { shoppingSpend: 100, recyclePct: 50 },
  };

  it('renders all sections: stats overview, charts, simulator, and tracker', () => {
    render(<DashboardView input={mockInput as any} history={[]} />);

    // Assert that the headline metric cards exist
    expect(screen.getByText('Annual footprint')).toBeInTheDocument();
    expect(screen.getByText('Vs. 1.5°C target')).toBeInTheDocument();

    // Assert headings of sections
    expect(screen.getByText('Where it comes from')).toBeInTheDocument();
    expect(screen.getByText('Simulate behavior changes')).toBeInTheDocument();
    expect(screen.getByText('Track a goal')).toBeInTheDocument();
    expect(screen.getByText('Your highest-impact actions')).toBeInTheDocument();
  });
});
