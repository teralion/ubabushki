import React, { useState } from 'react';
import useStoreon from 'storeon/react';

import MainPageWrap from 'app/layout/TextPageWrap';
import OrderInputs from 'app/sections/OrderInputs';
import Catalog from 'app/sections/Catalog';
import Cart from 'app/sections/Cart';

import {
  changeOrder,
  updateOrder as fluxUpdateOrder,
} from 'app/flux/order';

import moment, { toISOString } from 'helpers/moment';

import css from './index.styl';

export const FIRST_GUEST = 1;
export const MIN_GUESTS = 1;
export const DAYS_WINDOW = 5;
export const FREE_DELIVERY_FROM = 750;
export const NOW = moment();

function updateGuests(state) {
  return function onGuestsUpdate(nextGuests) {
    const {
      guest,
      handleGuest,
      handleGuests,
    } = state;

    handleGuests(nextGuests);
    if (guest > nextGuests) {
      handleGuest(nextGuests);
    }
  };
}

function updateDay(state) {
  return function onDayUpdate(nextDay) {
    const {
      order,
      handleOrder,
      handleDay,
      handleGuest,
    } = state;

    const isOrder = Object.keys(order).length > 0;
    if (isOrder) {
      handleOrder({});
      handleGuest(FIRST_GUEST);
    }

    handleDay(nextDay);
  };
}

function localUpdateOrder(props) {
  return function updateOrderValues(params) {
    const {
      order,
      dispatchOrder,
      guest: parentGuest,
    } = props;

    const { guest: childGuest } = params;

    return fluxUpdateOrder({ dispatch: dispatchOrder, order }, {
      ...params,
      guest: childGuest || parentGuest,
    });
  };
}

export default function Main() {
  const [guests, handleGuests] = useState(MIN_GUESTS);
  const [guest, handleGuest] = useState(FIRST_GUEST);
  const [day, handleDay] = useState(toISOString(NOW));
  const {
    order,
    dispatch: dispatchOrder,
  } = useStoreon('order');

  const handleOrder = nextOrder => (
    changeOrder(dispatchOrder, nextOrder)
  );

  const state = {
    guest,
    handleGuest,
    guests,
    handleGuests,
    day,
    handleDay,
    order,
    handleOrder,
    dispatchOrder,
  };

  return (
    <>
      <MainPageWrap>
        <OrderInputs
          className={css.inputs}
          guest={guest}
          handleGuest={handleGuest}
          guests={guests}
          handleGuests={updateGuests(state)}
          day={day}
          handleDay={updateDay(state)}
          order={order}
        />
        <Catalog
          day={day}
          guest={guest}
          guests={guests}
          order={order}
          handleOrder={handleOrder}
          updateOrder={localUpdateOrder(state)}
        />
      </MainPageWrap>

      <Cart
        day={day}
        order={order}
        guest={guest}
        guests={guests}
        className={css.cartSection}
        updateOrder={localUpdateOrder(state)}
      />
    </>
  );
}

/*
* order = {
*   0: [
*     {
*       id: T.number,
*       countInCart: T.number,
*       optionId: T.number,
*       label: T.string,
*       ...
*     },
*     ...
*   ],
*   1: [...],
*   ...
* }
* */
