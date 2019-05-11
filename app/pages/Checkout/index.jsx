import React from 'react';
import useStoreon from 'storeon/react';

import ContactInfo from 'app/sections/ContactInfo';
import Header from 'app/sections/Header';
import OrderList from 'app/sections/OrderList';

import { changeOrder } from 'app/flux/order';

import cx from 'classnames';
import css from './index.styl';

export default function Checkout() {
  const {
    order,
    dispatch: dispatchOrder,
  } = useStoreon('order');

  const handleOrder = nextOrder => (
    changeOrder(dispatchOrder, nextOrder)
  );

  return (
    <>
      <ContactInfo />
      <Header shouldRenderLinks={false} />
      <main className={css.main}>
        <OrderList
          order={order}
          handleOrder={handleOrder}
        />
      </main>
    </>
  );
}
