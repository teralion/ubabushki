import path from 'path';

export function browser(props) {
  const { DIR } = props;

  return {
    app: [
      '@babel/polyfill',
      path.join(DIR, 'app'),
    ],
  };
}

export function server(props) {
  const { DIR } = props;

  return {
    server: [
      '@babel/polyfill',
      path.join(DIR, 'server'),
    ],
  };
}
