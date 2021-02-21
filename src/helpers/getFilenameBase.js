const getFilenameBase = (filename) => {
  const re = /[^.]*/;
  return re.exec(filename)[0];
};

export default getFilenameBase;
