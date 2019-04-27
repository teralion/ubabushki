import React from 'react';

import ContactInfo from 'app/sections/ContactInfo';
import MainHeader from 'app/sections/MainHeader';
import OrderInputs from 'app/sections/OrderInputs';

import css from './index.styl';

export default function Main() {
  return (
    <>
      <ContactInfo />
      <MainHeader />

      <div className={css.separator} />

      <OrderInputs />

      <main className={css.main}>
        <div className={css.image} />
      </main>
    </>
  );
}
