import React from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import css from './index.styl';

export default function MainHeader() {
  return (
    <nav className={css.header}>
      <Link
        to="/about"
        className={css.navLink}
      >
        О нас
      </Link>
      <Link
        to="/contacts"
        className={css.navLink}
      >
        Контакты
      </Link>
      <Link
        to="/"
        className={cx(css.navLink, css.logo)}
      >
        У бабушки
      </Link>
      <Link
        to="/delivery"
        className={css.navLink}
      >
        Доставка
      </Link>
      <Link
        to="/payment"
        className={css.navLink}
      >
        Оплата
      </Link>
    </nav>
  );
}
