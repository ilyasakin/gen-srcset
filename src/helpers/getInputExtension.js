const getInputExtension = (filename) => {
  const regexExtension = /\..*$/;
  const extension = regexExtension.exec(filename)[0];

  return extension;
};

export default getInputExtension;
