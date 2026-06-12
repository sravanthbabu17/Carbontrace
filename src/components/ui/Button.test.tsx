import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonLink } from './Button';

describe('Button & ButtonLink', () => {
  it('renders Button with correct classes and behaves as a button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain('bg-primary');

    await user.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies variant and size classes for Button', () => {
    const { rerender } = render(
      <Button variant="accent" size="lg">
        Accent Large
      </Button>,
    );
    let btn = screen.getByRole('button', { name: /accent large/i });
    expect(btn.className).toContain('bg-accent');
    expect(btn.className).toContain('min-h-[52px]');

    rerender(
      <Button variant="ghost" size="md">
        Ghost Medium
      </Button>,
    );
    btn = screen.getByRole('button', { name: /ghost medium/i });
    expect(btn.className).toContain('bg-transparent');
    expect(btn.className).toContain('min-h-[44px]');
  });

  it('renders ButtonLink with link attributes', () => {
    render(<ButtonLink href="/test-path">Link Button</ButtonLink>);
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test-path');
  });
});
