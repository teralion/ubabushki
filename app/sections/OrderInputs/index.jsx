import React from 'react';
import T from 'prop-types';

import Counter from 'app/elements/Counter';
import Dropdown from 'app/elements/Dropdown';
import Tooltip from 'app/elements/Tooltip';

import moment, {
  formatDay,
  toISOString,
} from 'helpers/moment';
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
      formatDay(moment().add(i, 'd')),
    );
  }

  return daysElems;
}

function onDaySelect(props) {
  const { handleDay } = props;
  return function updateDay(day) {
    const isoDay = toISOString(day);
    handleDay(isoDay);
  };
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
    guest,
    handleGuest,
    guests,
    handleGuests,
    order,
    className,
  } = props;

  const hideTooltip = Object.keys(order).length === 0;

  return (
    <div className={cx(css.inputs, className)}>
      <div>
        <div className={css.label}>
          День доставки
        </div>
        <Tooltip
          text="В корзине есть товары на выбранный день. Если изменить день, корзина сбросится."
          disabled={hideTooltip}
          className={css.dropdownTooltip}
          tooltipClassName={css.tooltip}
        >
          <Dropdown
            takeFirst
            name="day"
            items={getDays()}
            selectedItemKey={formatDay(day)}
            onSelect={onDaySelect(props)}
          />
        </Tooltip>
      </div>
      <div>
        <div className={css.label}>
          Количество гостей
        </div>
        <Counter
          minValue={MIN_GUESTS}
          value={guests}
          handleChange={handleGuests}
          inputClassName={css.counterInput}
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
  order: T.object,
  className: T.string,
};
OrderInputs.defaultProps = {
  day: `${new Date()}`,
  handleDay: () => {},
  guest: FIRST_GUEST,
  handleGuest: () => {},
  guests: MIN_GUESTS,
  handleGuests: () => {},
  order: {},
  className: '',
};
/* eslint-enable */
