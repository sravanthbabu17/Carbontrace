import { describe, it, expect } from 'vitest';
import { categoryBreakdown } from './breakdown';
import type { FootprintResult } from './schemas';

describe('categoryBreakdown', () => {
  it('should correctly calculate percentage shares and sort largest first', () => {
    const mockResult: FootprintResult = {
      totalKg: 10000,
      totalTonnes: 10,
      categories: {
        transport: 5000,
        home: 3000,
        food: 1500,
        consumption: 500,
      },
      details: {
        car: 3000,
        transit: 1000,
        flights: 1000,
        electricity: 1500,
        heating: 1500,
      },
    };

    const breakdown = categoryBreakdown(mockResult);

    expect(breakdown).toHaveLength(4);
    expect(breakdown[0]).toEqual({ key: 'transport', kg: 5000, percent: 50 });
    expect(breakdown[1]).toEqual({ key: 'home', kg: 3000, percent: 30 });
    expect(breakdown[2]).toEqual({ key: 'food', kg: 1500, percent: 15 });
    expect(breakdown[3]).toEqual({ key: 'consumption', kg: 500, percent: 5 });
  });

  it('should handle zero total footprint safely without division by zero errors', () => {
    const mockResult: FootprintResult = {
      totalKg: 0,
      totalTonnes: 0,
      categories: {
        transport: 0,
        home: 0,
        food: 0,
        consumption: 0,
      },
      details: {
        car: 0,
        transit: 0,
        flights: 0,
        electricity: 0,
        heating: 0,
      },
    };

    const breakdown = categoryBreakdown(mockResult);

    expect(breakdown).toHaveLength(4);
    for (const item of breakdown) {
      expect(item.percent).toBe(0);
      expect(item.kg).toBe(0);
    }
  });
});
