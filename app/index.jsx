import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'app/styles/app.styl';

//* components
import Routes from 'app/routes';

function render() {
  return (
    <BrowserRouter>
      <Routes />
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
