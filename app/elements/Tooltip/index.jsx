import React from 'react';
import T from 'prop-types';

import cx from 'classnames';
import css from './index.styl';

export default function Tooltip(props) {
  const {
    children,
    disabled,
    direction,
    text,
    className,
    tooltipClassName,
    ...otherProps
  } = props;

  const cl = cx(css.main, {
    [className]: className,
  });
  const tooltipCl = cx(css.tooltip, {
    [tooltipClassName]: tooltipClassName,
    [css[direction]]: direction,
  });

  return (
    <div
      className={cl}
      role="presentation"
      tabIndex={-1}
      {...otherProps}
    >
      {children}
      {!disabled && (
        <div className={tooltipCl}>{text}</div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  children: T.node.isRequired,
  disabled: T.bool,
  direction: T.oneOf(['top', 'right', 'bottom', 'left']),
  text: T.oneOfType([T.node, T.string]),
  className: T.string,
  tooltipClassName: T.string,
};
Tooltip.defaultProps = {
  text: '',
  className: '',
  tooltipClassName: '',
  disabled: false,
  direction: 'top',
};
