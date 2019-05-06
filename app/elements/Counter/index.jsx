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

  if (value + 1 > maxValue) return;
  handleChange(value + 1);
}

function decCounter(props) {
  const { value, handleChange, minValue } = props;

  if (value - 1 < minValue) return;
  handleChange(value - 1);
}

export default function Counter(props) {
  const {
    value,
    maxValue,
    minValue,
    className,
    inputClassName,
    buttonClassName,
  } = props;

  return (
    <div className={cx(css.counter, className)}>
      <button
        type="button"
        onClick={() => incCounter(props)}
        className={cx(
          buttonClassName,
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
        className={cx(css.input, inputClassName)}
      />

      <button
        type="button"
        onClick={() => decCounter(props)}
        className={cx(
          buttonClassName,
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
  inputClassName: T.string,
  buttonClassName: T.string,
}
Counter.defaultProps = {
  value: 0,
  minValue: 0,
  maxValue: 999999,
  handleChange: () => {},
  className: '',
  inputClassName: '',
  buttonClassName: '',
}
/* eslint-enable */
