import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders a progressbar role with correct aria attributes and width', () => {
    const { container } = render(
      <ProgressBar value={40} min={0} max={100} label="Progress Indicator" valueText="40%" />,
    );

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-label', 'Progress Indicator');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-valuenow', '40');
    expect(progressbar).toHaveAttribute('aria-valuetext', '40%');

    const fill = container.querySelector('.transition-\\[width\\]');
    expect(fill).toHaveStyle({ width: '40%' });
  });

  it('clamps value within range', () => {
    render(<ProgressBar value={120} min={0} max={100} label="Clamped progress" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
  });
});
