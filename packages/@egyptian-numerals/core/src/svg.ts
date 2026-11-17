import { type EgyptianFraction } from './fractions.js';
import { format, parse } from './number.js';
import { escapeAttr as escape, num, resolvePaint, type Paint } from './paint.js';
import type { NumberInput } from './parse.js';
import { placePath } from './path.js';
import { LINE, MOUTH, NFR, POWER_SIGNS, TWO_THIRDS, type Sign } from './signs.js';

export interface SvgOptions {
  /** Height of the image in pixels. The width follows from the number of signs. Default 100. */
  size?: number;
  /**
   * Colour of the signs. Default `currentColor`, so the SVG takes the surrounding text colour.
   * Also takes a CSS gradient such as `linear-gradient(to right, gold, crimson)`, or a
   * gradient object.
   */
  color?: Paint;
  /** Fills the image behind the signs: a colour or a gradient. Default: transparent. */
  background?: Paint;
  /** Space between groups of signs in viewBox units, where a sign is 60 tall. Default 16. */
  gap?: number;
  /** Space around the numeral in viewBox units. Default 20. */
  padding?: number;
  /**
   * Accessible name, rendered as `<title>`. Defaults to the number written in decimal.
   * Pass `false` to leave it out and hide the image from assistive technology.
   */
  title?: string | false;
}

/** The height every group of signs is fitted into, in viewBox units. */
export const HEIGHT = 60;
/** Rows a group of repeated signs is stacked in, top row first. */
const ROWS: Record<number, number[]> = {
  1: [1],
  2: [2],
  3: [3],
  4: [4],
  5: [3, 2],
  6: [3, 3],
  7: [4, 3],
  8: [4, 4],
  9: [3, 3, 3],
};
const ROW_GAP = 5;
const SIGN_GAP = 3;

/** One sign, placed: its top-left corner and scale. */
interface Placed {
  sign: Sign;
  x: number;
  y: number;
  scale: number;
}

interface Group {
  width: number;
  signs: Placed[];
}

/** `count` copies of a sign, stacked in rows and fitted into `height`, starting at (x, y). */
function repeat(sign: Sign, count: number, x: number, y: number, height: number): Group {
  const rows = ROWS[count]!;
  const rowHeight = (height - (rows.length - 1) * ROW_GAP) / rows.length;
  const scale = Math.min(rowHeight / sign.height, 1);
  const w = sign.width * scale;
  const rowWidth = (n: number) => n * w + (n - 1) * SIGN_GAP;
  const width = Math.max(...rows.map(rowWidth));
  const signs: Placed[] = [];
  rows.forEach((n, row) => {
    const top = y + row * (rowHeight + ROW_GAP) + (rowHeight - sign.height * scale);
    const left = x + (width - rowWidth(n)) / 2;
    for (let i = 0; i < n; i++) signs.push({ sign, x: left + i * (w + SIGN_GAP), y: top, scale });
  });
  return { width, signs };
}

/** The groups for a whole number, largest power first, starting at x. */
function wholeGroups(
  digits: readonly number[],
  x: number,
  y: number,
  height: number,
  gap: number,
): Group {
  const signs: Placed[] = [];
  let cursor = x;
  digits.forEach((digit, i) => {
    if (digit === 0) return;
    if (signs.length > 0) cursor += gap;
    const group = repeat(POWER_SIGNS[digits.length - 1 - i]!, digit, cursor, y, height);
    signs.push(...group.signs);
    cursor += group.width;
  });
  return { width: cursor - x, signs };
}

/** A fraction: 2/3 has its own sign, and 1/n puts the mouth sign over n. */
function fractionGroup(term: EgyptianFraction, x: number, gap: number): Group {
  if (term.numerator === 2) return repeat(TWO_THIRDS, 1, x, 0, HEIGHT);
  const mouthHeight = MOUTH.height;
  const below = wholeGroups(
    String(term.denominator).split('').map(Number),
    x,
    mouthHeight + 4,
    HEIGHT - mouthHeight - 4,
    gap * 0.6,
  );
  // On a long denominator the mouth sits over its start, as scribes wrote 1/100 and up.
  const mouthWidth = Math.min(Math.max(below.width, 24), MOUTH.width);
  const scale = mouthWidth / MOUTH.width;
  const width = Math.max(below.width, mouthWidth);
  return {
    width,
    signs: [{ sign: MOUTH, x, y: (mouthHeight - MOUTH.height * scale) / 2, scale }, ...below.signs],
  };
}

const MINUS = { width: 26, gap: 12 };

