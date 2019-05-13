import React from 'react';
import useStoreon from 'storeon/react';

import CheckoutWrap from 'app/layout/TextPageWrap';
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
    const { dispatch, order } = state;
    return fluxUpdateOrder(
      { order, dispatch },
      params,
    );
  };
}

function handler(params) {
  return function onChange(value) {
    const { dispatch, key } = params;
    fluxUpdateCheckout(dispatch, key, value);
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
    order, checkout, dispatch,
  } = useStoreon('order', 'checkout');

  const state = {
    order,
    dispatch,
    handleName: handler({ dispatch, key: 'name' }),
    handlePhone: handler({ dispatch, key: 'phone' }),
    handleAddress: handler({ dispatch, key: 'address' }),
    handleTime: handler({ dispatch, key: 'time' }),
    handleDate: handler({ dispatch, key: 'date' }),
    handleComment: handler({ dispatch, key: 'comment' }),
    handlePayment: handler({ dispatch, key: 'payment' }),
    handleDelivery: handler({ dispatch, key: 'delivery' }),
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
