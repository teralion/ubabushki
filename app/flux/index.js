import persistState from '@storeon/localstorage';
import createStore from 'storeon';

import isServer from 'helpers/isServer';

import order from './order';
import checkout from './checkout';
import responsive from './responsive';

export default createStore([
  order(),
  checkout(),
  responsive(isServer ? {} : (window.initial || {}).responsive),
  persistState(
    ['order', 'checkout'],
    { key: 'ubabushki' },
  ),
]);
