import React from 'react';
import T from 'prop-types';

import pick from 'lodash.pick';

import cx from 'classnames';
import css from './index.styl';

const global = {};

function handleInput(e) {
  return (e && e.target)
    ? global.props.handleInput(e.target.value)
    : null;
}

export default function Input(props) {
  global.props = props;

  const {
    value,
    disabled,
    className,
    ...otherProps
  } = props;

  const nativeProps = pick(
    otherProps,
    Input.nativeProps,
  );

  const cl = cx({
    [css.input]: true,
    [css.disabled]: disabled,
    [className]: className,
  });

  return disabled ? (
    <div className={cl}>
      value
    </div>
  ) : (
    <input
      type="text"
      value={`${value}`}
      onChange={handleInput}
      className={cl}
      {...nativeProps}
    />
  );
}

Input.propTypes = {
  value: T.oneOfType([T.string, T.number]),
  handleInput: T.func,
  className: T.string,
  disabled: T.bool,
};
Input.defaultProps = {
  value: '',
  handleInput: () => {},
  disabled: false,
  className: '',
};
Input.nativeProps = [
  'value',
];
