# @egyptian-numerals/raster

Render any number as [Egyptian hieroglyphic numerals](https://en.wikipedia.org/wiki/Egyptian_numerals) in PNG, JPEG or WebP, using [sharp](https://sharp.pixelplumbing.com/).

```sh
npm install @egyptian-numerals/raster
```

```js
import { toImage } from '@egyptian-numerals/raster';
import { writeFile } from 'node:fs/promises';

await writeFile('1993.png', await toImage(1993));
await writeFile('pi.webp', await toImage('3.14159', { format: 'webp', size: 400 }));
```

`toImage` takes every option of `toSvg` from [`@egyptian-numerals/core`](https://www.npmjs.com/package/@egyptian-numerals/core), plus `format` (`png`, `jpeg`, `jpg` or `webp`; default `png`) and `quality` (1–100). Colours default to black, and JPEG gets a white background unless you pass one.

See the [docs](https://karlnorling.github.io/egyptian-numerals/packages/raster/).

## License

MIT
