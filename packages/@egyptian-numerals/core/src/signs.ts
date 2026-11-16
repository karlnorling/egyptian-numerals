/**
 * Simplified drawings of the hieroglyphs used for numbers, each in its own box with the
 * baseline at y = height. Parts are either filled shapes or lines drawn with a pen.
 */
export interface Sign {
  /** Gardiner's sign-list code, e.g. `V20`. */
  code: string;
  /** What the sign depicts. */
  name: string;
  width: number;
  height: number;
  /** Shapes filled with the colour. */
  fill: string[];
  /** Lines drawn with the colour, `LINE` units wide at full size. */
  line: string[];
}

/** Pen width of line parts at full size, in viewBox units. */
export const LINE = 5;

function spiral(cx: number, cy: number, turns: number, radius: number): string {
  const steps = Math.round(turns * 24);
  const points: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * 2 * Math.PI;
    const r = 2 + t * (radius - 2);
    points.push(
      `${(cx + r * Math.cos(angle)).toFixed(2)} ${(cy + r * Math.sin(angle)).toFixed(2)}`,
    );
  }
  return `M${points.join('L')}`;
}

/** The signs for 1, 10, 100 … 1,000,000, by power of ten. */
export const POWER_SIGNS: readonly Sign[] = [
  {
    code: 'Z15',
    name: 'stroke',
    width: 9,
    height: 60,
    fill: ['M1 3Q1 0 4.5 0Q8 0 8 3V57Q8 60 4.5 60Q1 60 1 57Z'],
    line: [],
  },
  {
    code: 'V20',
    name: 'cattle hobble',
    width: 34,
    height: 60,
    fill: [],
    line: ['M6 60V24C6 2 28 2 28 24V60'],
  },
  {
    code: 'V1',
    name: 'coil of rope',
    width: 40,
    height: 60,
    fill: [],
    line: [`${spiral(20, 40, 2.25, 16)}L20 3`],
  },
  {
    code: 'M12',
    name: 'lotus',
    width: 34,
    height: 60,
    fill: [
      'M15 2C8 8 9 16 15 20C21 16 22 8 15 2Z',
      'M15 21C10 21 4 17 2 9C7 12 11 15 15 21Z',
      'M15 21C20 21 26 17 28 9C23 12 19 15 15 21Z',
    ],
    line: ['M15 20V60', 'M15 46C20 40 28 40 32 46'],
  },
  {
    code: 'D50',
    name: 'finger',
    width: 30,
    height: 60,
    fill: [],
    line: ['M11 60V16C11 3 26 3 25 15L23 24', 'M11 34C15 32 19 32 22 34'],
  },
  {
    code: 'I8',
    name: 'tadpole',
    width: 36,
    height: 60,
    fill: ['M6 46C6 35 20 31 25 40C30 49 22 59 14 59C9 59 6 54 6 46Z'],
    line: ['M20 34C14 24 30 18 24 8C22 4 26 2 30 2'],
  },
  {
    code: 'C11',
    name: 'the god Heh',
    width: 50,
    height: 60,
    fill: ['M25 6.5A5.5 5.5 0 1 1 25 17.5A5.5 5.5 0 1 1 25 6.5Z'],
    line: [
      'M25 18L24 42',
      'M24 42L36 46L36 58',
      'M24 42L12 58H30',
      'M25 25C18 23 10 18 7 4',
      'M25 25C32 23 40 18 43 4',
      'M7 4C3 8 3 12 6 16',
      'M43 4C47 8 47 12 44 16',
    ],
  },
];

/** The mouth sign r, “part”, written over a number n to mean 1/n. */
export const MOUTH: Sign = {
  code: 'D21',
  name: 'mouth',
  width: 40,
  height: 12,
  fill: ['M0 6C10 -1 30 -1 40 6C30 13 10 13 0 6Z'],
  line: [],
};

/** Two thirds: the mouth with one long and one short stroke under it. */
export const TWO_THIRDS: Sign = {
  code: 'D22',
  name: 'two thirds',
  width: 40,
  height: 60,
  fill: [MOUTH.fill[0]!, 'M11 18H18V60H11Z', 'M24 18H31V44H24Z'],
  line: [],
};

/** nfr, “good, complete”: a heart and windpipe that marked a balance of nothing in accounts. */
export const NFR: Sign = {
  code: 'F35',
  name: 'nfr',
  width: 30,
  height: 60,
  fill: ['M15 34C25 34 26 44 24 50C22 56 18 60 15 60C12 60 8 56 6 50C4 44 5 34 15 34Z'],
  line: ['M15 34V2', 'M8 10H22', 'M8 18H22'],
};
