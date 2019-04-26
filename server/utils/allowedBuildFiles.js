import fs from 'fs';

const files = fs.readdirSync('build');
const allowedBuildFiles = [];

function getFileTests() {
  if (process.env.NODE_ENV === 'production') {
    return [
      v => /^(app|vendors)@\w{12}\.(js|css)$/.test(v),
      v => /^server@\w{12}\.css$/.test(v),
      v => /\.(png|jpe?g|woff|ttf|pdf|otf)$/.test(v),
    ];
  }

  return [
    v => /^(app|vendors)\.(js|css)$/.test(v),
    v => /^server\.css$/.test(v),
    v => /\.(png|jpe?g|woff|ttf|pdf|otf)$/.test(v),
  ];
}

const tests = getFileTests();

function isAllowed(filename) {
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < tests.length; i++) {
    const isPassed = tests[i](filename);

    if (isPassed) {
      return true;
    }
  }

  return false;
}

function isAllowedFiles() {
  if (process.env.NODE_ENV === 'development') {
    // HMR requires to hot-update dynamically
    return false;
  }

  return Boolean(allowedBuildFiles.length);
}

function getAllowedFiles() {
  // caching
  if (isAllowedFiles()) {
    return allowedBuildFiles;
  }

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];

    if (isAllowed(filename)) {
      allowedBuildFiles.push(filename);
    }
  }

  return allowedBuildFiles;
}

/*
* It is easier to reason about
* when all build files are stored
* in one ./build folder, but to
* define protection level on runtime
* */

export default getAllowedFiles();