/**
 * Renders a number as an SVG string of Egyptian hieroglyphic numerals.
 *
 * Each power of ten has its own sign, repeated as often as the digit says, largest first:
 * strokes, hobbles, coils of rope, lotuses, fingers, tadpoles and the god Heh. Fractions
 * are written as an Egyptian scribe would: 2/3, then unit fractions with the mouth sign
 * over the denominator. Zero is the sign nfr. Negative numbers start with a bar.
 */
export function toSvg(value: NumberInput, options: SvgOptions = {}): string {
  const number = parse(value);
  const { gap = 16 } = options;
  const signs: Placed[] = [];
  let x = number.negative ? MINUS.width + MINUS.gap : 0;

  const whole = wholeGroups(number.integer, x, 0, HEIGHT, gap);
  signs.push(...whole.signs);
  x += whole.width;
  if (whole.signs.length === 0 && number.fractions.length === 0) {
    const zero = repeat(NFR, 1, x, 0, HEIGHT);
    signs.push(...zero.signs);
    x += zero.width;
  }
  for (const term of number.fractions) {
    if (signs.length > 0) x += gap;
    const group = fractionGroup(term, x, gap);
    signs.push(...group.signs);
    x += group.width;
  }
  return render(signs, x, number.negative, options, format(number));
}

/**
 * One digit's worth of signs on its own: `digit` copies of the sign for 10^`place`, from
 * strokes (place 0) to Heh (place 6). Zero is nfr.
 */
export function digitSvg(digit: number, place = 0, options: SvgOptions = {}): string {
  if (!Number.isInteger(digit) || digit < 0 || digit > 9) {
    throw new RangeError(`A digit runs from 0 to 9, got ${digit}`);
  }
  const sign = POWER_SIGNS[place];
  if (!sign) throw new RangeError(`Hieroglyphs have signs for places 0 to 6, got ${place}`);
  const group = repeat(digit === 0 ? NFR : sign, Math.max(digit, 1), 0, 0, HEIGHT);
  return render(group.signs, group.width, false, options, String(digit * 10 ** place));
}

/** One fraction on its own: 2/3, or the mouth sign over the denominator. */
export function fractionSvg(term: EgyptianFraction, options: SvgOptions = {}): string {
  const group = fractionGroup(term, 0, options.gap ?? 16);
  return render(group.signs, group.width, false, options, `${term.numerator}/${term.denominator}`);
}

function render(
  signs: Placed[],
  width: number,
  negative: boolean,
  options: SvgOptions,
  defaultTitle: string,
): string {
  const { size = 100, color = 'currentColor', background, padding = 20 } = options;
  if (!(size > 0)) throw new RangeError(`size must be positive, got ${size}`);
  const title = options.title ?? defaultTitle;

  const box = {
    x: -padding,
    y: -padding,
    width: width + 2 * padding,
    height: HEIGHT + 2 * padding,
  };
  const paint = resolvePaint(color, box, 'hieroglyph-color');
  const fill =
    background === undefined ? undefined : resolvePaint(background, box, 'hieroglyph-background');
  const defs = [...new Set([fill?.def, paint.def].filter(Boolean))].join('');
  const p = escape(paint.value);

  const filled: string[] = [];
  const lines: string[] = [];
  if (negative) filled.push(`M0 ${HEIGHT / 2 - 3}H${MINUS.width}V${HEIGHT / 2 + 3}H0Z`);
  for (const { sign, x, y, scale } of signs) {
    for (const d of sign.fill) filled.push(placePath(d, x, y, scale));
    for (const d of sign.line) {
      lines.push(
        `<path d="${placePath(d, x, y, scale)}" stroke-width="${num(LINE * Math.max(scale, 0.6))}"/>`,
      );
    }
  }

  const pixelWidth = (size * box.width) / box.height;
  const label = title === false ? 'aria-hidden="true"' : `role="img" aria-label="${escape(title)}"`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${[box.x, box.y, box.width, box.height].map(num).join(' ')}" width="${num(pixelWidth)}" height="${num(size)}" ${label}>`,
    title === false ? '' : `<title>${escape(title)}</title>`,
    defs ? `<defs>${defs}</defs>` : '',
    fill === undefined
      ? ''
      : `<rect x="${num(box.x)}" y="${num(box.y)}" width="${num(box.width)}" height="${num(box.height)}" fill="${escape(fill.value)}"/>`,
    filled.length ? `<path d="${filled.join('')}" fill="${p}"/>` : '',
    lines.length
      ? `<g fill="none" stroke="${p}" stroke-linecap="round" stroke-linejoin="round">${lines.join('')}</g>`
      : '',
    '</svg>',
  ].join('');
}

export type { EgyptianFraction };
