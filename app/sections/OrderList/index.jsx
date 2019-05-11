import React from 'react';
import T from 'prop-types';

import ItemsList from 'app/components/OrderList';

import css from './index.styl';

export default function OrderList(props) {
  const {
    order,
    updateOrder,
  } = props;

  return (
    <>
      <h1 className={css.header}>
        Оформление заказа
      </h1>

      <div className={css.itemsList}>
        <ItemsList
          isStripesMode
          mode="section"
          order={order}
          updateOrder={updateOrder}
        />
      </div>
    </>
  );
}
OrderList.propTypes = {
  order: T.object,
  updateOrder: T.func,
};
OrderList.defaultProps = {
  order: {},
  updateOrder: () => {},
};
