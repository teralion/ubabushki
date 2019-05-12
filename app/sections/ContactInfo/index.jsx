import React from 'react';

import cx from 'classnames';
import css from './index.styl';

export default function
  ContactInfoSection() {
  return (
    <div className={css.info}>
      <a
        href="tel:+79779997799"
        className={cx(css.item, css.phone)}
      >
        +7 977 999 77 99
      </a>
      <div className={css.slash} />
      <span className={css.item}>
          9:00 - 21:00
      </span>
      <div className={css.slash} />
      <div className={css.item}>
        ул. ген.Озерова, 17б
      </div>
    </div>
  );
}
