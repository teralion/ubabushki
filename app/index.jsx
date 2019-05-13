import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import isServer from 'helpers/isServer';

import createStore from 'app/flux/index';
import StoreContext from 'storeon/react/context';

import 'app/styles/app.styl';

//* components
import Routes from 'app/routes';

function render() {
  const initial = {
    responsive: isServer
      ? {}
      : (window.initial || {}).responsive,
  };

  return (
    <BrowserRouter>
      <StoreContext.Provider value={createStore(initial)}>
        <Routes />
      </StoreContext.Provider>
    </BrowserRouter>
  );
}

/*
* SSR on production.
* HMR on development.
* */
if (GLOBALS.NODE_ENV === 'production') {
  ReactDOM.hydrate(
    render(),
    document.getElementById('app'),
  );
} else {
  ReactDOM.render(
    render(),
    document.getElementById('app'),
  );
}
