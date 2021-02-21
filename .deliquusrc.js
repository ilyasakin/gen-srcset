module.exports = {
  sources: [{ pattern: 'src/helpers/**/*.js', for: ['Tests'], name: 'helpers' }],
  targets: [{ pattern: 'src/__tests__/**/*.test.js', name: 'Tests' }],
};
