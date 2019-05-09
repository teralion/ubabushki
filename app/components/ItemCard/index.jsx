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

function handleCountChange(nextValue, props, rest = {}) {
  const { id, addToCart, countInCart } = props;
  const {
    element,
    shouldHighlight = true,
    optionId = null,
  } = rest;

  if (isServer) return;

  if (shouldHighlight) {
    let elemToHighlight = element;
    if (!elemToHighlight) {
      elemToHighlight = document.getElementById(`item-${id}`);
    }

    if (nextValue > countInCart) {
      touchElem(elemToHighlight, css.inc);
    } else {
      touchElem(elemToHighlight, css.dec);
    }
  }

  return addToCart({ id, optionId, amount: nextValue });
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

  const [isOpen, handleOpen] = useState(false);

  const handleCountChangeFunc = (nextValue, rest) => (
    handleCountChange(nextValue, props, rest)
  );

  const handleOpenFunc = () => handleOpen(true);
  const handleCloseFunc = () => handleOpen(false);

  const shouldShowCounter = countInCart > 0;

  return (
    <div
      id={`item-${id}`}
      className={cx(
        className,
        css.card,
        css.transition,
        { [css.toAdd]: countInCart > 0 },
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


        {shouldShowCounter ? (
          <Counter
            className={css.counter}
            inputClassName={css.input}
            buttonClassName={css.buttons}
            value={countInCart}
            handleChange={handleCountChangeFunc}
          />
        ) : (
          <button
            type="button"
            onClick={() => handleCountChange(1, props)}
            className={cx(
              css.addToCartButton,
              css.transition,
            )}
          >
            в корзину!
          </button>
        )}
      </div>

      <ItemModal
        id={`item-${id}`}
        isOpen={isOpen}
        handleOpen={handleCloseFunc}
        handleChange={handleCountChangeFunc}
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
  optionId: T.number,
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
  optionId: null,
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
  'optionId',
  'countInCart',
];
