import React from 'react';
import T from 'prop-types';

import { FIRST_GUEST, MIN_GUESTS } from 'app/pages/Main';
import items from 'helpers/data';
import isServer from 'helpers/isServer';

import cx from 'classnames';
import css from './index.styl';

function findItem(id, label) {
  return items[label].find(v => (v || {}).id === id);
}

function getMansTotal(mansOrder) {
  let total = 0;
  mansOrder.forEach((orderItem) => {
    const { countInCart } = orderItem;

    const fullItem = findItem(orderItem.id, orderItem.label);
    if (
      !orderItem.optionId
      || orderItem.optionId === fullItem.id
    ) {
      total += fullItem.price * countInCart;
    } else {
      const optionItem = fullItem.options.find(v => (
        v.id === orderItem.optionId
      ));
      total += ((optionItem || {}).price || 0) * countInCart;
    }
  });

  return total;
}

function getTotal() {
  if (isServer) {
    return;
  }

  return 0;
}

function renderMansOrder(params, props) {
  /* eslint-disable-next-line */
  const { order } = props;
  const { man, i } = params;

  const total = getMansTotal(order[man]);

  const color = i % 2 === 0 ? 'gray' : 'white';
  const className = cx(css.row, {
    [css[`${color}Row`]]: color,
  });

  return (
    <div className={className} key={`man-${man}`}>
      <span className={css.rowName}>
        {`Гость ${man}`}
      </span>
      <span className={css.rowCount}>
        {`${total} руб.`}
      </span>
    </div>
  );
}

export default function TotalSection(props) {
  const { order } = props;

  const menWhoOrdered = Object.keys(order).sort();
  return (
    <>
      {menWhoOrdered.map((man, i) => (
        renderMansOrder({ man, i }, props)
      ))}
      <div className={cx(css.row, css.capital)}>
        <span className={css.rowName}>
          Итого
        </span>
        <span className={css.rowCount}>
          {getTotal(order)}
        </span>
      </div>
    </>
  );
}

/* eslint-disable */
TotalSection.propTypes = {
  day: T.string,
  guest: T.number,
  guests: T.number,
  order: T.object,
};
TotalSection.defaultProps = {
  day: '',
  guest: FIRST_GUEST,
  guests: MIN_GUESTS,
  order: {},
};
/* eslint-enable */
