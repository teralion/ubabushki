import React from 'react';
import T from 'prop-types';

import Counter from 'app/elements/Counter';
import Dropdown from 'app/elements/Dropdown';

import moment from 'helpers/moment';
import {
  MIN_GUESTS,
  FIRST_GUEST,
  DAYS_WINDOW,
} from 'app/pages/Main';

import cx from 'classnames';
import css from './index.styl';

function getDays() {
  const daysElems = [];

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < DAYS_WINDOW; i++) {
    daysElems.push(
      moment().add(i, 'd').format('DD-MM-YYYY'),
    );
  }

  return daysElems;
}

function getGuests(guests) {
  const guestsElems = [];

  /* eslint-disable-next-line no-plusplus */
  for (let i = FIRST_GUEST; i <= guests; i++) {
    guestsElems.push(i);
  }

  return guestsElems;
}

export default function OrderInputs(props) {
  const {
    day,
    handleDay,
    guest,
    handleGuest,
    guests,
    handleGuests,
    className,
  } = props;

  return (
    <div className={cx(css.inputs, className)}>
      <div>
        <div className={css.label}>
          День доставки
        </div>
        <Dropdown
          takeFirst
          name="day"
          items={getDays(props)}
          selectedItemKey={day}
          onSelect={handleDay}
        />
      </div>
      <div>
        <div className={css.label}>
          Количество гостей
        </div>
        <Counter
          minValue={MIN_GUESTS}
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
          items={getGuests(guests, props)}
          selectedItemKey={guest}
          onSelect={handleGuest}
        />
      </div>
    </div>
  );
}

/* eslint-disable */
OrderInputs.propTypes = {
  day: T.string,
  handleDay: T.func,
  guest: T.number,
  handleGuest: T.func,
  guests: T.number,
  handleGuests: T.func,
  className: T.string,
};
OrderInputs.defaultProps = {
  day: `${new Date()}`,
  handleDay: () => {},
  guest: FIRST_GUEST,
  handleGuest: () => {},
  guests: MIN_GUESTS,
  handleGuests: () => {},
  className: '',
};
/* eslint-enable */
