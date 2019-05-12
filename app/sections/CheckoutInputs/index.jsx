import React from 'react';
import T from 'prop-types';

import Radio, { RadioGroup } from 'app/elements/Radio';

import cx from 'classnames';
import css from './index.styl';

const inputs = [
  {
    id: 'name',
    handler: 'handleName',
    label: 'Ваше имя',
    type: 'text',
  },
  {
    id: 'phone',
    handler: 'handlePhone',
    label: 'Телефон',
    type: 'text',
  },
  {
    id: 'address',
    handler: 'handleAddress',
    label: 'Адрес доставки',
    type: 'text',
  },
  {
    id: 'time',
    handler: 'handleTime',
    label: 'Время',
    type: 'time',
  },
  {
    id: 'date',
    handler: 'handleDate',
    label: 'Дата',
    type: 'date',
  },
  {
    id: 'comment',
    handler: 'handleComment',
    label: 'Комментарий',
    type: 'text',
  },
];

export default function CheckoutInputs(props) {
  /* eslint-disable */
  const {
    payment,
    handlePayment,
    delivery,
    handleDelivery,
  } = props;
  /* eslint-enable */

  return (
    <>
      {inputs.map((input) => {
        const {
          id,
          label,
          handler,
          type,
        } = input;

        return (
          <div
            key={id}
            className={css.inputBlock}
          >
            <div className={css.label}>
              { label }
            </div>
            <input
              type={type}
              value={props[id]}
              onChange={e => (
                props[handler]((e.target || {}).value || '')
              )}
              className={css.input}
            />
          </div>
        );
      })}

      <div className={css.radioGroup}>
        <div className={cx(css.label, css.radioLabel)}>
          Оплата
        </div>
        <RadioGroup
          name="payment-radio-group"
          selectedValue={payment}
          handleChange={handlePayment}
          className={css.radioButton}
        >
          <Radio
            value="cash"
            label={(
              <div className={css.option}>
                картой онлайн
              </div>
            )}
          />
          <Radio
            value="courier"
            label={(
              <div className={css.option}>
                наличными курьеру
              </div>
            )}
          />
        </RadioGroup>
      </div>

      <div className={css.radioGroup}>
        <div className={cx(css.label, css.radioLabel)}>
          Доставка
        </div>
        <RadioGroup
          name="delivery-radio-group"
          selectedValue={delivery}
          handleChange={handleDelivery}
          className={css.radioButton}
        >
          <Radio
            value="courier"
            label={(
              <div className={css.option}>
                курьерская доставка
              </div>
            )}
          />
          <Radio
            value="pickup"
            label={(
              <div className={css.option}>
                самовывоз из кафе
              </div>
            )}
          />
        </RadioGroup>
      </div>
    </>
  );
}
/* eslint-disable */
CheckoutInputs.propTypes = {
  name: T.string,
  handleName: T.func.isRequired,
  phone: T.string,
  handlePhone: T.func.isRequired,
  address: T.string,
  handleAddress: T.func.isRequired,
  time: T.string,
  handleTime: T.func.isRequired,
  date: T.string,
  handleDate: T.func.isRequired,
  comment: T.string,
  handleComment: T.func.isRequired,
  payment: T.string,
  handlePayment: T.func.isRequired,
  delivery: T.string,
  handleDelivery: T.func.isRequired,
};
CheckoutInputs.defaultProps = {
  name: '',
  phone: '',
  address: '',
  time: '',
  date: '',
  comment: '',
  payment: '',
  delivery: '',
};
/* eslint-enable */
