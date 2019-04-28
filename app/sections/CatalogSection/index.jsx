import React, { useState } from 'react';
import T from 'prop-types';

import CatalogButton from 'app/elements/CatalogButton';

import css from './index.styl';

function toggleInput(value, updater) {
  return updater(!value);
}

export default function CatalogSection() {
  const [
    isSoupSectionOpen,
    toggleSoupSection,
  ] = useState(false);

  return (
    <>
      <CatalogButton
        className={css.pastaImg}
        label="Гарниры"
        isOpen={isSoupSectionOpen}
        onClick={() => toggleInput(
          isSoupSectionOpen, toggleSoupSection,
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
