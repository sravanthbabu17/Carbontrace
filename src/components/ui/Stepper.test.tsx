import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

const STEPS = ['Step A', 'Step B', 'Step C'];

describe('Stepper', () => {
  it('renders progress labels and sets active step correctly', () => {
    render(<Stepper steps={STEPS} current={1} />);

    // Screen reader summary
    expect(screen.getByText('Step 2 of 3: Step B')).toBeInTheDocument();

    // Check rendering of steps
    expect(screen.getByText('Step A')).toBeInTheDocument();
    expect(screen.getByText('Step B')).toBeInTheDocument();
    expect(screen.getByText('Step C')).toBeInTheDocument();

    // The active step should have aria-current="step" on the container circle span
    const activeCircle = screen.getByText('2');
    expect(activeCircle.parentElement).toHaveAttribute('aria-current', 'step');
  });
});
