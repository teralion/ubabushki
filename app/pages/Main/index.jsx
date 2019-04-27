import React from 'react';

import { Link } from 'react-router-dom';

import cx from 'classnames';
import css from './index.styl';

export default function Main() {
  return (
    <>
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

      <div className={css.separator} />

      <main className={css.main}>
        <div className={css.image} />
      </main>
    </>
  );
}

Main.propTypes = {};
