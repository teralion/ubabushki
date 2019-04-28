import React, { useState } from 'react';
import T from 'prop-types';

import Counter from 'app/elements/Counter';
import Dropdown from 'app/elements/Dropdown';

import cx from 'classnames';
import css from './index.styl';

const MIN_GUESTS = 1;
const FIRST_GUEST = 1;

export default function OrderInputs(props) {
  const { day: initialDay, className } = props;

  const [day, handleDay] = useState(initialDay);
  const [guests, handleGuests] = useState(MIN_GUESTS);
  const [guest, handleGuest] = useState(FIRST_GUEST);

  return (
    <div className={cx(css.inputs, className)}>
      <div>
        <div className={css.label}>
          День доставки
        </div>
        <Dropdown
          takeFirst
          name="day"
          items={['abc', 'edc', 'eae', 'dsd', 'bfd']}
          selectedItemKey={day}
          onSelect={handleDay}
        />
      </div>
      <div>
        <div className={css.label}>
          Количество гостей
        </div>
        <Counter
          value={guests}
          handleChange={handleGuests}
        />
      </div>
      <div>
        <div className={css.label}>
          Заказ для гостя
        </div>
        <Dropdown
          takeFirst
          name="guests"
          items={[1, 2, 3, 4, 5]}
          selectedItemKey={guest}
          onSelect={handleGuest}
        />
      </div>
    </div>
  );
}

OrderInputs.propTypes = {
  day: T.string,
  className: T.string,
};
OrderInputs.defaultProps = {
  day: `${new Date()}`,
  className: '',
};
