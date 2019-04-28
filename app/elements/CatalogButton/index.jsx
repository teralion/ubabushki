import React from 'react';
import T from 'prop-types';

import cx from 'classnames';
import css from './index.styl';

function renderIcon(isOpen) {
  const content = isOpen ? '−' : '+';

  return (
    <span className={css.icon}>
      {content}
    </span>
  );
}

export default function CatalogButton(props) {
  const {
    className,
    onClick,
    label,
    labelCl,
    withIcon,
    isOpen,
    ...otherProps
  } = props;

  return (
    <button
      type="button"
      className={cx(css.button, className)}
      onClick={e => onClick(e.target)}
      {...otherProps}
    >
      {withIcon && renderIcon(isOpen)}
      <h3 className={css.label}>
        {label}
      </h3>
    </button>
  );
}

/* eslint-disable */
CatalogButton.propTypes = {
  withIcon: T.bool,
  isOpen: T.bool,
  className: T.string,
  onClick: T.func,
  label: T.node,
  labelCl: T.string,
}
CatalogButton.defaultProps = {
  withIcon: true,
  isOpen: true,
  label: '',
  className: '',
  labelCl: '',
  onClick: () => {},
}
/* eslint-enable */
