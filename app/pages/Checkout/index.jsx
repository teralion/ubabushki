import React, { useState } from 'react';
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
  const [name, handleName] = useState('');
  const [phone, handlePhone] = useState('');
  const [address, handleAddress] = useState('');
  const [time, handleTime] = useState('');
  const [date, handleDate] = useState('');
  const [comment, handleComment] = useState('');
  const [payment, handlePayment] = useState('cash');
  const [delivery, handleDelivery] = useState('courier');

  const {
    order,
    dispatch: dispatchOrder,
  } = useStoreon('order');

  const state = {
    order,
    dispatch: dispatchOrder,
    name,
    handleName,
    phone,
    handlePhone,
    address,
    handleAddress,
    time,
    handleTime,
    date,
    handleDate,
    comment,
    handleComment,
    payment,
    handlePayment,
    delivery,
    handleDelivery,
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

      <button
        type="button"
        onClick={() => alert('confirmed!')}
        className={css.confirmButton}
      >
        отправить заказ!
      </button>
    </>
  );
}
