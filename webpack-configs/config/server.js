import path from 'path';
import { server as entry } from './utils/entry';
import { server as output } from './utils/output';
import dotenv from './utils/dotenv';
import resolve from './utils/resolve';
import externals from './utils/externals';
import babel from './loaders/babel';
import mustache from './loaders/mustache';
import { server as styl } from './loaders/css';
import statics from './loaders/statics';
import { moduleConcatenation } from './plugins/webpack';
import composeGlobals from './plugins/globals';
import extractStyl from './plugins/extractCss';
import environment from './plugins/environment';

const context = {
  DIR: path.resolve('./'),
};

dotenv(context);

export default function server(config) {
  const { production = false, development = true } = config;

  const props = {
    production,
    development,
    isBrowser: false,
    isServer: true,
    ...context,
  };

  return {
    target: 'node',
    mode: production ? 'production' : 'development',
    context: context.DIR,
    entry: entry(props),
    output: output(props),
    resolve: resolve(props),
    externals: externals(props),
    module: {
      rules: [
        babel(),
        statics(),
        styl(props),
        mustache(props),
      ],
    },
    plugins: [
      moduleConcatenation(),
      extractStyl(props),
      environment(props),
      composeGlobals(props),
    ],
  };
}
