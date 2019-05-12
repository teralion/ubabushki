import React from 'react';
import useStoreon from 'storeon/react';

import ContactInfo from 'app/sections/ContactInfo';
import Header from 'app/sections/Header';
import OrderList from 'app/sections/OrderList';
import CheckoutInputs from 'app/sections/CheckoutInputs';
import ConfirmOrder from 'app/sections/ConfirmOrder';

import { updateOrder as fluxUpdateOrder } from 'app/flux/order';
import { changeCheckout as fluxUpdateCheckout } from 'app/flux/checkout';

import css from './index.styl';

function localUpdateOrder(state) {
  return function updateOrderState(params) {
    const { dispatchOrder: dispatch, order } = state;
    return fluxUpdateOrder({ order, dispatch }, params);
  };
}

function handler(params) {
  return function onChange(value) {
    const { dispatchCheckout, key } = params;
    fluxUpdateCheckout(dispatchCheckout, key, value);
  };
}

export default function Checkout() {
  const {
    order, dispatch: dispatchOrder,
  } = useStoreon('order');
  const {
    checkout, dispatch: dispatchCheckout,
  } = useStoreon('checkout');

  const state = {
    order,
    dispatch: dispatchOrder,
    handleName: handler({ dispatchCheckout, key: 'name' }),
    handlePhone: handler({ dispatchCheckout, key: 'phone' }),
    handleAddress: handler({ dispatchCheckout, key: 'address' }),
    handleTime: handler({ dispatchCheckout, key: 'time' }),
    handleDate: handler({ dispatchCheckout, key: 'date' }),
    handleComment: handler({ dispatchCheckout, key: 'comment' }),
    handlePayment: handler({ dispatchCheckout, key: 'payment' }),
    handleDelivery: handler({ dispatchCheckout, key: 'delivery' }),
    ...checkout,
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
        <CheckoutInputs {...state} />
      </main>

      <ConfirmOrder />
    </>
  );
}
