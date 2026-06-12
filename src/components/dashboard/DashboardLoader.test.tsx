import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { DashboardLoader } from './DashboardLoader';
import { loadInput, loadHistory } from '@/lib';

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
    const mockInput = {
      region: 'US',
      transport: { carKm: 1000, flightHours: 5 },
      home: { electricityKwh: 200, gasKwh: 100, renewablePct: 50 },
      food: { diet: 'omnivore', meatDays: 3, localPct: 20 },
      consumption: { shoppingSpend: 100, recyclePct: 50 },
    };
    vi.mocked(loadInput).mockReturnValue(mockInput as any);
    vi.mocked(loadHistory).mockReturnValue([]);

    render(<DashboardLoader />);

    await waitFor(() => {
      expect(screen.getByText('Annual footprint')).toBeInTheDocument();
    });
  });
});
