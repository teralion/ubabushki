import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Routes from 'app/routes';

import getStatics from './getStatics';
import { app, partials } from '../templates';

function prerender(ctx) {
  const context = {};
  const statics = getStatics();

  let html = '';

  if (process.env.NODE_ENV === 'production') {
    html = ReactDOM.renderToString(
      <StaticRouter location={ctx.url} context={context}>
        <Routes />
      </StaticRouter>,
    );
  }

  if (context.url) {
    ctx.redirect(context.url);
    ctx.status = 302;

    return ctx;
  }

  ctx.status = 200;
  ctx.body = app.render({
    html,
    statics,
    GLOBALS,
  }, partials);
}

export default prerender;
