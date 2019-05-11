import React from 'react';
import T from 'prop-types';

import Image from 'app/elements/Image';
import Counter from 'app/elements/Counter';

import getTotals from 'app/utils/orderTotals';
import findItem, { findItemOption } from 'app/utils/orderItem';

import pluralizeWord from 'helpers/pluralizeWord';

import css from './index.styl';

function renderItemMeta(fullItem, orderItem) {
  const { countInCart } = orderItem;

  const itemOption = findItemOption(
    fullItem, orderItem,
  );
  const itemTotalPrice = (
    (itemOption.price || 0) * countInCart
  );

  /* eslint-disable-next-line prefer-destructuring */
  let name = fullItem.name;
  if (itemOption.nameRoot && itemOption.endings) {
    name = pluralizeWord(
      itemOption.nameRoot,
      itemOption.endings,
      countInCart,
    );
  } else if (itemOption.name) {
    /* eslint-disable-next-line prefer-destructuring */
    name = itemOption.name;
  } else if (fullItem.nameRoot && fullItem.endings) {
    name = pluralizeWord(
      fullItem.nameRoot,
      fullItem.endings,
      countInCart,
    );
  }

  const itemData = { ...fullItem, ...itemOption };
  return (
    <>
      {`${itemData.piece} ${itemData.entity}`}
      <span className={css.count}>
        {`✕ 
          ${countInCart} 
          ${name} =
          ${itemTotalPrice} руб. 
        `}
      </span>
    </>
  );
}

export default function OrderList(props) {
  const { order, updateOrder } = props;

  const guests = Object.keys(order).sort();
  const totals = getTotals(guests, { order });

  return guests.map(guest => (
    <div
      key={`guest-${guest}-order-list`}
      className={css.guest}
    >
      <div className={css.guestTitle}>
        {`Гость ${guest}`}
        <span>{`${totals[guest]} руб.`}</span>
      </div>

      <div className={css.separator} />

      {order[guest].map((orderItem) => {
        const {
          id,
          label,
          countInCart,
        } = orderItem;

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
              {title}
              <div className={css.itemCount}>
                {renderItemMeta(fullItem, orderItem)}
              </div>

              <Counter
                minValue={0}
                value={countInCart}
                handleChange={nextValue => updateOrder({
                  id,
                  label,
                  guest,
                  amount: nextValue,
                })}
                className={css.counter}
                inputClassName={css.counterInput}
                buttonClassName={css.counterButton}
              />
            </div>

            <button
              type="button"
              className={css.crossIcon}
              onClick={() => updateOrder({
                id,
                label,
                guest,
                amount: 0,
              })}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  ));
}

/* eslint-disable react/forbid-prop-types */
OrderList.propTypes = {
  order: T.object.isRequired,
  updateOrder: T.func.isRequired,
  isStripesMode: T.bool,
  className: T.string,
};
OrderList.defaultProps = {
  isStripesMode: false,
  className: '',
};
/* eslint-enable */
