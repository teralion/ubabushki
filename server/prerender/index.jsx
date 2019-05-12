import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import store from 'app/flux/index';
import StoreContext from 'storeon/react/context';

import { Helmet } from 'app/layout/Meta';

import Routes from 'app/routes';

import getStatics from './getStatics';
import { app, partials } from '../templates';

function prerender(ctx) {
  const context = {};
  const statics = getStatics();

  let html = '';
  let helmet = {};

  if (process.env.NODE_ENV === 'production') {
    html = ReactDOM.renderToString(
      <StaticRouter location={ctx.url} context={context}>
        <StoreContext.Provider value={store}>
          <Routes />
        </StoreContext.Provider>
      </StaticRouter>,
    );

    const {
      meta,
      link,
      script,
      title,
      description,
    } = Helmet.renderStatic();

    helmet = {
      meta: meta ? meta.toString() : '',
      link: link ? link.toString() : '',
      script: script ? script.toString() : '',
      title: title ? title.toString() : '',
      description: description ? description.toString() : '',
    };
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
    helmet,
  }, partials);
}

export default prerender;
