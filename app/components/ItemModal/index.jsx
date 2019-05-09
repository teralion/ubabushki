import React, { useState } from 'react';
import T from 'prop-types';

import ModalWrap from 'app/elements/ModalWrap';
import Image from 'app/elements/Image';
import Counter from 'app/elements/Counter';
import Radio, { RadioGroup } from 'app/elements/Radio';

import cx from 'classnames';
import css from './index.styl';

function updateCounter(nextValue, props) {
  const { id, handleChange } = props;

  const modalElem = document.getElementById(`modal-window-${id}`);
  handleChange(nextValue, { element: modalElem });
}

export default function ItemModal(props) {
  const {
    id,
    url,
    title,
    description,
    countInCart,
    countToAdd,
    handleChange,
    addToCart,
    className,
    ...otherProps
  } = props;

  const [selectedOption, handleOption] = useState(`${title}-1`);

  return (
    <ModalWrap
      shouldLockHtml
      id={`item-modal-${id}`}
      modalId={`modal-window-${id}`}
      className={cx(css.modal, className)}
      iconClassName={css.icon}
      {...otherProps}
    >
      <Image
        id={`image-${id}`}
        alt={title}
        src={url}
        className={css.image}
      />

      <h1 className={css.title}>{title}</h1>
      <div className={css.description}>{description}</div>

      <form>
        <RadioGroup
          name={`${title}-radio-options`}
          selectedValue={selectedOption}
          handleChange={handleOption}
        >
          <Radio
            label={`${title}-1`}
            value={`${title}-1`}
          />
          <Radio
            label={`${title}-2`}
            value={`${title}-2`}
          />
        </RadioGroup>
      </form>

      <Counter
        minValue={0}
        value={countToAdd}
        handleChange={
          nextValue => updateCounter(nextValue, props)
        }
        className={css.counter}
        inputClassName={css.counterInput}
        buttonClassName={css.counterButton}
      />
      <button
        type="button"
        onClick={addToCart}
        className={cx(
          css.addToCartButton,
          { [css.shouldUpdate]: countInCart !== countToAdd },
        )}
      >
        в корзину!
      </button>
    </ModalWrap>
  );
}

ItemModal.propTypes = {
  id: T.oneOfType([T.string, T.number]).isRequired,
  isOpen: T.bool.isRequired,
  handleOpen: T.func,
  countToAdd: T.number,
  handleChange: T.func,
  countInCart: T.number,
  url: T.string,
  title: T.string,
  description: T.string,
  piece: T.number,
  entity: T.string,
  price: T.number,
  addToCart: T.func,
  className: T.string,
};
ItemModal.defaultProps = {
  handleOpen: () => {},
  countToAdd: 0,
  handleChange: () => {},
  countInCart: 0,
  url: '',
  title: '',
  description: '',
  piece: 0,
  entity: 0,
  price: 0,
  addToCart: () => {},
  className: '',
};
