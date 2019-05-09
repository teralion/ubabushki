import React, { useState } from 'react';
import T from 'prop-types';

import { FIRST_GUEST, MIN_GUESTS } from 'app/pages/Main';

import cx from 'classnames';
import css from './index.styl';

export default function CartSection(props) {
  const { order, className } = props;

  const isOrder = Object.keys(order).length > 0;

  return (
    <>
      <button
        type="button"
        className={cx(
          css.orderButton, className,
          { [css.disabled]: !isOrder },
        )}
      >
        ЗАКАЗАТЬ
      </button>
    </>
  );
}

/* eslint-disable */
CartSection.propTypes = {
  day: T.string,
  guest: T.number,
  guests: T.number,
  order: T.object,
  className: T.string,
};
CartSection.defaultProps = {
  day: '',
  guest: FIRST_GUEST,
  guests: MIN_GUESTS,
  order: {},
  className: '',
};
/* eslint-enable */
