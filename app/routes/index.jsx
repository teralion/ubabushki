import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from 'app/pages/Main';
import Delivery from 'app/pages/Delivery';
import Contacts from 'app/pages/Contacts';
import Privacy from 'app/pages/Privacy';
import About from 'app/pages/About';
import Checkout from 'app/pages/Checkout';

function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => <Main {...props} />}
      />
      <Route
        exact
        path="/checkout"
        render={props => <Checkout {...props} />}
      />
      <Route
        exact
        path="/delivery"
        render={props => <Delivery {...props} />}
      />
      <Route
        exact
        path="/contacts"
        render={props => <Contacts {...props} />}
      />
      <Route
        exact
        path="/privacy"
        render={props => <Privacy {...props} />}
      />
      <Route
        exact
        path="/about"
        render={props => <About {...props} />}
      />
    </Switch>
  );
}

export default Routes;
