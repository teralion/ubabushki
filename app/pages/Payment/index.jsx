import React from 'react';

import PaymentPageWrap from 'app/components/TextPageWrap';

import css from './index.styl';

export default function PaymentPage() {
  return (
    <>
      <PaymentPageWrap className={css.main}>
        Оплата
      </PaymentPageWrap>
    </>
  );
}
