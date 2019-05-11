import React from 'react';
import T from 'prop-types';

import css from './index.styl';

export default function OrderList(props) {
  return (
    <>
      <h1 className={css.header}>
        Оформление заказа
      </h1>
    </>
  );
}
OrderList.propTypes = {
  order: T.object,
  handleOrder: T.func,
};
OrderList.defaultProps = {
  order: {},
  handleOrder: () => {},
};
