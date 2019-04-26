import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from 'webpack-configs/browser.development';

const options = {
  publicPath: GLOBALS.PUBLIC_PATH,
  hot: true,
  host: 'localhost',
  port: GLOBALS.DEV_SERVER_PORT,
  writeToDisk: false,
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = Webpack(config);
const server = new WebpackDevServer(compiler, options);

export default server;
