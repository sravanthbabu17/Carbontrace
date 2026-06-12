import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Field } from './Field';

describe('Field', () => {
  it('associates label and hint with the control', () => {
    render(
      <Field label="Name" hint="Enter your name">
        {({ controlId, describedBy, invalid }) => (
          <input
            id={controlId}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
          />
        )}
      </Field>,
    );

    const input = screen.getByLabelText('Name');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Enter your name')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby');
    expect(input.getAttribute('aria-describedby')).toContain('hint');
  });

  it('handles error state and links description correctly', () => {
    render(
      <Field label="Name" error="Name is required">
        {({ controlId, describedBy, invalid }) => (
          <input
            id={controlId}
            aria-describedby={describedBy}
            aria-invalid={invalid || undefined}
          />
        )}
      </Field>,
    );

    const input = screen.getByLabelText(/Name/);
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain('error');
  });
});
