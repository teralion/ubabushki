import React, { useState, useEffect } from 'react';
import T from 'prop-types';

import isServer from 'helpers/isServer';

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

function onItemClick(props, item) {
  return function handleItemClick() {
    const { onSelect, keyName } = props;

    const key = typeof item === 'object'
      ? item[keyName]
      : item;

    onSelect(key);
  };
}

function renderList(props) {
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
        onClick={onItemClick(props, item)}
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
  const { name } = props;
  const [isOpen, toggleOpen] = useState(false);
  useEffect(
    () => closeDropdownEffect(
      props, isOpen, toggleOpen,
    ),
  );

  const value = selectCurrentValue(props);

  return (
    <main>
      <button
        type="button"
        onClick={() => toggleOpen(!isOpen)}
      >
        {value}
      </button>
      { isOpen && (
        <div data-dropdown={name}>
          {renderList(props)}
        </div>
      ) }
    </main>
  );
}

/* eslint-disable */
Dropdown.propTypes = {
  name: T.string.isRequired,
  takeFirst: T.bool,
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
