#!/usr/bin/env node

import { program } from 'commander';
import sharp from 'sharp';
import path from 'path';
import getInputExtension from './helpers/getInputExtension';
import getFilenameBase from './helpers/getFilenameBase';

program
  .version('0.1.0')
  .option('-i, --input <path>', 'Input image path')
  .option('-b, --breakpoints <breakpoints>', 'breakpoints which images will be generated')
  .option('-o, --output <output>', 'output path');

program.parse(process.argv);

const main = async () => {
  const options = program.opts();
  const input = path.resolve(options.input);
  const filename = path.basename(input);
  const filenameBase = getFilenameBase(filename);
  const output = options.output || '.';

  if (!options.input) throw new Error('input argument is required');
  if (!options.breakpoints) throw new Error('breakpoints argument is required');

  const breakpoints = options.breakpoints.split(',').map((value) => value.replace(' ', ''));

  breakpoints.forEach((breakpoint) => {
    sharp(input)
      .resize(parseInt(breakpoint, 10))
      .toFile(`${output}/${filenameBase}_${breakpoint}${getInputExtension(filename)}`);
  });

  breakpoints.forEach((breakpoint) => {
    sharp(input)
      .resize(parseInt(breakpoint, 10))
      .avif()
      .toFile(`${output}/${filenameBase}_${breakpoint}.avif`);
  });
};

try {
  main();
} catch (error) {
  console.log(error);
  process.exit(1);
}
