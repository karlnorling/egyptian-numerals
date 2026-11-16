import { describe, expect, it } from 'vitest';
import { egyptianFractions } from '../src/index.js';

const write = (digits: string) =>
  egyptianFractions(digits).map(({ numerator, denominator }) => `${numerator}/${denominator}`);

describe('egyptianFractions', () => {
  it.each([
    ['', []],
    ['000', []],
    ['5', ['1/2']],
    ['25', ['1/4']],
    ['1', ['1/10']],
    ['75', ['1/2', '1/4']],
    ['68', ['2/3', '1/75']],
    ['9', ['1/2', '1/3', '1/15']],
    ['3', ['1/5', '1/10']],
    ['01', ['1/100']],
  ])('writes 0.%s as %j', (digits, expected) => {
    expect(write(digits)).toEqual(expected);
  });

  it('adds back up to the fraction', () => {
    for (const digits of ['123', '125', '875', '999', '0625', '4', '35', '14159']) {
      const sum = egyptianFractions(digits).reduce(
        (s, { numerator, denominator }) => s + numerator / denominator,
        0,
      );
      expect(sum).toBeCloseTo(Number(`0.${digits}`), 12);
    }
  });

  it('splits awkward decimals over divisors of a power of ten', () => {
    expect(write('999')).toEqual(['1/2', '1/4', '1/5', '1/25', '1/125', '1/1000']);
    expect(write('14159')).toEqual(['1/8', '1/80', '1/250', '1/12500', '1/100000']);
  });

  it('uses different denominators', () => {
    for (const digits of ['999', '123', '14159', '9']) {
      const ds = egyptianFractions(digits).map((t) => t.denominator);
      expect(new Set(ds).size).toBe(ds.length);
    }
  });

  it('refuses fractions that need too many or too small parts', () => {
    expect(() => egyptianFractions('1234567891')).toThrow('Round it first');
  });
});
