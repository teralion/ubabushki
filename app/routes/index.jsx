import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Meta from 'app/layout/Meta';

import Main from 'app/pages/Main';
import Delivery from 'app/pages/Delivery';
import Payment from 'app/pages/Payment';
import Contacts from 'app/pages/Contacts';
import About from 'app/pages/About';
import Checkout from 'app/pages/Checkout';

function Routes() {
  return (
    <>
      <Meta />
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
          path="/payment"
          render={props => <Payment {...props} />}
        />
        <Route
          exact
          path="/about"
          render={props => <About {...props} />}
        />
      </Switch>
    </>
  );
}

export default Routes;
