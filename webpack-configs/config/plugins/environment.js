import webpack from 'webpack';

export default function defineEnvironment(props) {
  const { isBrowser = false, isServer = true } = props;

  // global namespace
  return new webpack.DefinePlugin({
    isBrowser,
    isServer,
  });
}
