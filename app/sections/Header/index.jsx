import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import css from './index.styl';

function renderHeaderWithLinks() {
  return (
    <>
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
    </>
  );
}

function renderBareHeader() {
  return (
    <>
      <Link
        to="/"
        className={cx(css.navLink, css.logo)}
      >
        У бабушки
      </Link>
    </>
  );
}

export default function Header(props) {
  const { className, shouldRenderLinks } = props;

  return (
    <nav
      className={cx(
        css.header, className,
        { [css.bare]: !shouldRenderLinks },
      )}
    >
      {shouldRenderLinks
        ? renderHeaderWithLinks()
        : renderBareHeader()
      }
    </nav>
  );
}

/* eslint-disable */
Header.propTypes = {
  shouldRenderLinks: T.bool,
  className: T.string,
};
Header.defaultProps = {
  shouldRenderLinks: true,
  className: '',
};
/* eslint-enable */
