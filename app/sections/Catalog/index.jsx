import React, {
  Fragment,
  useState,
  useEffect,
} from 'react';
import T from 'prop-types';
import useStoreon from 'storeon/react';
import cloneDeep from 'lodash.clonedeep';

import CatalogButton from 'app/components/CatalogButton';
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
  const { day, guest, order } = props;

  const dayWeek = moment(day).format('e');

  return (items[type] || []).map((item) => {
    if (!item.dayWeeks.includes(Number(dayWeek))) {
      return false;
    }

    let countInCart = 0;
    let optionId = null;
    if (order[guest]) {
      const itemInCart = order[guest].find(
        v => v.id === item.id,
      );
      if (itemInCart) {
        /* eslint-disable-next-line prefer-destructuring */
        countInCart = itemInCart.countInCart;
        /* eslint-disable-next-line prefer-destructuring */
        optionId = itemInCart.optionId;
      }
    }

    return {
      ...item,
      optionId,
      countInCart,
    };
  }).filter(Boolean);
}

function renderSections(state, props) {
  const { guest, day, updateOrder } = props;
  const { isMobile } = state;
  const labels = Object.keys(items);
  const itemsPerSlide = isMobile ? 1 : 3;

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
          key={`guest-${guest}-day-${day}`}
          name={label}
          items={getItems(label, state, props)}
          itemsPerSlide={itemsPerSlide}
          updateOrder={params => (
            updateOrder({ ...params, label })
          )}
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
  const { guests, order, handleOrder } = props;

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
  const {
    responsive: {
      isMobile = false,
    } = {},
  } = useStoreon('responsive');
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
    isMobile,
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
  order: T.object,
  handleOrder: T.func,
  updateOrder: T.func,
}
CatalogSection.defaultProps = {
  className: '',
  day: '',
  guest: FIRST_GUEST,
  guests: MIN_GUESTS,
  order: {},
  handleOrder: () => {},
  updateOrder: () => {},
}
/* eslint-enable */
