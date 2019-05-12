import Koa from 'koa';
import Router from 'koa-router';

import assets from './routes/assets';
import prerender from './routes/prerender';

import helmet from './handlers/helmet';
import errors from './handlers/errors';
import logger from './handlers/logger';
import bodyParser from './handlers/bodyParser';
import statics from './handlers/statics';
import favicon from './handlers/favicon';
import filename from './handlers/filename';
import protector from './handlers/protector';

const app = new Koa();
const router = new Router();

app.use(helmet);
app.use(errors);
app.use(logger);
app.use(bodyParser);
app.use(statics);
app.use(favicon);
app.use(filename);

router
  .get(`${GLOBALS.PUBLIC_PATH}*`, protector, assets)
  .get('*', prerender);

app.use(router.routes());

export default app;
