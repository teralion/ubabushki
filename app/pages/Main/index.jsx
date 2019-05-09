import React, { useState } from 'react';

import ContactInfo from 'app/sections/ContactInfo';
import MainHeader from 'app/sections/MainHeader';
import OrderInputs from 'app/sections/OrderInputs';
import CatalogSection from 'app/sections/CatalogSection';
import TotalSection from 'app/sections/TotalSection';
import CartSection from 'app/sections/CartSection';
import NotificationsSection from 'app/sections/NotificationsSection';

import moment, { toISOString } from 'helpers/moment';

import css from './index.styl';

export const FIRST_GUEST = 1;
export const MIN_GUESTS = 1;
export const DAYS_WINDOW = 5;
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
        />
        {/*<TotalSection
          day={day}
          order={order}
          guest={guest}
          guests={guests}
        />*/}
      </main>

      <CartSection
        day={day}
        order={order}
        guest={guest}
        guests={guests}
        className={css.cartSection}
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
