#!/usr/bin/env node
import { program } from 'commander';
import path from 'path';
import { spawn, Worker, Pool } from 'threads';
import getFilenameBase from './helpers/getFilenameBase';

program
  .version('0.3.0')
  .option('-i, --input <path>', 'Input image path')
  .option('-b, --breakpoints <breakpoints>', 'breakpoints which images will be generated')
  .option('-o, --output <output>', 'output path')
  .option('-n, --noAvif', "don't generate avif files");

program.parse(process.argv);

const main = async () => {
  const options = program.opts();
  const input = path.resolve(options.input);
  const filename = path.basename(input);
  const filenameBase = getFilenameBase(filename);
  const output = options.output || '.';
  const { noAvif } = options;

  if (!options.input) throw new Error('input argument is required');
  if (!options.breakpoints) throw new Error('breakpoints argument is required');

  const breakpoints = options.breakpoints.split(',').map((value) => value.replace(' ', ''));

  const pictureService = Pool(() => spawn(new Worker('./services/picture.js')));

  breakpoints.forEach(async (breakpoint) => {
    pictureService.queue((picture) =>
      picture.resizeOnly(input, breakpoint, output, filenameBase, filename),
    );
  });

  breakpoints.forEach(async (breakpoint) => {
    if (noAvif) return;
    pictureService.queue((picture) => picture.toAvif(input, breakpoint, output, filenameBase));
  });

  await pictureService.completed();
  await pictureService.terminate();
};

try {
  main();
} catch (error) {
  console.log(error);
  process.exit(1);
}
