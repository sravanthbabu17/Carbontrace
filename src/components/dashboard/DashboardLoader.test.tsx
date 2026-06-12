import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DashboardLoader } from './DashboardLoader';
import { loadInput, loadHistory, type FootprintInput } from '@/lib';

vi.mock('@/lib', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib')>();
  return {
    ...actual,
    loadInput: vi.fn(),
    loadHistory: vi.fn(),
  };
});

vi.mock('@/components/charts/lazy', () => ({
  CategoryBarChart: () => <div data-testid="bar-chart" />,
  CategoryDonutChart: () => <div data-testid="donut-chart" />,
  HistoryTrendChart: () => <div data-testid="trend-chart" />,
}));

describe('DashboardLoader', () => {
  it('renders empty state if no inputs exist in localStorage', async () => {
    vi.mocked(loadInput).mockReturnValue(null);

    render(<DashboardLoader />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /No results yet/i })).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /Start the calculator/i })).toBeInTheDocument();
  });

  it('renders DashboardView if inputs exist', async () => {
    const mockInput: FootprintInput = {
      region: 'US',
      transport: { carKmPerWeek: 100, carFuel: 'petrol', flightsLongHaulPerYear: 2 },
      home: { electricityKwhPerMonth: 200, heatingFuel: 'gas', heatingAmountPerMonth: 50 },
      food: { diet: 'omnivore', foodWaste: 'low' },
      consumption: { shopping: 'average', recycles: true },
    };
    vi.mocked(loadInput).mockReturnValue(mockInput);
    vi.mocked(loadHistory).mockReturnValue([]);

    render(<DashboardLoader />);

    await waitFor(() => {
      expect(screen.getByText('Annual footprint')).toBeInTheDocument();
    });
  });
});

