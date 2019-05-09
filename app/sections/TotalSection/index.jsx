import React from 'react';
import T from 'prop-types';

import { FIRST_GUEST, MIN_GUESTS } from 'app/pages/Main';

import cx from 'classnames';
import css from './index.styl';

function getTotal(mansOrder) {
  return 0;
}

function renderMansOrder(params, props) {
  /* eslint-disable-next-line */
  const { order } = props;
  const { man, i } = params;

  const total = getTotal(order[man]);

  const color = i % 2 === 0 ? 'gray' : 'white';
  const className = cx(css.row, {
    [css[`${color}Row`]]: color,
  });

  return (
    <div className={className} key={`man-${man}`}>
      <span>{`Гость ${man}`}</span>
      <div>{`${total} руб.`}</div>
    </div>
  );
}

export default function TotalSection(props) {
  const { order } = props;

  const menWhoOrdered = Object.keys(order).sort();
  return (
    <>
      {menWhoOrdered.map((man, i) => (
        renderMansOrder({ man, i }, props)
      ))}
    </>
  );
}

/* eslint-disable */
TotalSection.propTypes = {
  day: T.string,
  guest: T.number,
  guests: T.number,
  order: T.object,
}
TotalSection.defaultProps = {
  day: '',
  guest: FIRST_GUEST,
  guests: MIN_GUESTS,
  order: {},
}
/* eslint-enable */
