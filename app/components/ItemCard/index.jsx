import React, { useState } from 'react';
import T from 'prop-types';

import Counter from 'app/elements/Counter';

import cx from 'classnames';
import css from './index.styl';

export default function ItemCard(props) {
  const {
    url,
    title,
    piece,
    entity,
    price,
    isInCard,
    addToCard,
    className,
  } = props;

  const [countInCard, updateCount] = useState(0);

  return (
    <div className={cx(
      className,
      css.card,
      { [css.inCard]: isInCard },
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
          value={countInCard}
          handleChange={updateCount}
          className={css.counter}
          inputClassName={css.input}
          buttonClassName={css.buttons}
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
  isInCard: T.bool,
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
  isInCard: false,
  addToCard: () => {},
}
/* eslint-enable */
