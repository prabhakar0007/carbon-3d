import { describe, it, expect } from 'vitest';
import { calculateFootprint, sanitizeValue } from '../utils/carbonFactors';

describe('carbonFactors', () => {
  it('calculates total footprint correctly', () => {
    const entries = [
      { type: 'car_km', value: 10 },
      { type: 'electricity_kwh', value: 5 }
    ];
    expect(calculateFootprint(entries)).toBe(10*0.171 + 5*0.85);
  });

  it('handles empty array', () => {
    expect(calculateFootprint([])).toBe(0);
  });

  it('sanitizes value', () => {
    expect(sanitizeValue('abc')).toBe(0);
    expect(sanitizeValue(-5)).toBe(0);
    expect(sanitizeValue(9999)).toBe(9999);
  });
});