import { program } from 'commander';

program
  .version('0.0.1')
  .option('-i, --input', 'Input image path')
  .option('-b, --breakpoints', 'breakpoints which images will be generated');

program.parse(process.argv);

const main = async () => {
  console.log('Hello, gen-srcset');
};

main();
