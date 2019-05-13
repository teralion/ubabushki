
const prefix = 'checkout';
const t = {
  change: `${prefix}/change`,
};

const defaultCheckout = {
  name: '',
  phone: '',
  address: '',
  time: '',
  date: '',
  comment: '',
  payment: 'cash',
  delivery: 'courier',
};

export default function initCheckout(initialCheckout) {
  return function checkout(store) {
    store.on('@init', () => ({
      checkout: initialCheckout || defaultCheckout,
    }));
    store.on(t.checkout, (state, { key, value }) => ({
      ...state,
      checkout: {
        ...state.checkout,
        [key]: value,
      },
    }));
  };
}

export function changeCheckout(dispatch, key, value) {
  dispatch(t.checkout, { key, value });
}
