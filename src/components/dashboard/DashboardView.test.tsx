import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardView } from './DashboardView';
import type { FootprintInput } from '@/lib';

vi.mock('@/components/charts/lazy', () => ({
  CategoryBarChart: () => <div data-testid="bar-chart" />,
  CategoryDonutChart: () => <div data-testid="donut-chart" />,
  HistoryTrendChart: () => <div data-testid="trend-chart" />,
}));

describe('DashboardView', () => {
  const mockInput: FootprintInput = {
    region: 'US',
    transport: { carKmPerWeek: 100, carFuel: 'petrol', flightsLongHaulPerYear: 2 },
    home: { electricityKwhPerMonth: 200, heatingFuel: 'gas', heatingAmountPerMonth: 50 },
    food: { diet: 'omnivore', foodWaste: 'low' },
    consumption: { shopping: 'average', recycles: true },
  };

  it('renders all sections: stats overview, charts, simulator, and tracker', () => {
    render(<DashboardView input={mockInput} history={[]} />);

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
