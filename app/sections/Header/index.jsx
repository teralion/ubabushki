import React from 'react';
import T from 'prop-types';
import useStoreon from 'storeon/react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import css from './index.styl';

function mobileHeaderWithLinks() {
  return (
    <>
      <Link
        to="/"
        className={cx(css.navLink, css.logo)}
      >
        У бабушки
      </Link>
      <div className={css.navBlock}>
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
      </div>
    </>
  );
}

function desktopHeaderWithLinks() {
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

function renderHeaderWithLinks() {
  const {
    responsive: {
      isMobile = false,
    } = {},
  } = useStoreon('responsive');

  return isMobile
    ? mobileHeaderWithLinks()
    : desktopHeaderWithLinks();
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
  const {
    className,
    shouldRenderLinks,
    shouldShowSeparator,
  } = props;

  return (
    <>
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
      {shouldShowSeparator && (
        <div className={css.separator} />
      )}
    </>
  );
}

/* eslint-disable */
Header.propTypes = {
  shouldShowSeparator: T.bool,
  shouldRenderLinks: T.bool,
  className: T.string,
};
Header.defaultProps = {
  shouldShowSeparator: true,
  shouldRenderLinks: true,
  className: '',
};
/* eslint-enable */
