import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { toFieldErrors, validateStep } from './validation';

describe('validation helpers', () => {
  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.number().min(18, 'Must be at least 18'),
  });

  it('toFieldErrors maps ZodError issues correctly', () => {
    const res = schema.safeParse({ name: '', age: 10 });
    expect(res.success).toBe(false);
    if (!res.success) {
      const errs = toFieldErrors(res.error);
      expect(errs.name).toBe('Name is required');
      expect(errs.age).toBe('Must be at least 18');
    }
  });

  it('validateStep returns success state when validation passes', () => {
    const res = validateStep(schema, { name: 'Alice', age: 25 });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data).toEqual({ name: 'Alice', age: 25 });
    }
  });

  it('validateStep returns field errors when validation fails', () => {
    const res = validateStep(schema, { name: '', age: 10 });
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.errors.name).toBe('Name is required');
      expect(res.errors.age).toBe('Must be at least 18');
    }
  });
});
