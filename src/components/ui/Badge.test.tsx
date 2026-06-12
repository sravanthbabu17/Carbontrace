import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children and applies neutral styling by default', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain('bg-ink/5');
  });

  it('applies correct class names for different tones', () => {
    const { rerender } = render(<Badge tone="primary">Primary</Badge>);
    expect(screen.getByText('Primary').className).toContain('bg-primary/10');

    rerender(<Badge tone="accent">Accent</Badge>);
    expect(screen.getByText('Accent').className).toContain('bg-accent/10');

    rerender(<Badge tone="warning">Warning</Badge>);
    expect(screen.getByText('Warning').className).toContain('bg-warning/20');

    rerender(<Badge tone="danger">Danger</Badge>);
    expect(screen.getByText('Danger').className).toContain('bg-red-100');
  });

  it('supports custom class names', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    expect(screen.getByText('Custom').className).toContain('custom-class');
  });
});
