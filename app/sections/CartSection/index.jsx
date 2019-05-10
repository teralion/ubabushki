import React, { useEffect, useRef } from 'react';
import T from 'prop-types';
import Scrollbar from 'react-custom-scrollbars';

import Image from 'app/elements/Image';
import Counter from 'app/elements/Counter';

import { FIRST_GUEST, MIN_GUESTS } from 'app/pages/Main';
import pluralizeWord from 'helpers/pluralizeWord';

import items from 'helpers/data';

import cx from 'classnames';
import css from './index.styl';

function findItem(id, label) {
  return items[label].find(v => (v || {}).id === id);
}

function findItemOption(fullItem, orderItem) {
  if (
    !orderItem.optionId
    || orderItem.optionId === fullItem.id
  ) {
    return fullItem;
  }

  return fullItem.options.find(v => (
    v.id === orderItem.optionId
  )) || {};
}

function getMansTotal(mansOrder) {
  let total = 0;
  mansOrder.forEach((orderItem) => {
    const { countInCart } = orderItem;

    const fullItem = findItem(orderItem.id, orderItem.label);
    const optionItem = findItemOption(fullItem, orderItem);
    total += (optionItem.price || 0) * countInCart;
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

function getStyles() {
  return {
    style: {},
    scrollbarStyle: {},
  };
}

function renderItemMeta(fullItem, orderItem) {
  const { countInCart } = orderItem;

  const itemOption = findItemOption(
    fullItem, orderItem,
  );
  const itemTotalPrice = (
    (itemOption.price || 0) * countInCart
  );

  const nameWithEndings = fullItem.nameRoot
    ? pluralizeWord(
      fullItem.nameRoot,
      fullItem.endings,
      countInCart,
    ) : fullItem.name

  const itemData = { ...fullItem, ...itemOption };
  return (
    <>
      <span className={css.volume}>
        {`
          ${itemData.piece} 
          ${itemData.entity}
        `}
      </span>
      <span className={css.count}>
        {`✕ 
          ${countInCart} 
          ${nameWithEndings} =
          ${itemTotalPrice} руб. 
        `}
      </span>
    </>
  );
}

function renderOrderList(params, props) {
  const { order } = props;
  const { guests, totals } = params;

  return guests.map(guest => (
    <div
      key={`guest-${guest}-order-list`}
      className={css.guest}
    >
      <div>
        {`Гость ${guest}`}
        <span>{`${totals[guest]} руб.`}</span>
      </div>

      <div className={css.separator} />

      {order[guest].map((orderItem) => {
        const { id, label } = orderItem;

        const fullItem = findItem(id, label);
        const { url, title } = fullItem;

        return (
          <div
            key={`guest-${guest}-item-${id}`}
            className={css.itemRow}
          >
            <Image
              src={url}
              alt={title}
              id={`${id}-item-image`}
              className={css.itemImage}
            />

            <div className={css.itemMeta}>
              <div className={css.itemTitle}>
                {title}
              </div>
              <div className={css.itemCount}>
                {renderItemMeta(fullItem, orderItem)}
              </div>
              {/*
              <Counter />
*/}
            </div>

            <span className={css.crossIcon}>
              ✕
            </span>
          </div>
        );
      })}
    </div>
  ));
}

export default function CartSection(props) {
  const { order, className } = props;

  const listRef = useRef(null);

  const menWhoOrdered = Object.keys(order).sort();
  const isOrder = menWhoOrdered.length > 0;
  const totals = getTotals(menWhoOrdered, props);
  const itemsWord = pluralizeWord(
    'блюд', ['о', 'а', ''], totals.items,
  );
  const styles = getStyles();

  return (
    <div
      className={cx(
        css.wrap, className,
        { [css.disabled]: !isOrder },
      )}
    >
      <div
        ref={listRef}
        className={css.orderList}
        style={{ ...styles.style }}
      >
        {/* <Scrollbar style={{ ...styles.scrollbarStyle }}> */}
        {renderOrderList({
          totals,
          guests: menWhoOrdered,
        }, props)}
        {/* </Scrollbar> */}
      </div>
      <button
        type="button"
        className={css.orderButton}
      >
        ЗАКАЗАТЬ
        {' '}
        {totals.items > 0 ? (
          `(${totals.items} ${itemsWord} на 
          ${totals.total} руб.)`
        ) : ''}
      </button>
    </div>
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
