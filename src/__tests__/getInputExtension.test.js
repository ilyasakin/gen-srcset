import getInputExtension from '../helpers/getInputExtension';

describe('getInputExtension', () => {
  it('returns extensions correctly', () => {
    expect(getInputExtension('filename.avif')).toEqual('.avif');
    expect(getInputExtension('filename.abc.jpg')).toEqual('.abc.jpg');
  });
});
