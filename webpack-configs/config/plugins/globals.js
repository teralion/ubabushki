import path from 'path';
import webpack from 'webpack';
import reduce from 'lodash.reduce';

function filterNumber(value) {
  /* eslint-disable-next-line */
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  }

  throw new Error('not a number');
}

function sanitizeValue(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value === 'true') {
    return true;
  } if (value === 'false') {
    return false;
  }

  try {
    return filterNumber(value);
  } catch (e) {
    return JSON.stringify(value);
  }
}

function reducer(result, defaultValue, name) {
  /* eslint-disable-next-line */
  result[name] = sanitizeValue(
    process.env[name] || defaultValue,
  );

  return result;
}

function composeGlobals(globals) {
  return reduce(globals, reducer, {});
}

function extractNodeEnv() {
  return JSON.stringify(process.env.NODE_ENV);
}

export const globals = {
  PORT: undefined,
  DEV_SERVER_PORT: undefined,
  PUBLIC_PATH: undefined,
};

export default function defineGlobals(props) {
  const { DIR } = props;

  const composedGlobals = {
    __dirname: JSON.stringify(DIR),
    __filename: JSON.stringify(path.join(DIR, 'index.js')),
    NODE_ENV: extractNodeEnv(),
    'process.env.NODE_ENV': extractNodeEnv(),
    GLOBALS: composeGlobals(globals),
  };

  return new webpack.DefinePlugin(composedGlobals);
}
