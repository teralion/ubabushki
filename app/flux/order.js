
export default function order(store) {
  store.on('@init', () => ({ order: {} }));
  store.on('change', (state, { nextOrder }) => ({
    order: nextOrder,
  }));
}

export function changeOrder(dispatch, nextOrder) {
  dispatch('change', { nextOrder });
}
