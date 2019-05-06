import React, { useState } from 'react';
import T from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import ItemCard from 'app/components/ItemCard';

import cx from 'classnames';
import css from './index.styl';

function renderSlides(items, state, props) {
  const { itemsPerSlide } = props;
  const { slidesAmount } = state;

  const slides = [];

  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < slidesAmount; i++) {
    const startItemIndex = i * itemsPerSlide;
    const endItemIndex = startItemIndex + itemsPerSlide;

    slides.push(
      <div className={css.slide} key={`slide-${i}`}>
        {items.slice(startItemIndex, endItemIndex).map(item => (
          <ItemCard
            key={`${item.title}-${item.id}`}
            {...item}
          />
        ))}
      </div>,
    );
  }

  return slides;
}

function updateIndex(nextIndex, state) {
  const {
    changeIndex,
    slidesAmount,
  } = state;

  if (nextIndex >= slidesAmount) {
    return changeIndex(0);
  }

  if (nextIndex < 0) {
    return changeIndex(slidesAmount - 1);
  }

  return changeIndex(nextIndex);
}

export default function ItemsCarousel(props) {
  const { items, itemsPerSlide } = props;
  const [index, changeIndex] = useState(0);

  const slidesAmount = Math.ceil(items.length / itemsPerSlide);
  const state = {
    index,
    changeIndex,
    slidesAmount,
  };

  const updateIndexFunc = nextIndex => () => (
    updateIndex(nextIndex, state, props)
  );

  return (
    <div className={css.slider}>
      <button
        type="button"
        className={cx(css.prev, css.control)}
        onClick={updateIndexFunc(index - 1)}
      >
        <div className={css.icon}>←</div>
      </button>

      <SwipeableViews
        index={index}
        onChangeIndex={nextIndex => (
          updateIndex(nextIndex, state, props)
        )}
      >
        {renderSlides(items, state, props)}
      </SwipeableViews>

      <button
        type="button"
        className={cx(css.next, css.control)}
        onClick={updateIndexFunc(index + 1)}
      >
        <div className={css.icon}>→</div>
      </button>
    </div>
  );
}

/* eslint-disable */
ItemsCarousel.propTypes = {
  name: T.string,
  items: T.array,
  itemsPerSlide: T.number,
  className: T.string,
}
ItemsCarousel.defaultProps = {
  name: '',
  items: [],
  itemsPerSlide: 3,
  className: '',
}
/* eslint-enable */
