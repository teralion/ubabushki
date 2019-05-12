import React, { useState, useEffect } from 'react';
import T from 'prop-types';

import cx from 'classnames';
import css from './index.styl';

const COORDS = [54.7256072029769, 20.501702567008994];

function addPlacemark(map) {
  const placemark = new ymaps.Placemark(COORDS, {
    placeholder: 'Кафе «У бабушки»',
  }, {
    preset: 'islands#orangeDotIconWithCaption',
    draggable: false,
  });
  map.geoObjects.add(placemark);
}

function initMap(state) {
  return async function init() {
    const {
      handleMap,
      isMapInited,
      handleInitMap,
    } = state;

    const map = new ymaps.Map('map', {
      center: COORDS,
      zoom: 17,
      controls: ['zoomControl'],
    }, {
      suppressMapOpenBlock: true,
    });
    handleMap(map);
    addPlacemark(map);

    if (!isMapInited) {
      handleInitMap(true);
    }
  };
}

export default function Map(props) {
  const { className } = props;
  const [isMapInited, handleInitMap] = useState(false);
  const [map, handleMap] = useState(null);

  const state = {
    map,
    handleMap,
    isMapInited,
    handleInitMap,
  };

  useEffect(() => {
    async function getMap() {
      if (typeof ymaps === 'undefined') return;

      await ymaps.ready(initMap(state));
    }

    getMap();
  }, []);

  return (
    <div className={cx(css.map, className)} id="map" />
  );
}
/* eslint-enable */

Map.propTypes = {
  className: T.string,
};
Map.defaultProps = {
  className: '',
};
