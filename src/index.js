import { program } from 'commander';

program.version('0.0.1');
program.parse(process.argv);

const main = async () => {
  console.log('Hello, gen-srcset');
};

main();
