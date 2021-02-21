import getFilenameBase from '../helpers/getFilenameBase';

describe('getFilenameBase', () => {
  it('gets base name correctly', () => {
    expect(getFilenameBase('filename.js')).toEqual('filename');
  });
});
