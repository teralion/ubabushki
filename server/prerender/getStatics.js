import allowedBuildFiles from '../utils/allowedBuildFiles';

const files = allowedBuildFiles;

// section names must match
const statics = {
  js: [],
  css: [],

  $placedFilenames: [],
  set _js(value) {
    this.$placedFilenames = this.$placedFilenames.concat(
      value.name,
    );

    this.js = this.js.concat(
      JSON.parse(JSON.stringify(value)),
    );
  },
  set _css(value) {
    this.$placedFilenames = this.$placedFilenames.concat(
      value.name,
    );

    this.css = this.css.concat(
      JSON.parse(JSON.stringify(value)),
    );
  },
};
const tests = {
  js: [
    v => /\.js$/.test(v),
  ],
  css: [
    v => /\.css$/.test(v) && !v.includes('server'),
  ],
};

function checkTestSection(sectionName, filename) {
  const section = tests[sectionName];

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < section.length; i++) {
    const isAllowed = section[i](filename);

    if (!isAllowed) return false;
  }

  return true;
}

function placeFilename(filename) {
  const testNames = Object.keys(tests);

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < testNames.length; i++) {
    const sectionName = testNames[i];

    const isAllowed = checkTestSection(
      sectionName, filename,
    );

    if (isAllowed) {
      statics[`_${sectionName}`] = { name: filename };
      return;
    }
  }
}

function getStatics() {
  const { $placedFilenames } = statics;

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];

    if (!$placedFilenames.includes(filename)) {
      placeFilename(files[i]);
    }
  }

  return statics;
}

export default getStatics;
