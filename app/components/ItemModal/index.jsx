import React, { useState } from 'react';
import T from 'prop-types';

import ModalWrap from 'app/elements/ModalWrap';
import Image from 'app/elements/Image';
import Counter from 'app/elements/Counter';
import Radio, { RadioGroup } from 'app/elements/Radio';

import pick from 'lodash.pick';

import cx from 'classnames';
import css from './index.styl';

const INITIAL_OPTION_INDEX = 0;

const rowValues = [
  'id',
  'name',
  'piece',
  'entity',
  'price',
];

function updateCounter(nextValue, props) {
  const { id, handleChange } = props;

  const modalElem = document.getElementById(`modal-window-${id}`);
  handleChange(nextValue, { element: modalElem });
}

function renderOptionRow(data) {
  const {
    id,
    name,
    price,
    piece,
    entity,
  } = data;

  return (
    <div
      key={`${name}-row-${id}`}
      className={css.optionRow}
    >
      <span>
        {name}
      </span>
      <div className={css.params}>
        <span className={css.volume}>
          {`${piece} ${entity} /`}
        </span>
        <span className={css.price}>
          {`${price} р.`}
        </span>
      </div>
    </div>
  );
}

function renderOptions(state, props) {
  const { id, options } = props;

  const optionsToRender = options.length > 0
    ? options
    : [{}];

  return optionsToRender.map((option) => {
    const data = {
      ...pick(props, rowValues),
      ...pick(option, rowValues),
    };

    const radioId = option.id || id;
    return (
      <Radio
        key={`radio-option-${radioId}`}
        value={radioId}
        label={renderOptionRow(data)}
      />
    );
  });
}

function updateCart(state, props) {
  return function onCartUpdate() {
    const { selectedOption } = state;
    const { addToCart } = props;

    addToCart({
      optionId: selectedOption,
    });
  };
}

export default function ItemModal(props) {
  const {
    id,
    url,
    title,
    optionId,
    description,
    options,
    countInCart,
    countToAdd,
    handleChange,
    addToCart,
    className,
    ...otherProps
  } = props;

  const [
    selectedOption,
    handleOption,
  ] = useState(
    optionId
    || (options[INITIAL_OPTION_INDEX] || {}).id
    || id,
  );

  const state = {
    selectedOption,
    handleOption,
  };

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

      <form className={css.optionsForm}>
        <RadioGroup
          name={`${title}-radio-options`}
          selectedValue={selectedOption}
          handleChange={handleOption}
          className={css.radioOption}
        >
          {renderOptions(state, props)}
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
        onClick={updateCart(state, props)}
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
  id: T.number.isRequired,
  isOpen: T.bool.isRequired,
  optionId: T.number,
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
  /* eslint-disable-next-line react/forbid-prop-types */
  options: T.array,
  name: T.string,
  addToCart: T.func,
  className: T.string,
};
ItemModal.defaultProps = {
  handleOpen: () => {},
  countToAdd: 0,
  handleChange: () => {},
  countInCart: 0,
  optionId: null,
  url: '',
  title: '',
  description: '',
  piece: 0,
  entity: 0,
  name: 'порция',
  price: 0,
  options: [],
  addToCart: () => {},
  className: '',
};
