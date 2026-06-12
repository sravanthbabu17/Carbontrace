import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ActionSimulator } from './ActionSimulator';
import { defaultFootprintInput } from '@/lib';

describe('ActionSimulator', () => {
  it('renders simulator headings, widgets, and controls correctly', () => {
    // Modify default input slightly to ensure car and electricity are active so we get sliders.
    const input = {
      ...defaultFootprintInput,
      transport: {
        ...defaultFootprintInput.transport,
        carKmPerWeek: 150,
        flightsShortHaulPerYear: 2,
      },
      home: {
        ...defaultFootprintInput.home,
        electricityKwhPerMonth: 300,
        renewablePercent: 20,
      },
    };

    render(<ActionSimulator input={input} />);

    // Check header
    expect(screen.getByText('Action Simulator')).toBeInTheDocument();

    // Check baseline, simulated, saved readouts
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('Simulated')).toBeInTheDocument();
    expect(screen.getByText('Total Saved')).toBeInTheDocument();

    // Check controls headers
    expect(screen.getByText(/Transport reductions/i)).toBeInTheDocument();
    expect(screen.getByText(/Home energy upgrades/i)).toBeInTheDocument();

    // Check sliders exist
    expect(screen.getByLabelText(/Reduce car driving/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Avoid short-haul flights/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Increase renewable electricity/i)).toBeInTheDocument();
  });
});
