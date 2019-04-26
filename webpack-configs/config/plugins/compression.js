/* eslint-disable-next-line import/no-extraneous-dependencies */
import CompressionPlugin from 'compression-webpack-plugin';

const compression = () => (
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    cache: true,
  })
);

export default compression;
