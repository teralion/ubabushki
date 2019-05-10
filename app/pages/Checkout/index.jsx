import React from 'react';
import useStoreon from 'storeon/react';

import ContactInfo from 'app/sections/ContactInfo';
import Header from 'app/sections/Header';
import OrderList from 'app/sections/OrderList';

import cx from 'classnames';
import css from './index.styl';

export default function Checkout() {
  const { dispatch, count } = useStoreon('count');

  return (
    <>
      <ContactInfo />
      <Header shouldRenderLinks={false} />
      <OrderList />
      <button
        type="button"
        onClick={() => dispatch('inc', { nextCount: count + 2 })}
      >
        inc
      </button>
      <div>{count}</div>
    </>
  );
}
