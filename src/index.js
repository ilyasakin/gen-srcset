import { program } from 'commander';
import sharp from 'sharp';
import path from 'path';

program
  .version('0.0.1')
  .option('-i, --input <path>', 'Input image path')
  .option('-b, --breakpoints <breakpoints>', 'breakpoints which images will be generated');

program.parse(process.argv);

const main = async () => {
  const options = program.opts();
  if (!options.breakpoints) throw new Error('breakpoints argument is required');
  console.log(options);
  const breakpoints = options.breakpoints.split(',').map((value) => value.replace(' ', ''));

  breakpoints.forEach((breakpoint) => {
    sharp(path.resolve(options.input))
      .resize(parseInt(breakpoint, 10))
      .avif()
      .toFile(`output_${breakpoint}.avif`);
  });
};

try {
  main();
} catch (error) {
  console.log(error);
  process.exit(1);
}
