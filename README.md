# gen-srcset

Generate \<picture /> srcset with AVIF support.

## Cli arguments

- **-i --input:** input file
- **-o --output:** output path (optional, defaults to current path)
- **-b --breakpoints:** image widths that gen-srcset should generate
- **-h --help:** displays this section

## Example usage

```bash
yarn gen-srcset --input=images/cat-image.jpg --breakpoints="480, 720, 1080"
```

This will generate these files:

- cat-image_480.jpg
- cat-image_720.jpg
- cat-image_1080.jpg
- cat-image_480.avif
- cat-image_720.avif
- cat-image_1080.avif

and you can use these files like this:

```html
<picture>
  <source srcset="cat-image-480.avif 480w" type="image/avif" />
  <source srcset="cat-image-720.avif 720w" type="image/avif" />
  <source srcset="cat-image-1080.avif 1080w" type="image/avif" />

  <source srcset="cat-image-480.jpg 480w" type="image/jpg" />
  <source srcset="cat-image-720.jpg 720w" type="image/jpg" />
  <source srcset="cat-image-1080.jpg 1080w" type="image/jpg" />

  <img src="cat-image-480.jpg" alt="cat" />
</picture>
```

## LICENSE

MIT License

Copyright (c) 2021 ilyas akın

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
