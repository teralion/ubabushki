import path from 'path';
import 'colors'; /* eslint-disable-line import/no-extraneous-dependencies */

function requireDotenv(filePath) {
  /* no build config for webpack-configs itself */
  require('dotenv').config({ path: filePath }); /* eslint-disable-line */
}

export default function getEnvVariables(context) {
  const { DIR } = context;
  const { NODE_ENV = 'development' } = process.env;

  const dotenvFiles = [
    path.join(DIR, '.env'),
    path.join(DIR, `.env.${NODE_ENV}`),
  ];

  dotenvFiles.forEach(requireDotenv);
}
