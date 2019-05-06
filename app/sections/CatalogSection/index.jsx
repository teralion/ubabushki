import React, { useState } from 'react';
import T from 'prop-types';

import CatalogButton from 'app/elements/CatalogButton';
import ItemsCarousel from 'app/components/ItemsCarousel';

import items from 'helpers/data';

import cx from 'classnames';
import css from './index.styl';

function toggleInput(value, toggler) {
  return function updater() {
    toggler(!value);
  };
}

export default function CatalogSection() {
  const [
    isSoupSectionOpen,
    toggleSoupSection,
  ] = useState(false);
  const [
    isMainSectionOpen,
    toggleMainSection,
  ] = useState(false);
  const [
    isTrimmingsSectionOpen,
    toggleTrimmingsSection,
  ] = useState(false);
  const [
    isSaladsSectionOpen,
    toggleSaladsSection,
  ] = useState(false)
  const [
    isSupplementsSectionOpen,
    toggleSupplementsSection,
  ] = useState(false)

  return (
    <>
      <CatalogButton
        className={cx(css.soupImg, css.section)}
        label="Супы"
        isOpen={isSoupSectionOpen}
        onClick={toggleInput(
          isSoupSectionOpen, toggleSoupSection,
        )}
      />
      <ItemsCarousel
        items={items.soups}
        slideClassName={css.ease}
        className={cx(
          css.section,
          css.transition,
          { [css.transitionClose]: !isSoupSectionOpen },
        )}
      />

      <CatalogButton
        className={cx(css.mainImg, css.section)}
        label="Горячее"
        isOpen={isMainSectionOpen}
        onClick={toggleInput(
          isMainSectionOpen, toggleMainSection,
        )}
      />
      <ItemsCarousel
        items={items.main}
        slideClassName={css.ease}
        className={cx(
          css.section,
          css.transition,
          { [css.transitionClose]: !isMainSectionOpen },
        )}
      />

      <CatalogButton
        className={cx(css.trimmingsImg, css.section)}
        label="Гарниры"
        isOpen={isTrimmingsSectionOpen}
        onClick={toggleInput(
          isTrimmingsSectionOpen, toggleTrimmingsSection,
        )}
      />
      <ItemsCarousel
        items={items.trimmings}
        slideClassName={css.ease}
        className={cx(
          css.section,
          css.transition,
          { [css.transitionClose]: !isTrimmingsSectionOpen },
        )}
      />

      <CatalogButton
        className={cx(css.saladsImg, css.section)}
        label="Салаты"
        isOpen={isSaladsSectionOpen}
        onClick={toggleInput(
          isSaladsSectionOpen, toggleSaladsSection,
        )}
      />
      <ItemsCarousel
        items={items.salads}
        slideClassName={css.ease}
        className={cx(
          css.section,
          css.transition,
          { [css.transitionClose]: !isSaladsSectionOpen },
        )}
      />

      <CatalogButton
        className={cx(css.supplementsImg, css.section)}
        label="Дополнительно"
        isOpen={isSupplementsSectionOpen}
        onClick={toggleInput(
          isSupplementsSectionOpen, toggleSupplementsSection,
        )}
      />
      <ItemsCarousel
        items={items.supplements}
        slideClassName={css.ease}
        className={cx(
          css.section,
          css.transition,
          { [css.transitionClose]: !isSupplementsSectionOpen },
        )}
      />
    </>
  );
}

/* eslint-disable */
CatalogSection.propTypes = {
  className: T.string,
}
CatalogSection.defaultProps = {
  className: '',
}
/* eslint-enable */
