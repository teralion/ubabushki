import React, { useState } from 'react';
import T from 'prop-types';

import CatalogButton from 'app/elements/CatalogButton';
import ItemsCarousel from 'app/components/ItemsCarousel';

import items from 'helpers/data';

import cx from 'classnames';
import css from './index.styl';

function toggleInput(value, updater) {
  return updater(!value);
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

  return (
    <>
      <CatalogButton
        className={cx(css.soupImg, css.section)}
        label="Супы"
        isOpen={isSoupSectionOpen}
        onClick={() => (
          toggleInput(isSoupSectionOpen, toggleSoupSection)
        )}
      />
      <ItemsCarousel items={items.soups} />

      <CatalogButton
        className={cx(css.mainImg, css.section)}
        label="Горячее"
        isOpen={isMainSectionOpen}
        onClick={() => (
          toggleInput(isMainSectionOpen, toggleMainSection)
        )}
      />
      <ItemsCarousel items={items.main} />
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
