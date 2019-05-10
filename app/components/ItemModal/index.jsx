import React, { useState } from 'react';
import T from 'prop-types';
import pick from 'lodash.pick';

import ModalWrap from 'app/elements/ModalWrap';
import Image from 'app/elements/Image';
import Counter from 'app/elements/Counter';
import Radio, { RadioGroup } from 'app/elements/Radio';

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

function updateCounter(nextValue, state, props) {
  const { id, handleChange } = props;
  const { selectedOption } = state;

  const modalElem = document.getElementById(
    `modal-window-${id}`,
  );
  handleChange(nextValue, {
    optionId: selectedOption,
    element: modalElem,
  });
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

export default function ItemModal(props) {
  const {
    id,
    url,
    title,
    optionId,
    description,
    options,
    countInCart,
    handleChange,
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

  const shouldShowCounter = countInCart > 0;

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

      {shouldShowCounter ? (
        <Counter
          minValue={0}
          value={countInCart}
          handleChange={
            nextValue => updateCounter(nextValue, state, props)
          }
          className={css.counter}
          inputClassName={css.counterInput}
          buttonClassName={css.counterButton}
        />
      ) : (
        <button
          type="button"
          onClick={
            () => updateCounter(1, state, props)
          }
          className={css.addToCartButton}
        >
          в корзину!
        </button>
      )}
    </ModalWrap>
  );
}

ItemModal.propTypes = {
  id: T.number.isRequired,
  isOpen: T.bool.isRequired,
  optionId: T.number,
  handleOpen: T.func,
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
  className: T.string,
};
ItemModal.defaultProps = {
  handleOpen: () => {},
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
  className: '',
};
