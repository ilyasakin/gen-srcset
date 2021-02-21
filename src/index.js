import { program } from 'commander';
import sharp from 'sharp';
import path from 'path';
import getInputExtension from './helpers/getInputExtension';

program
  .version('0.0.1')
  .option('-i, --input <path>', 'Input image path')
  .option('-b, --breakpoints <breakpoints>', 'breakpoints which images will be generated');

program.parse(process.argv);

const main = async () => {
  const options = program.opts();
  const input = path.resolve(options.input);
  const filename = path.basename(input);

  if (!options.breakpoints) throw new Error('breakpoints argument is required');
  console.log(options);
  const breakpoints = options.breakpoints.split(',').map((value) => value.replace(' ', ''));

  breakpoints.forEach((breakpoint) => {
    sharp(input)
      .resize(parseInt(breakpoint, 10))
      .toFile(`output_${breakpoint}${getInputExtension(filename)}`);
  });

  breakpoints.forEach((breakpoint) => {
    sharp(input).resize(parseInt(breakpoint, 10)).avif().toFile(`output_${breakpoint}.avif`);
  });
};

try {
  main();
} catch (error) {
  console.log(error);
  process.exit(1);
}
