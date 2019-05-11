import React from 'react';
import useStoreon from 'storeon/react';

import ContactInfo from 'app/sections/ContactInfo';
import Header from 'app/sections/Header';
import OrderList from 'app/sections/OrderList';
import CheckoutInputs from 'app/sections/CheckoutInputs';

import { updateOrder as fluxUpdateOrder } from 'app/flux/order';

import css from './index.styl';

function localUpdateOrder(state) {
  return function updateOrderState(params) {
    return fluxUpdateOrder(state, params);
  };
}

export default function Checkout() {
  const {
    order,
    dispatch: dispatchOrder,
  } = useStoreon('order');

  const state = {
    order,
    dispatch: dispatchOrder,
  };

  return (
    <>
      <ContactInfo />
      <Header shouldRenderLinks={false} />
      <main className={css.main}>
        <OrderList
          order={order}
          updateOrder={localUpdateOrder(state)}
        />
        <CheckoutInputs />
      </main>
    </>
  );
}
