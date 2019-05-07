import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import CatalogButton from 'app/elements/CatalogButton';
import ItemsCarousel from 'app/components/ItemsCarousel';

import items, { meta } from 'helpers/data';

import cx from 'classnames';
import css from './index.styl';

function toggleInput(value, toggler) {
  return function updater() {
    toggler(!value);
  };
}

function getItems(type, state, props) {
  return items[type]
  // const { order } = state;
  // const { day, guest } = props;
  //
  // return (items[type] || []).map((item) => {
  //   if (item.day !== day) return {};
  //
  //   let countInCart = 0;
  //   if (order[guest]) {
  //     const itemInCart = order[guest].find(
  //       v => v.id === item.id,
  //     );
  //     if (itemInCart) {
  //       /* eslint-disable-next-line prefer-destructuring */
  //       countInCart = itemInCart.countInCart;
  //     }
  //   }
  //
  //   return {
  //     ...item,
  //     countInCart,
  //   };
  // });
}

function updateOrder(props) {
  return function updateOrderValues(id, amount) {
    // countInCart
  };
}

function renderSections(state, props) {
  const labels = Object.keys(items);

  return labels.map((label) => {
    const openState = state[`${label}SectionIsOpen`];
    const toggler = state[`${label}SectionToggle`];
    const classImg = css[`${label}Img`];
    const { name } = meta[label];

    return (
      <Fragment key={label}>
        <CatalogButton
          className={cx(classImg, css.section)}
          label={name}
          isOpen={openState}
          onClick={toggleInput(openState, toggler)}
        />
        <ItemsCarousel
          items={getItems(label, state, props)}
          updateOrder={updateOrder(props)}
          slideClassName={css.ease}
          className={cx(
            css.section,
            css.transition,
            { [css.transitionClose]: !openState },
          )}
        />
      </Fragment>
    );
  });
}

export default function CatalogSection(props) {
  /* eslint-disable-next-line no-unused-vars */
  const [order, handleOrder] = useState({});
  const [
    soupsSectionIsOpen,
    soupsSectionToggle,
  ] = useState(false);
  const [
    mainSectionIsOpen,
    mainSectionToggle,
  ] = useState(false);
  const [
    trimmingsSectionIsOpen,
    trimmingsSectionToggle,
  ] = useState(false);
  const [
    saladsSectionIsOpen,
    saladsSectionToggle,
  ] = useState(false);
  const [
    supplementsSectionIsOpen,
    supplementsSectionToggle,
  ] = useState(false);

  const state = {
    order,
    soupsSectionIsOpen,
    soupsSectionToggle,
    mainSectionIsOpen,
    mainSectionToggle,
    trimmingsSectionIsOpen,
    trimmingsSectionToggle,
    saladsSectionIsOpen,
    saladsSectionToggle,
    supplementsSectionIsOpen,
    supplementsSectionToggle,
  };

  return renderSections(state, props);
}

/* eslint-disable */
CatalogSection.propTypes = {
  className: T.string,
  day: T.string,
  guest: T.number,
}
CatalogSection.defaultProps = {
  className: '',
  day: '',
  guest: 1,
}
/* eslint-enable */
