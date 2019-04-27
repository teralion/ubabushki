import React, { useState } from 'react';
import T from 'prop-types';

import Input from 'app/elements/Input';
import Dropdown from 'app/elements/Dropdown';

const MIN_GUESTS = 1;
const FIRST_GUEST = 1;

export default function OrderInputs(props) {
  const { day: initialDay } = props;

  const [day, handleDay] = useState(initialDay);
  const [guests, handleGuests] = useState(MIN_GUESTS);
  const [guest, handleGuest] = useState(FIRST_GUEST);

  return (
    <>
      <Dropdown
        takeFirst
        name="day"
        items={['abc', 'edc', 'eae', 'dsd', 'bfd']}
        selectedItemKey={day}
        onSelect={handleDay}
      />
      <Input
        value={guests}
        handleInput={handleGuests}
      />
      <Dropdown
        takeFirst
        name="guests"
        items={[1, 2, 3, 4, 5]}
        selectedItemKey={guest}
        onSelect={handleGuest}
      />
    </>
  );
}

OrderInputs.propTypes = {
  day: T.string,
};
OrderInputs.defaultProps = {
  day: `${new Date()}`,
};
