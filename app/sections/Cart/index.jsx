import React, { useEffect, useState, useRef } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-custom-scrollbars';

import Image from 'app/elements/Image';
import Counter from 'app/elements/Counter';

import ShoppingCart from 'app/assets/icons/shoppingCart';

import pluralizeWord from 'helpers/pluralizeWord';
import isServer from 'helpers/isServer';
import {
  FIRST_GUEST,
  MIN_GUESTS,
  FREE_DELIVERY_FROM,
} from 'app/pages/Main';

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

function getStyles(listRef) {
  if (
    isServer
    || !(listRef || {}).current
  ) {
    return {};
  }

  const params = listRef.current.getBoundingClientRect();
  const scrollbarStyle = {
    width: `${params.width}px`,
    height: `${params.height}px`,
  };

  return {
    style: {},
    scrollbarStyle,
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

function renderOrderList(params, props) {
  const { order, updateOrder } = props;
  const { guests, totals } = params;

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

function handleHover(state) {
  return function onHover() {
    const {
      toggleList,
      handleTimer,
      listVisibilityTimer,
    } = state;

    clearTimeout(listVisibilityTimer);
    handleTimer(setTimeout(() => {
      toggleList(true);
    }, 500));
  };
}

function handleBlur(state) {
  return function onBlur() {
    const {
      toggleList,
      handleTimer,
      listVisibilityTimer,
    } = state;

    clearTimeout(listVisibilityTimer);
    handleTimer(setTimeout(() => {
      toggleList(false);
    }, 800));
  };
}

export default function CartSection(props) {
  const { order, className } = props;

  const [
    shouldShowList,
    toggleList,
  ] = useState(false);
  const [
    listVisibilityTimer,
    handleTimer,
  ] = useState(null);
  const state = {
    toggleList,
    listVisibilityTimer,
    handleTimer,
  };

  const listRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(listVisibilityTimer);
  }, [listVisibilityTimer]);

  const menWhoOrdered = Object.keys(order).sort();
  const isOrder = menWhoOrdered.length > 0;
  const totals = getTotals(menWhoOrdered, props);

  const shouldShowDeliveryLabel = totals.total > 300;
  const isFreeDelivery = totals.total >= FREE_DELIVERY_FROM;
  const buyForFreeDelivery = FREE_DELIVERY_FROM - totals.total;

  const styles = getStyles(listRef);
  const itemsWord = pluralizeWord(
    'блюд', ['о', 'а', ''], totals.items,
  );

  return (
    <div
      className={cx(
        css.wrap, className,
        {
          [css.disabled]: !isOrder,
          [css.show]: shouldShowList,
        },
      )}
    >
      <div
        ref={listRef}
        onFocus={handleHover(state)}
        onMouseOver={handleHover(state)}
        onBlur={handleBlur(state)}
        onMouseOut={handleBlur(state)}
        style={{ ...styles.style }}
        className={css.orderList}
      >
        <Scrollbar style={{ ...styles.scrollbarStyle }}>
          {renderOrderList({
            totals,
            guests: menWhoOrdered,
          }, props)}
        </Scrollbar>
      </div>
      {shouldShowDeliveryLabel && !isFreeDelivery && (
        <div className={css.noteLabel}>
          {`Возьмите еще на ${buyForFreeDelivery} 
          рублей для бесплатной доставки!`}
        </div>
      )}
      {isFreeDelivery && (
        <div className={css.noteLabel}>
          у вас бесплатная доставка
        </div>
      )}
      {/* eslint-disable-next-line */}
      <Link to={totals.items > 0 ? '/checkout' : '#'}>
        <button
          type="button"
          className={css.orderButton}
        >
          {totals.items > 0 ? 'ОФОРМИТЬ' : 'ПУСТО'}
          {' '}
          {totals.items > 0 ? (
            `(${totals.items} ${itemsWord} на 
            ${totals.total} руб.)`
          ) : ''}
        </button>
      </Link>

      <button
        type="button"
        className={css.cartIconWrap}
        onFocus={handleHover(state)}
        onMouseOver={handleHover(state)}
        onBlur={handleBlur(state)}
        onMouseOut={handleBlur(state)}
      >
        <ShoppingCart
          style={{
            width: '30px',
            height: '30px',
          }}
          fill="#3F3B3B"
        />
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
  updateOrder: T.func,
};
CartSection.defaultProps = {
  day: '',
  guest: FIRST_GUEST,
  guests: MIN_GUESTS,
  order: {},
  className: '',
  updateOrder: () => {},
};
/* eslint-enable */
