/* eslint-disable-next-line import/no-extraneous-dependencies */
import UglifyJs from 'uglifyjs-webpack-plugin';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export default function optimize(props) {
  const { development = true } = props;

  if (development) {
    return {};
  }

  return {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/].*/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'css',
          test: /\.(css)$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJs({
        parallel: true,
        sourceMap: true,
        cache: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  };
}
