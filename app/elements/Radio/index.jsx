import React, { createContext, useContext } from 'react';
import T from 'prop-types';

import cx from 'classnames';
import css from './index.styl';

const RadioContext = createContext({
  name: '',
  selectedValue: '',
  handleChange: () => {},
  className: '',
});

export default function Radio(props) {
  const {
    value,
    label,
    ...nativeProps
  } = props;

  const {
    name,
    selectedValue,
    className,
    handleChange,
  } = useContext(RadioContext);

  const isChecked = selectedValue === value;

  return (
    /* eslint-disable-next-line */
    <label className={cx(css.wrap, className)}>
      <div className={css.radio}>
        <div
          className={cx(
            css.dot,
            { [css.checked]: isChecked },
          )}
          {...nativeProps}
        />
      </div>

      <input
        type="radio"
        name={name}
        checked={isChecked}
        aria-checked={isChecked}
        className={css.nativeInput}
        onChange={() => handleChange(value)}
        {...nativeProps}
      />

      {label}
    </label>
  );
}

Radio.propTypes = {
  value: T.oneOfType([
    T.string,
    T.number,
    T.bool,
  ]),
  label: T.oneOfType([T.string, T.node]),
};
Radio.defaultProps = {
  value: false,
  label: '',
};

export function RadioGroup(props) {
  const {
    name,
    selectedValue,
    handleChange,
    children,
    className,
  } = props;

  const context = {
    name,
    selectedValue,
    handleChange,
    className,
  };

  return (
    <RadioContext.Provider value={context}>
      {children}
    </RadioContext.Provider>
  );
}

RadioGroup.propTypes = {
  name: T.string,
  selectedValue: T.oneOfType([
    T.string,
    T.number,
    T.bool,
  ]),
  handleChange: T.func,
  children: T.node.isRequired,
  className: T.string,
};
RadioGroup.defaultProps = {
  name: 'radio-group',
  selectedValue: false,
  handleChange: () => {},
  className: '',
};
