import React, { Fragment, useState, useEffect } from 'react';
import T from 'prop-types';
import cloneDeep from 'lodash.clonedeep';

import CatalogButton from 'app/elements/CatalogButton';
import ItemsCarousel from 'app/components/ItemsCarousel';

import { MIN_GUESTS, FIRST_GUEST } from 'app/pages/Main';
import items, { meta } from 'helpers/data';
import moment from 'helpers/moment';

import cx from 'classnames';
import css from './index.styl';

function toggleInput(value, toggler) {
  return function updater() {
    toggler(!value);
  };
}

function getItems(type, state, props) {
  const { order } = state;
  const { day, guest } = props;

  const dayWeek = moment(day).format('e');

  return (items[type] || []).map((item) => {
    if (!item.dayWeeks.includes(Number(dayWeek))) {
      return false;
    }

    let countInCart = 0;
    if (order[guest]) {
      const itemInCart = order[guest].find(
        v => v.id === item.id,
      );
      if (itemInCart) {
        /* eslint-disable-next-line prefer-destructuring */
        countInCart = itemInCart.countInCart;
      }
    }

    return {
      ...item,
      countInCart,
    };
  }).filter(Boolean);
}

function updateOrder(state, props) {
  return function updateOrderValues(id, amount) {
    const { guest } = props;
    const { order, handleOrder } = state;

    const nextOrder = cloneDeep(order);
    if (!nextOrder[guest]) {
      nextOrder[guest] = [];
    }

    const item = nextOrder[guest].find(v => v.id === id);
    if (!item) {
      nextOrder[guest].push({
        id,
        countInCart: amount,
      });
    } else {
      item.countInCart = amount;
    }

    handleOrder(nextOrder);
  };
}

function renderSections(state, props) {
  const { guest } = props;
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
          key={`guest-${guest}`}
          items={getItems(label, state, props)}
          updateOrder={updateOrder(state, props)}
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

function clearGuests(state, props) {
  const { order, handleOrder } = state;
  const { guests } = props;

  const nextOrder = {};
  const reservedGuests = Object.keys(order);
  reservedGuests.forEach((guestNum) => {
    if (guestNum <= guests) {
      nextOrder[guestNum] = order[guestNum];
    }
  });

  handleOrder(cloneDeep(nextOrder));
}

export default function CatalogSection(props) {
  const { guests } = props;
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
    handleOrder,
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

  useEffect(() => {
    clearGuests(state, props);
  }, [guests]);

  return renderSections(state, props);
}

/* eslint-disable */
CatalogSection.propTypes = {
  className: T.string,
  day: T.string,
  guest: T.number,
  guests: T.number,
}
CatalogSection.defaultProps = {
  className: '',
  day: '',
  guest: FIRST_GUEST,
  guests: MIN_GUESTS,
}
/* eslint-enable */
