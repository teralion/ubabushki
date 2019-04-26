import path from 'path';

export function browser(props) {
  const { DIR, development = true } = props;

  // server/prerender/getStatics.js
  const filename = development
    ? '[name].js'
    : '[name]@[hash:12].js';

  return {
    filename,
    path: path.join(DIR, 'build'),
    publicPath: process.env.PUBLIC_PATH,
  };
}

export function server(props) {
  const { DIR } = props;

  return {
    filename: 'server.js',
    path: path.join(DIR, 'build'),
    libraryTarget: 'commonjs2',
    publicPath: process.env.PUBLIC_PATH,
  };
}
