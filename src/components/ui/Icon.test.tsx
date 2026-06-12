import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders decorative icon with aria-hidden', () => {
    const { container } = render(<Icon name="leaf" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders meaningful icon with title when provided', () => {
    const { container } = render(<Icon name="leaf" title="Leaf Icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute('aria-hidden');
    expect(screen.getByTitle('Leaf Icon')).toBeInTheDocument();
  });
});
