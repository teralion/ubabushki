import React, { useState } from 'react';
import cloneDeep from 'lodash.clonedeep';

import ContactInfo from 'app/sections/ContactInfo';
import MainHeader from 'app/sections/MainHeader';
import OrderInputs from 'app/sections/OrderInputs';
import CatalogSection from 'app/sections/CatalogSection';
import CartSection from 'app/sections/CartSection';
import NotificationsSection from 'app/sections/NotificationsSection';

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

function updateOrder(props) {
  return function updateOrderValues(params) {
    const {
      order,
      handleOrder,
      guest: parentGuest,
    } = props;

    const {
      id,
      amount,
      optionId,
      label = '',
      guest: childGuest,
    } = params;

    const guest = childGuest || parentGuest;
    const nextOrder = cloneDeep(order);
    if (!nextOrder[guest]) {
      nextOrder[guest] = [];
    }

    const nextOptionId = optionId || null;

    let itemIndex;
    const item = nextOrder[guest].find((v, i) => {
      if (v.id === id) itemIndex = i;
      return v.id === id;
    });

    if (!item && amount > 0) {
      nextOrder[guest].push({
        id,
        label,
        countInCart: amount,
        optionId: nextOptionId,
      });
    } else if (item) {
      item.countInCart = amount;
      item.optionId = nextOptionId;
      item.label = label;
    }

    if (
      amount === 0
      && typeof itemIndex === 'number'
    ) {
      nextOrder[guest].splice(itemIndex, 1);
    }

    if (nextOrder[guest].length === 0) {
      delete nextOrder[guest];
    }

    handleOrder(nextOrder);
  };
}

export default function Main() {
  const [guests, handleGuests] = useState(MIN_GUESTS);
  const [guest, handleGuest] = useState(FIRST_GUEST);
  const [day, handleDay] = useState(toISOString(NOW));
  const [order, handleOrder] = useState({});

  const state = {
    guest,
    handleGuest,
    guests,
    handleGuests,
    day,
    handleDay,
    order,
    handleOrder,
  };

  return (
    <>
      <ContactInfo />
      <MainHeader />

      <div className={css.separator} />

      <main className={css.main}>
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
        <CatalogSection
          day={day}
          guest={guest}
          guests={guests}
          order={order}
          handleOrder={handleOrder}
          updateOrder={updateOrder(state)}
        />
      </main>

      <CartSection
        day={day}
        order={order}
        guest={guest}
        guests={guests}
        className={css.cartSection}
        updateOrder={updateOrder(state)}
      />

      <NotificationsSection order={order} />
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
