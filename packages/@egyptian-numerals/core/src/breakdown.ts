import { parse } from './number.js';
import type { NumberInput } from './parse.js';
import { digitSvg, fractionSvg, type SvgOptions } from './svg.js';

/** One part of a number for a breakdown: its signs, its value and what it counts. */
export interface Part {
  svg: string;
  label: string;
  place: string;
}

/** The parts a number is written with: one group per non-zero power of ten, then each fraction. */
export function breakdown(value: NumberInput, options: SvgOptions = {}): Part[] {
  const number = parse(value);
  const parts: Part[] = [];
  number.integer.forEach((digit, i) => {
    const power = number.integer.length - 1 - i;
    if (digit === 0) return;
    parts.push({
      svg: digitSvg(digit, power, options),
      label: String(digit * 10 ** power),
      place: power === 0 ? 'ones' : `${digit} × ${(10 ** power).toLocaleString('en')}`,
    });
  });
  for (const term of number.fractions) {
    parts.push({
      svg: fractionSvg(term, options),
      label: `${term.numerator}/${term.denominator}`,
      place: term.numerator === 2 ? 'two thirds' : 'unit fraction',
    });
  }
  if (parts.length === 0) parts.push({ svg: digitSvg(0, 0, options), label: '0', place: 'nfr' });
  return parts;
}
