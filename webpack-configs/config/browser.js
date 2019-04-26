import path from 'path';
import { browser as entry } from './utils/entry';
import { browser as output } from './utils/output';
import resolve from './utils/resolve';
import optimization from './utils/optimization';
import dotenv from './utils/dotenv';
import babel from './loaders/babel';
import statics from './loaders/statics';
import { browser as styl } from './loaders/css';
import composeGlobals from './plugins/globals';
import { hmr, moduleConcatenation } from './plugins/webpack';
import compression from './plugins/compression';
import environment from './plugins/environment';
import extractStyl from './plugins/extractCss';

const context = {
  DIR: path.resolve('./'),
};

dotenv(context);

export default function browser(config) {
  const { production = false, development = true } = config;

  const props = {
    production,
    development,
    isBrowser: true,
    isServer: false,
    ...context,
  };

  return {
    mode: production ? 'production' : 'development',
    context: context.DIR,
    entry: entry(props),
    output: output(props),
    resolve: resolve(props),
    devtool: development ? 'eval' : 'inline-source-map',
    module: {
      rules: [
        babel(),
        statics(),
        styl(props),
      ],
    },
    plugins: [
      composeGlobals(props),
      moduleConcatenation(),
      environment(props),
      development ? hmr() : false,
      production ? compression() : false,
      production ? extractStyl(props) : false,
    ].filter(Boolean),
    optimization: optimization(props),
  };
}
