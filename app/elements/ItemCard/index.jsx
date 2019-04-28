import React, { useState } from 'react';
import T from 'prop-types';

import Counter from 'app/elements/Counter';

import cx from 'classnames';
import css from './index.styl';

export default function ItemCard(props) {
  const {
    img,
    title,
    piece,
    price,
    isInCard,
    addToCard,
  } = props;

  const [countInCard, updateCount] = useState(0);

  return (
    <div className={cx(
      css.card,
      { [css.inCard]: isInCard },
    )}
    >
      <img src={img} alt={title} className={css.img} />

      <span className={css.title}>
        { title }
      </span>

      <div className={css.price}>
        <span className={css.piece}>
          { `${piece} /`}
        </span>
        <span className={css.price}>
          { `${price} р.` }
        </span>
      </div>

      <Counter
        value={countInCard}
        handleChange={updateCount}
        className={css.counter}
      />

      <button
        type="button"
        onClick={addToCard}
        className={css.addToCard}
      >
        в корзину!
      </button>
    </div>
  );
}

/* eslint-disable */
ItemCard.propTypes = {
  title: T.string,
  img: T.string,
  id: T.string,
  piece: T.string,
  price: T.string,
  className: T.string,
  isInCard: T.bool,
  addToCard: T.func,
}
ItemCard.defaultProps = {
  title: '',
  img: '',
  id: '',
  piece: '',
  price: '',
  className: '',
  isInCard: false,
  addToCard: () => {},
}
/* eslint-enable */
