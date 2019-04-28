import React from 'react';
import T from 'prop-types';

import {
  isWholeDigitNumber,
  isDigitNumber,
} from 'helpers/numbers';

import cx from 'classnames';
import css from './index.styl';

function onInputChange(e, props) {
  const {
    value,
    handleChange,
    minValue,
    maxValue,
  } = props;

  if (!e) return;
  const v = Number((e.target || {}).value);

  if (
    !isDigitNumber(v)
    || !isWholeDigitNumber(v)
  ) return;

  if (v > maxValue || v < minValue) {
    return handleChange(value);
  }

  return handleChange(v);
}

function incCounter(props) {
  const { value, handleChange, maxValue } = props;

  const nextValue = (value + 1) > maxValue
    ? value
    : value + 1;

  handleChange(nextValue);
}

function decCounter(props) {
  const { value, handleChange, minValue } = props;

  const nextValue = (value - 1) < minValue
    ? value
    : value - 1;

  handleChange(nextValue);
}

export default function Counter(props) {
  const {
    value,
    className,
    maxValue,
    minValue,
  } = props;

  return (
    <div className={cx(css.counter, className)}>
      <button
        type="button"
        onClick={() => incCounter(props)}
        className={cx(
          css.inc,
          { [css.disabled]: value >= maxValue },
        )}
      >
        +
      </button>

      <input
        type="text"
        value={value}
        onChange={e => onInputChange(e, props)}
        className={css.input}
      />

      <button
        type="button"
        onClick={() => decCounter(props)}
        className={cx(
          css.dec,
          { [css.disabled]: value <= minValue },
        )}
      >
        −
      </button>
    </div>
  );
}

/* eslint-disable */
Counter.propTypes = {
  value: T.number,
  minValue: T.number,
  maxValue: T.number,
  handleChange: T.func,
  className: T.string,
}
Counter.defaultProps = {
  value: 0,
  minValue: 0,
  maxValue: 999999,
  handleChange: () => {},
  className: '',
}
/* eslint-enable */
