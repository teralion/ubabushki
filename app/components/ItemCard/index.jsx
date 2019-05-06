import React, { useState } from 'react';
import T from 'prop-types';

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

function handleCountChange(nextValue, state, props) {
  const { id } = props;
  const { countInCard, updateCount } = state;

  if (isServer()) return;

  const elem = document.getElementById(`item-${id}`);
  if (elem) {
    if (nextValue > countInCard) {
      touchElem(elem, css.inc);
    } else {
      touchElem(elem, css.dec);
    }
  }

  return updateCount(nextValue);
}

export default function ItemCard(props) {
  const {
    id,
    url,
    title,
    piece,
    entity,
    price,
    addToCard,
    className,
  } = props;

  const [countInCard, updateCount] = useState(0);
  const state = {
    countInCard,
    updateCount,
  };

  return (
    /* eslint-disable-next-line */
    <div
      id={`item-${id}`}
      className={cx(
        className,
        css.card,
        { [css.inCart]: countInCard > 0 },
      )}
    >
      <img
        src={url}
        alt={title}
        className={css.image}
      />

      <div className={css.content}>
        <span className={css.title}>
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
          value={countInCard}
          handleChange={nextValue => (
            handleCountChange(nextValue, state, props)
          )}
        />

        <button
          type="button"
          onClick={addToCard}
          className={css.addToCardButton}
        >
          в корзину!
        </button>
      </div>
    </div>
  );
}

/* eslint-disable */
ItemCard.propTypes = {
  title: T.string,
  url: T.string,
  id: T.number,
  piece: T.number,
  entity: T.string,
  price: T.number,
  className: T.string,
  isInCart: T.bool,
  addToCard: T.func,
}
ItemCard.defaultProps = {
  title: '',
  url: '',
  id: undefined,
  piece: undefined,
  entity: 'шт.',
  price: undefined,
  className: '',
  isInCart: false,
  addToCard: () => {},
}
/* eslint-enable */
