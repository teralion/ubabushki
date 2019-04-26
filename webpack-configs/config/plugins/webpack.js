/* eslint-disable-next-line import/no-self-import */
import webpack from 'webpack';

const hmr = () => (
  new webpack.HotModuleReplacementPlugin()
);

const moduleConcatenation = () => (
  new webpack.optimize.ModuleConcatenationPlugin()
);

export { moduleConcatenation };
export { hmr };
