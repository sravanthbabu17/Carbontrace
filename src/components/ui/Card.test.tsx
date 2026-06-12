import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children with default div tag', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText('Card Content');
    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe('DIV');
    expect(card.className).toContain('glass-card');
  });

  it('renders custom element tag when passed via as', () => {
    render(<Card as="section">Section Content</Card>);
    const card = screen.getByText('Section Content');
    expect(card.tagName).toBe('SECTION');
  });
});
