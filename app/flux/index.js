import persistState from '@storeon/localstorage';
import createStore from 'storeon';

import order from './order';
import checkout from './checkout';

export default createStore([
  order,
  checkout,
  persistState(['order', 'checkout'], { key: 'ubabushki' }),
]);
