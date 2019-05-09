import React from 'react';
import T from 'prop-types';

import { FIRST_GUEST, MIN_GUESTS } from 'app/pages/Main';
import items from 'helpers/data';
import pluralizeWord from 'helpers/pluralizeWord';

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

function getTotals(whoOrdered, props) {
  const { order } = props;

  const totals = {
    total: 0,
    items: 0,
  };
  whoOrdered.forEach((man) => {
    totals[man] = getMansTotal(order[man]);
    totals.total += totals[man];
    totals.items += order[man].length;
  });

  return totals;
}

function renderMansOrder(params) {
  /* eslint-disable-next-line */
  const { man, i, total } = params;

  const color = i % 2 === 0 ? 'gray' : 'white';
  const className = cx(css.row, {
    [css[`${color}Row`]]: color,
  });

  return (
    <li className={className} key={`man-${man}`}>
      {`Гость ${man}`}
      <span className={css.rowCount}>
        {`${total} руб.`}
      </span>
    </li>
  );
}

export default function TotalSection(props) {
  const { order } = props;

  const menWhoOrdered = Object.keys(order).sort();
  const totals = getTotals(menWhoOrdered, props);
  const itemsWord = pluralizeWord(
    'блюд', ['о', 'а', ''], totals.items,
  );

  return (
    <ul className={css.list}>
      {menWhoOrdered.map((man, i) => (
        renderMansOrder({
          man, i, total: totals[man],
        })
      ))}
      <li className={cx(css.row, css.capital)}>
        {totals.items > 0 ? (
          <>
            <div>
              { 'Итого' }
              <span className={css.small}>
                {`(${totals.items} ${itemsWord} на)`}
              </span>
            </div>
            <span className={css.rowCount}>
              { `${totals.total} руб.` }
            </span>
          </>
        ) : (
          <div className={css.center}>Пусто</div>
        )}
      </li>
    </ul>
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
