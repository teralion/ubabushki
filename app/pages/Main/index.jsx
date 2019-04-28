import React from 'react';

import ContactInfo from 'app/sections/ContactInfo';
import MainHeader from 'app/sections/MainHeader';
import OrderInputs from 'app/sections/OrderInputs';
import CatalogSection from 'app/sections/CatalogSection';

import css from './index.styl';

export default function Main() {
  return (
    <>
      <ContactInfo />
      <MainHeader />

      <div className={css.separator} />

      <main className={css.main}>
        <OrderInputs className={css.inputs} />
        <CatalogSection />
      </main>
    </>
  );
}
