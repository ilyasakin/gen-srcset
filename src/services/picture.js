import { expose } from 'threads/worker';
import sharp from 'sharp';
import getInputExtension from '../helpers/getInputExtension';

expose({
  async toAvif(input, breakpoint, output, filenameBase) {
    await sharp(input)
      .resize(parseInt(breakpoint, 10))
      .avif()
      .toFile(`${output}/${filenameBase}_${breakpoint}.avif`);
  },
  async resizeOnly(input, breakpoint, output, filenameBase, filename) {
    await sharp(input)
      .resize(parseInt(breakpoint, 10))
      .toFile(`${output}/${filenameBase}_${breakpoint}${getInputExtension(filename)}`);
  },
});
