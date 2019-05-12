import React from 'react';
import T from 'prop-types';

import cx from 'classnames';
import css from './index.styl';

export default function ConfirmOrder(props) {
  const { shouldSubmit } = props;

  return (
    <button
      type="button"
      onClick={
        shouldSubmit
          ? () => alert('confirmed!')
          : () => {}
      }
      className={cx(
        css.confirmButton,
        !shouldSubmit && css.disabled,
      )}
    >
      отправить заказ!
    </button>
  );
}
ConfirmOrder.propTypes = {
  shouldSubmit: T.bool,
};
ConfirmOrder.defaultProps = {
  shouldSubmit: false,
};
