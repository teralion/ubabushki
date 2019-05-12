
export default function checkout(store) {
  store.on('@init', () => ({
    checkout: {
      name: '',
      phone: '',
      address: '',
      time: '',
      date: '',
      comment: '',
      payment: 'cash',
      delivery: 'courier',
    },
  }));
  store.on('changeCheckout', (state, { key, value }) => ({
    ...state,
    checkout: {
      ...state.checkout,
      [key]: value,
    },
  }));
}

export function changeCheckout(dispatch, key, value) {
  dispatch('changeCheckout', { key, value });
}
