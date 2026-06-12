import { describe, it, expect } from 'vitest';
import { goalProgress } from './goal';
import type { Goal } from './schemas';

describe('goalProgress', () => {
  it('should calculate correct progress for standard reduction scenario', () => {
    const goal: Goal = {
      baselineTonnes: 10.0,
      targetTonnes: 6.0,
      createdAt: '2026-06-12T20:30:00Z',
    };

    const progress = goalProgress(goal, 8.0);

    expect(progress.neededTonnes).toBe(4.0);
    expect(progress.reducedTonnes).toBe(2.0);
    expect(progress.progressPercent).toBe(50);
    expect(progress.remainingTonnes).toBe(2.0);
    expect(progress.achieved).toBe(false);
  });

  it('should mark goal as achieved and handle bounds when current is at or below target', () => {
    const goal: Goal = {
      baselineTonnes: 10.0,
      targetTonnes: 6.0,
      createdAt: '2026-06-12T20:30:00Z',
    };

    // Exactly at target
    const progressExact = goalProgress(goal, 6.0);
    expect(progressExact.progressPercent).toBe(100);
    expect(progressExact.remainingTonnes).toBe(0);
    expect(progressExact.achieved).toBe(true);

    // Below target
    const progressBelow = goalProgress(goal, 4.0);
    expect(progressBelow.progressPercent).toBe(100);
    expect(progressBelow.remainingTonnes).toBe(0);
    expect(progressBelow.achieved).toBe(true);
  });

  it('should handle zero or negative needed reductions gracefully', () => {
    const invalidGoal: Goal = {
      baselineTonnes: 5.0,
      targetTonnes: 6.0, // baseline < target
      createdAt: '2026-06-12T20:30:00Z',
    };

    const progress = goalProgress(invalidGoal, 5.5);
    expect(progress.neededTonnes).toBe(0);
    expect(progress.progressPercent).toBe(100);
    expect(progress.achieved).toBe(true);
  });

  it('should clamp progress percent between 0 and 100', () => {
    const goal: Goal = {
      baselineTonnes: 10.0,
      targetTonnes: 5.0,
      createdAt: '2026-06-12T20:30:00Z',
    };

    // Worse than baseline
    const progressWorse = goalProgress(goal, 12.0);
    expect(progressWorse.progressPercent).toBe(0);
    expect(progressWorse.reducedTonnes).toBe(0);
  });
});
