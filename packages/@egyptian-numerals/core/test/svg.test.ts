import { describe, expect, it } from 'vitest';
import { breakdown, digitSvg, fractionSvg, parse, placePathForTest, toSvg } from './helpers.js';

const attr = (svg: string, name: string) => new RegExp(` ${name}="([^"]*)"`).exec(svg)?.[1];

describe('parse', () => {
  it('keeps decimal digits and adds Egyptian fractions', () => {
    expect(parse('12.75')).toEqual({
      negative: false,
      integer: [1, 2],
      fraction: [7, 5],
      fractions: [
        { numerator: 1, denominator: 2 },
        { numerator: 1, denominator: 4 },
      ],
    });
  });

  it('stops at 9,999,999', () => {
    expect(parse(9_999_999).integer).toHaveLength(7);
    expect(() => parse(10_000_000)).toThrow('stop at 9,999,999');
  });
});

describe('toSvg', () => {
  it('renders 100px tall with the number as its title', () => {
    const svg = toSvg(1);
    expect(attr(svg, 'height')).toBe('100');
    expect(svg).toContain('<title>1</title>');
    expect(attr(svg, 'viewBox')).toBe('-20 -20 49 100');
  });

  it('repeats each power’s sign as often as its digit', () => {
    // 3 strokes: three filled shapes, no lines.
    expect((attr(toSvg(3), 'd') ?? '').split('M').length - 1).toBe(3);
    // 20: two hobbles, drawn as lines.
    expect(toSvg(20).match(/<path d="[^"]+" stroke-width/g)).toHaveLength(2);
  });

  it('skips empty powers instead of drawing a zero', () => {
    expect(toSvg(1001)).toEqual(expect.stringContaining('<title>1001</title>'));
    expect(toSvg(1001).match(/stroke-width/g)).toHaveLength(
      toSvg(1000).match(/stroke-width/g)!.length,
    );
  });

  it('draws zero on its own as nfr', () => {
    expect(toSvg(0)).toContain('<title>0</title>');
    expect(toSvg(0).match(/stroke-width/g)).toHaveLength(3);
  });

  it('writes fractions as 2/3 and unit fractions', () => {
    expect(toSvg('0.75')).toContain('<title>0.75</title>');
    expect(attr(toSvg('0.75'), 'viewBox')).not.toBe(attr(toSvg('0.5'), 'viewBox'));
  });

  it('starts a negative number with a bar', () => {
    expect(attr(toSvg(-1), 'd')).toMatch(/^M0 27H26V33H0Z/);
  });

  it('takes backgrounds and gradients', () => {
    const svg = toSvg(5, { color: 'linear-gradient(red, blue)', background: '#fff' });
    expect(svg).toMatch(/fill="url\(#hieroglyph-color-\w+\)"/);
    expect(svg).toContain('fill="#fff"');
  });

  it('rejects a bad size', () => {
    expect(() => toSvg(1, { size: 0 })).toThrow('size must be positive');
  });
});

describe('digitSvg and fractionSvg', () => {
  it('draws one power’s signs', () => {
    expect(digitSvg(4, 3)).toContain('<title>4000</title>');
    expect(() => digitSvg(1, 7)).toThrow('places 0 to 6');
  });

  it('draws a unit fraction with its title', () => {
    expect(fractionSvg({ numerator: 1, denominator: 100 })).toContain('<title>1/100</title>');
  });
});

describe('breakdown', () => {
  it('lists each power and fraction', () => {
    expect(breakdown('1203.68').map((p) => p.label)).toEqual(['1000', '200', '3', '2/3', '1/75']);
    expect(breakdown(0).map((p) => p.label)).toEqual(['0']);
  });
});

describe('placePath', () => {
  it('moves and scales absolute commands', () => {
    expect(placePathForTest('M0 0L10 10H20V5C1 2 3 4 5 6Z', 1, 2, 2)).toBe(
      'M1 2L21 22H41V12C3 6 7 10 11 14Z',
    );
    expect(placePathForTest('M1 1A2 2 0 1 1 3 3', 0, 0, 2)).toBe('M2 2A4 4 0 1 1 6 6');
  });
});
