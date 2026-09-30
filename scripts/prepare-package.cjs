const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const manifest = require('../package.json');

// The published package is the contents of dist, not the source checkout.
const published = {
  ...manifest,
  main: 'index.js',
  files: ['index.js', 'helpers/', 'services/', 'README.md', 'LICENSE'],
};
delete published.scripts;
delete published.devDependencies;
delete published.packageManager;
fs.writeFileSync(path.join(root, 'dist/package.json'), `${JSON.stringify(published, null, 2)}\n`);
for (const file of ['README.md', 'LICENSE']) {
  fs.copyFileSync(path.join(root, file), path.join(root, 'dist', file));
}
