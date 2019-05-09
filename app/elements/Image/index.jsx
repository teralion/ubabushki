import React, { useState } from 'react';
import T from 'prop-types';

import isServer from 'helpers/isServer';

import cx from 'classnames';

function onLoad(state) {
  return function imageOnLoad() {
    const { isLoaded, handleLoaded } = state;
    return !isLoaded && handleLoaded(true);
  };
}

function onError(state) {
  return function imageOnError() {
    const { isError, handleError } = state;
    return !isError && handleError(true);
  };
}

function getAttributes(state, props) {
  const { isLoaded, isError } = state;
  const {
    src,
    id,
    className,
    ...otherProps
  } = props;

  if (isError || isServer) {
    return {
      ...otherProps,
    };
  }

  if (!isLoaded) {
    return {
      src,
      ...otherProps,
    };
  }

  const imgElem = document.getElementById(`image-${id}`);
  if (
    !imgElem
    || !imgElem.complete
    || imgElem.naturalWidth === 0
  ) {
    return {
      ...otherProps,
    };
  }

  return {
    src,
    ...otherProps,
  };
}

export default function Image(props) {
  const {
    id,
    alt,
    className,
  } = props;

  const [isLoaded, handleLoaded] = useState(false);
  const [isError, handleError] = useState(false);
  const state = {
    isLoaded,
    handleLoaded,
    isError,
    handleError,
  };

  return (
    <img
      id={`image-${id}`}
      alt={alt}
      onLoad={onLoad(state)}
      onError={onError(state)}
      className={cx(className)}
      {...getAttributes(state, props)}
    />
  );
}

Image.propTypes = {
  id: T.string.isRequired,
  alt: T.string.isRequired,
  src: T.string,
  className: T.string,
};
Image.defaultProps = {
  src: '',
  className: '',
};
