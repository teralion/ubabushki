import React, { useState } from 'react';

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

export default function CheckoutInputs() {
  const [name, handleName] = useState('');
  const [phone, handlePhone] = useState('');
  const [address, handleAddress] = useState('');
  const [time, handleTime] = useState('');
  const [date, handleDate] = useState('');
  const [comment, handleComment] = useState('');

  const state = {
    name,
    handleName,
    phone,
    handlePhone,
    address,
    handleAddress,
    time,
    handleTime,
    date,
    handleDate,
    comment,
    handleComment,
  };

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
              value={state[id]}
              onChange={e => (
                state[handler]((e.target || {}).value || '')
              )}
              className={css.input}
            />
          </div>
        );
      })}
    </>
  );
}
CheckoutInputs.propTypes = {};
CheckoutInputs.defaultProps = {};
