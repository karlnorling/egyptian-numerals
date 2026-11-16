/** A fraction the Egyptians could write: a unit fraction 1/n, or the special 2/3. */
export interface EgyptianFraction {
  numerator: 1 | 2;
  denominator: number;
}

/** Hieroglyphs go up to Heh, the sign for a million, nine times over. */
export const MAX_DENOMINATOR = 9_999_999;
/** More parts than this stops being readable. */
export const MAX_PARTS = 10;

/**
 * Splits a fraction between 0 and 1, given as the decimal digits after the point, into
 * fractions an Egyptian scribe could write: 2/3 and different unit fractions 1/n, largest
 * first. `'75'` (0.75) is 1/2 + 1/4, and `'68'` is 2/3 + 1/75.
 *
 * Two methods are tried and the one with the fewest parts wins: the greedy method of
 * taking the largest unit fraction that fits, with and without 2/3, and splitting
 * p/10ᵏ into unit fractions whose denominators divide 10ᵏ. Throws if neither fits in
 * `MAX_PARTS` parts with denominators up to `MAX_DENOMINATOR`.
 */
export function egyptianFractions(digits: string): EgyptianFraction[] {
  if (digits === '' || /^0*$/.test(digits)) return [];
  const p = BigInt(digits);
  const q = 10n ** BigInt(digits.length);
  const candidates = [greedy(p, q, true), greedy(p, q, false), byDivisors(p, q)].filter(
    (terms): terms is EgyptianFraction[] => terms !== undefined,
  );
  if (candidates.length === 0) {
    throw new RangeError(
      `0.${digits} can't be split into at most ${MAX_PARTS} Egyptian fractions no smaller than 1/${MAX_DENOMINATOR.toLocaleString('en')}. Round it first.`,
    );
  }
  const largest = (terms: EgyptianFraction[]) => Math.max(...terms.map((t) => t.denominator));
  candidates.sort((a, b) => a.length - b.length || largest(a) - largest(b));
  return candidates[0]!;
}

/** Take 2/3 if it fits and is allowed, then the largest unit fraction that fits, until done. */
function greedy(p: bigint, q: bigint, twoThirds: boolean): EgyptianFraction[] | undefined {
  const terms: EgyptianFraction[] = [];
  if (twoThirds && 3n * p >= 2n * q) {
    terms.push({ numerator: 2, denominator: 3 });
    [p, q] = reduce(3n * p - 2n * q, 3n * q);
  }
  while (p > 0n) {
    const n = (q + p - 1n) / p;
    if (n > BigInt(MAX_DENOMINATOR) || terms.length === MAX_PARTS) return undefined;
    terms.push({ numerator: 1, denominator: Number(n) });
    // p/q - 1/n = (p·n - q) / (q·n)
    [p, q] = reduce(p * n - q, q * n);
  }
  return terms;
}

/**
 * Writes p/q, with q a power of ten, as a sum of q/d over different divisors d of q, each
 * of which is the unit fraction 1/(q/d). Divisors are tried largest first.
 */
function byDivisors(p: bigint, q: bigint): EgyptianFraction[] | undefined {
  const divisors: bigint[] = [];
  for (let two = 1n; q % two === 0n; two *= 2n) {
    for (let five = 1n; q % (two * five) === 0n; five *= 5n) divisors.push(two * five);
  }
  divisors.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
  const terms: EgyptianFraction[] = [];
  let rest = p;
  for (const d of divisors) {
    if (d > rest) continue;
    const n = q / d;
    if (n > BigInt(MAX_DENOMINATOR) || terms.length === MAX_PARTS) return undefined;
    terms.push({ numerator: 1, denominator: Number(n) });
    rest -= d;
    if (rest === 0n) return terms;
  }
  return undefined;
}

function reduce(p: bigint, q: bigint): [bigint, bigint] {
  let [a, b] = [p, q];
  while (b !== 0n) [a, b] = [b, a % b];
  return a > 1n ? [p / a, q / a] : [p, q];
}
