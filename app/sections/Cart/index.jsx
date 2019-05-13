import React, { useEffect, useState, useRef } from 'react';
import T from 'prop-types';
import useStoreon from 'storeon/react';
import { Link } from 'react-router-dom';
import Scrollbar from 'react-custom-scrollbars';

import OrderList from 'app/components/OrderList';

import ShoppingCart from 'app/assets/icons/shoppingCart';

import getTotals from 'app/utils/orderTotals';

import pluralizeWord from 'helpers/pluralizeWord';
import isServer from 'helpers/isServer';
import {
  FIRST_GUEST,
  MIN_GUESTS,
  FREE_DELIVERY_FROM,
} from 'app/pages/Main';

import cx from 'classnames';
import css from './index.styl';

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
  const { order, className, updateOrder } = props;

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
  const {
    responsive: {
      isMobile = false,
    } = {},
  } = useStoreon('responsive');

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
          <OrderList
            order={order}
            updateOrder={updateOrder}
          />
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
          style={isMobile ? {
            width: '24px',
            height: '24px',
          } : {
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
