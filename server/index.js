/* eslint-disable-next-line consistent-return */
import app from './server';

/* eslint-disable-next-line no-console */
const appMessage = () => console.log(
  `App is running on ${GLOBALS.PORT} port`,
);

// process.env.PORT for heroku
app.listen(process.env.PORT || GLOBALS.PORT, appMessage);

/* Handle GLOBALS.PUBLIC_PATH */
async function startDevServer() {
  await import('./devServer').then(({ default: devServer }) => {
    (devServer || {}).listen(GLOBALS.DEV_SERVER_PORT);
  });
}

if (
  process.env.NODE_ENV === 'development'
  && GLOBALS.DEV_SERVER_PORT
) {
  startDevServer();
}
