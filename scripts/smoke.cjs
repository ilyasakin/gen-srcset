const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const sharp = require('sharp');

const packageRoot = path.resolve(process.argv[2] || path.join(__dirname, '../dist'));
const published = require(path.join(packageRoot, 'package.json'));
const cli = path.resolve(packageRoot, published.bin['gen-srcset']);
assert.equal(published.main, 'index.js');
assert.equal(published.scripts, undefined);
assert.equal(published.devDependencies, undefined);
const run = (args, cwd) =>
  execFileSync(process.execPath, [cli, ...args], {
    cwd,
    timeout: 60000,
    stdio: 'pipe',
  });

async function main() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gen-srcset smoke-'));
  try {
    assert.match(run(['--help'], root).toString(), /--breakpoints/);
    assert.equal(run(['--version'], root).toString().trim(), require('../package.json').version);
    assert.throws(
      () => run([], root),
      (error) => error.status === 1 && /input argument is required/.test(error.stderr.toString()),
    );
    assert.throws(
      () => run(['--input', 'missing.png'], root),
      (error) =>
        error.status === 1 && /breakpoints argument is required/.test(error.stderr.toString()),
    );
    for (const extension of ['jpg', 'png']) {
      const input = path.join(root, `sample.${extension}`);
      const output = path.join(root, extension);
      await fs.mkdir(output);
      await sharp({ create: { width: 40, height: 20, channels: 3, background: '#336699' } }).toFile(
        input,
      );
      run(['--input', input, '--breakpoints', '10, 20', '--output', output], root);
      assert.deepEqual(
        (await fs.readdir(output)).sort(),
        [
          `sample_10.avif`,
          `sample_10.${extension}`,
          `sample_20.avif`,
          `sample_20.${extension}`,
        ].sort(),
      );
      for (const width of [10, 20]) {
        for (const format of [extension, 'avif']) {
          const metadata = await sharp(path.join(output, `sample_${width}.${format}`)).metadata();
          assert.equal(metadata.width, width);
          assert.equal(metadata.height, width / 2);
          assert.equal(
            metadata.format,
            format === 'avif' ? 'heif' : format === 'jpg' ? 'jpeg' : 'png',
          );
        }
      }
      const defaultOutput = path.join(root, `${extension}-no-avif`);
      await fs.mkdir(defaultOutput);
      run(['-i', input, '-b', '10', '-n'], defaultOutput);
      assert.deepEqual(await fs.readdir(defaultOutput), [`sample_10.${extension}`]);
    }
    console.log(
      'CLI smoke tests passed: JPEG, PNG, AVIF, dimensions, filenames, default output, --noAvif, help and version',
    );
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
