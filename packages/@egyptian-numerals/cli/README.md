# @egyptian-numerals/cli

Draw any number as [Egyptian hieroglyphic numerals](https://en.wikipedia.org/wiki/Egyptian_numerals) from the command line: SVG, PNG, JPEG or WebP.

```sh
npx @egyptian-numerals/cli 1993 > 1993.svg
npx @egyptian-numerals/cli 12.75 -o fraction.webp --size 200
npx @egyptian-numerals/cli -42 -o minus.png
```

Installed globally with `npm install -g @egyptian-numerals/cli`, the command is `egyptian`.

```
Usage: egyptian <number> [options]

Draws a number as Egyptian hieroglyphic numerals. Prints SVG to stdout unless --output is given.

Options:
  -o, --output <file>      Write to a .svg, .png, .jpg, .jpeg or .webp file
  -s, --size <px>          Image height in pixels (default 100)
  -c, --color <color>      Colour or CSS gradient (default currentColor for SVG,
                           black for images)
  -b, --background <color> Background colour or CSS gradient (default transparent,
                           white for JPEG)
  -g, --gap <n>            Space between groups in viewBox units (default 16)
  -q, --quality <1-100>    JPEG and WebP quality
  -h, --help               Show this help
  -v, --version            Show the version

Examples:
  egyptian 1993 > 1993.svg
  egyptian 12.75 -o fraction.webp --size 200
  egyptian -42 -o minus.png
  egyptian 1234567 -o all.png -c 'linear-gradient(to right, red, blue)'
```

## License

MIT
