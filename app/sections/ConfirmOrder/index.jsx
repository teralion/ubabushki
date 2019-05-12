import React from 'react';

import css from './index.styl';

export default function ConfirmOrder() {
  return (
    <button
      type="button"
      onClick={() => alert('confirmed!')}
      className={css.confirmButton}
    >
      отправить заказ!
    </button>
  );
}
