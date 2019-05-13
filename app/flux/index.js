import persistState from '@storeon/localstorage';
import create from 'storeon';

import order from './order';
import checkout from './checkout';
import responsive from './responsive';

export default function createStore(initial) {
  const {
    order: initialOrder,
    checkout: initialCheckout,
    responsive: initialResponsive,
  } = initial;

  return create([
    order(initialOrder),
    checkout(initialCheckout),
    responsive(initialResponsive),
    persistState(
      ['order', 'checkout'],
      { key: 'ubabushki' },
    ),
  ]);
}
