import React, { useState, useEffect } from 'react';
import T from 'prop-types';

import isServer from 'helpers/isServer';

import cx from 'classnames';
import css from './index.styl';

function selectCurrentValue(props) {
  const {
    items,
    valueName,
    takeFirst,
    keyName,
    selectedItemKey,
  } = props;

  const foundedItem = items.find((item) => {
    if (typeof item === 'object') {
      return item[keyName] === item[selectedItemKey];
    }

    return item === selectedItemKey;
  });

  if (!foundedItem) {
    return takeFirst ? items[0] : null;
  }

  return typeof foundedItem === 'object'
    ? foundedItem[valueName]
    : foundedItem;
}

function onItemClick(item, props, state) {
  return function handleItemClick() {
    const { isOpen, changeOpen } = state;
    const {
      onSelect,
      keyName,
      shouldCloseOnClick,
    } = props;

    const key = typeof item === 'object'
      ? item[keyName]
      : item;

    onSelect(key);
    if (shouldCloseOnClick && isOpen) changeOpen(false);
  };
}

function renderList(props, state) {
  const {
    items,
    keyName,
    valueName,
  } = props;

  return items.map((item, idx) => {
    let key;
    let value;

    if (typeof item === 'object') {
      key = item[keyName];
      value = item[valueName];
    } else {
      key = idx;
      value = item;
    }

    return (
      <button
        type="button"
        key={`${key}-${value}`}
        onClick={onItemClick(item, props, state)}
        className={css.item}
      >
        {value}
      </button>
    );
  });
}

function closeDropdownEffect(props, value, updater) {
  if (isServer()) return;

  function handleClose(e) {
    const { name } = props;

    if (!e) return;
    if (e.target.closest(`[data-dropdown=${name}]`)) return;

    return value ? updater(!value) : null;
  }

  document.addEventListener('click', handleClose);

  return function cleanup() {
    document.removeEventListener('click', handleClose);
  };
}

export default function Dropdown(props) {
  const { name, disabled, withIcon } = props;

  const [isOpen, changeOpen] = useState(false);
  const state = { isOpen, changeOpen };

  useEffect(
    () => closeDropdownEffect(
      props, isOpen, changeOpen,
    ),
  );

  const value = selectCurrentValue(props);

  return (
    <div className={css.wrap}>
      <button
        type="button"
        onClick={() => changeOpen(!isOpen)}
        className={cx(
          css.dropdown,
          { [css.disabled]: disabled },
        )}
      >
        {value}
        {withIcon && (
          <span
            className={cx(
              css.icon,
              { [css.open]: isOpen },
            )}
          />
        )}
      </button>
      { isOpen && (
        <div
          data-dropdown={name}
          className={css.list}
        >
          {renderList(props, state)}
        </div>
      ) }
    </div>
  );
}

/* eslint-disable */
Dropdown.propTypes = {
  name: T.string.isRequired,
  takeFirst: T.bool,
  shouldCloseOnClick: T.bool,
  withIcon: T.bool,
  items: T.array,
  keyName: T.oneOfType([T.string, T.number]),
  valueName: T.oneOfType([T.string, T.number]),
  selectedItemKey: T.oneOfType([T.string, T.number]),
  placeholder: T.string,
  disabled: T.bool,
  onSelect: T.func,
  className: T.string,
};
Dropdown.defaultProps = {
  takeFirst: false,
  shouldCloseOnClick: true,
  withIcon: true,
  items: [],
  keyName: '',
  valueName: '',
  selectedItemKey: '',
  placeholder: '',
  onSelect: () => {},
  className: '',
  disabled: false,
};
/* eslint-enable */
