import React from 'react';
import useStoreon from 'storeon/react';

import CheckoutWrap from 'app/components/TextPageWrap';
import OrderList from 'app/sections/OrderList';
import
CheckoutInputs, {
  requiredInputs,
} from 'app/sections/CheckoutInputs';
import ConfirmOrder from 'app/sections/ConfirmOrder';

import {
  updateOrder as fluxUpdateOrder,
} from 'app/flux/order';
import {
  changeCheckout as fluxUpdateCheckout,
} from 'app/flux/checkout';

import getTotals from 'app/utils/orderTotals';

function localUpdateOrder(state) {
  return function updateOrderState(params) {
    const { dispatchOrder: dispatch, order } = state;
    return fluxUpdateOrder(
      { order, dispatch },
      params,
    );
  };
}

function handler(params) {
  return function onChange(value) {
    const { dispatchCheckout, key } = params;
    fluxUpdateCheckout(dispatchCheckout, key, value);
  };
}

function defineIfShouldSubmit(state) {
  const { order } = state;
  const menWhoOrdered = Object.keys(order).sort();
  const totals = getTotals(menWhoOrdered, { order });

  if (totals.total === 0) {
    return false;
  }

  return !requiredInputs.find(id => !state[id]);
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
    dispatchOrder,
    handleName: handler({
      dispatchCheckout,
      key: 'name',
    }),
    handlePhone: handler({
      dispatchCheckout,
      key: 'phone',
    }),
    handleAddress: handler({
      dispatchCheckout,
      key: 'address',
    }),
    handleTime: handler({
      dispatchCheckout,
      key: 'time',
    }),
    handleDate: handler({
      dispatchCheckout,
      key: 'date',
    }),
    handleComment: handler({
      dispatchCheckout,
      key: 'comment',
    }),
    handlePayment: handler({
      dispatchCheckout,
      key: 'payment',
    }),
    handleDelivery: handler({
      dispatchCheckout,
      key: 'delivery',
    }),
    ...checkout,
  };

  return (
    <>
      <CheckoutWrap
        shouldRenderLinks={false}
        shouldShowSeparator={false}
      >
        <OrderList
          order={order}
          updateOrder={localUpdateOrder(state)}
        />
        <CheckoutInputs {...state} />
      </CheckoutWrap>

      <ConfirmOrder
        shouldSubmit={defineIfShouldSubmit(state)}
      />
    </>
  );
}
