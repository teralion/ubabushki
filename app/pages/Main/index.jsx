import React, { useState } from 'react';

import ContactInfo from 'app/sections/ContactInfo';
import MainHeader from 'app/sections/MainHeader';
import OrderInputs from 'app/sections/OrderInputs';
import CatalogSection from 'app/sections/CatalogSection';

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
          handleDay={handleDay}
        />
        <CatalogSection
          day={day}
          guest={guest}
          guests={guests}
          order={order}
          handleOrder={handleOrder}
        />
      </main>
    </>
  );
}
