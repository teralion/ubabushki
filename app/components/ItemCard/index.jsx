import React, { useState } from 'react';
import T from 'prop-types';
import pick from 'lodash.pick';

import ItemModal from 'app/components/ItemModal';
import Counter from 'app/elements/Counter';

import isServer from 'helpers/isServer';

import cx from 'classnames';
import css from './index.styl';

function touchElem(elem, className) {
  elem.classList.add(className);
  setTimeout(() => {
    elem.classList.remove(className);
  }, 300);
}

function handleCountChange(
  nextValue,
  state,
  props,
  rest = {},
) {
  const { id, addToCart } = props;
  const { countToAdd, updateCount } = state;
  const { element, shouldHighlight = true } = rest;

  if (isServer) return;

  if (shouldHighlight) {
    let elemToHighlight = element;
    if (!elemToHighlight) {
      elemToHighlight = document.getElementById(`item-${id}`);
    }

    if (nextValue > countToAdd) {
      touchElem(elemToHighlight, css.inc);
    } else {
      touchElem(elemToHighlight, css.dec);
    }
  }

  if (nextValue === 0) {
    addToCart(id, 0);
  }

  return updateCount(nextValue);
}

function updateCart(state, props) {
  const { countToAdd, updateCount } = state;
  const { id, addToCart } = props;

  if (countToAdd === 0) {
    updateCount(1);
  }

  addToCart(id, countToAdd > 0 ? countToAdd : 1);
}

export default function ItemCard(props) {
  const {
    id,
    url,
    title,
    piece,
    entity,
    price,
    countInCart,
    className,
  } = props;

  const [countToAdd, updateCount] = useState(countInCart);
  const [isOpen, handleOpen] = useState(false);
  const state = {
    countToAdd,
    updateCount,
  };

  const handleCountChangeFunc = (nextValue, rest) => (
    handleCountChange(nextValue, state, props, rest)
  );

  const updateCartFunc = () => updateCart(state, props);

  const handleOpenFunc = () => handleOpen(true);
  const handleCloseFunc = () => handleOpen(false);

  return (
    <div
      id={`item-${id}`}
      className={cx(
        className,
        css.card,
        css.transition,
        { [css.toAdd]: countToAdd > 0 },
      )}
    >
      {/* eslint-disable-next-line */}
      <img
        src={url}
        alt={title}
        className={css.image}
        onClick={handleOpenFunc}
      />

      <div className={css.content}>
        {/* eslint-disable-next-line */}
        <span
          className={css.title}
          onClick={handleOpenFunc}
        >
          { title }
        </span>

        <div className={css.amount}>
          <span className={css.piece}>
            { `${piece} ${entity} /`}
          </span>
          <span className={css.price}>
            { `${price} р.` }
          </span>
        </div>

        <Counter
          className={css.counter}
          inputClassName={css.input}
          buttonClassName={css.buttons}
          value={countToAdd}
          handleChange={handleCountChangeFunc}
        />

        <button
          type="button"
          onClick={updateCartFunc}
          className={cx(
            css.addToCartButton,
            css.transition,
            { [css.shouldUpdate]: countInCart !== countToAdd },
          )}
        >
          в корзину!
        </button>
      </div>

      <ItemModal
        id={`item-${id}`}
        isOpen={isOpen}
        handleOpen={handleCloseFunc}
        countToAdd={countToAdd}
        handleChange={handleCountChangeFunc}
        addToCart={updateCartFunc}
        className={css.transition}
        {...pick(props, ItemCard.itemProps)}
      />
    </div>
  );
}

ItemCard.propTypes = {
  title: T.string,
  url: T.string,
  id: T.number,
  piece: T.number,
  entity: T.string,
  name: T.string,
  price: T.number,
  options: T.array,
  className: T.string,
  countInCart: T.number,
  addToCart: T.func,
};
ItemCard.defaultProps = {
  title: '',
  url: '',
  id: undefined,
  piece: undefined,
  entity: 'шт.',
  name: 'порция',
  price: undefined,
  options: [],
  className: '',
  countInCart: 0,
  addToCart: () => {},
};
ItemCard.itemProps = [
  'title',
  'description',
  'url',
  'id',
  'piece',
  'entity',
  'name',
  'price',
  'options',
  'countInCart',
];
