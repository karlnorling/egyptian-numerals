import { egyptianFractions, type EgyptianFraction } from './fractions.js';
import { formatInBase, parseInBase, type NumberInput } from './parse.js';

/** Egyptian numerals repeat one sign per power of ten, so digits are still decimal. */
export const BASE = 10;

/** Heh, the sign for a million, can be repeated nine times. */
export const MAX_INTEGER = 9_999_999;

export interface EgyptianNumber {
  negative: boolean;
  /** Decimal digits of the whole part, most significant first. Each becomes that many signs. */
  integer: number[];
  /** Decimal digits of the fraction, as typed. */
  fraction: number[];
  /** The fraction as an Egyptian scribe would write it: 2/3 and unit fractions. */
  fractions: EgyptianFraction[];
}

/**
 * Splits a number into the signs it is written with: decimal digits for the whole part,
 * and 2/3 or unit fractions for the rest. `12.75` is 12, 1/2 and 1/4.
 */
export function parse(value: NumberInput): EgyptianNumber {
  const { negative, integer, fraction } = parseInBase(value, BASE);
  if (integer.length > 7) {
    throw new RangeError(`Hieroglyphic numerals stop at ${MAX_INTEGER.toLocaleString('en')}`);
  }
  return { negative, integer, fraction, fractions: egyptianFractions(fraction.join('')) };
}

/** Writes a parsed number back as a canonical decimal string, e.g. `-12.75`. */
export function format({ negative, integer, fraction }: EgyptianNumber): string {
  return formatInBase({ negative, integer, fraction }, BASE);
}
