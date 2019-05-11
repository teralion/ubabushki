import cloneDeep from 'lodash.clonedeep';

export default function order(store) {
  store.on('@init', () => ({ order: {} }));
  store.on('change', (state, { nextOrder }) => ({
    order: nextOrder,
  }));
}

export function changeOrder(dispatch, nextOrder) {
  dispatch('change', { nextOrder });
}

export function updateOrder(state, params) {
  const { dispatch, order: orderState } = state;
  const {
    id,
    guest,
    amount,
    optionId,
    label = '',
  } = params;

  const nextOrder = cloneDeep(orderState);
  if (!nextOrder[guest]) {
    nextOrder[guest] = [];
  }

  const nextOptionId = optionId || null;

  let itemIndex;
  const item = nextOrder[guest].find((v, i) => {
    if (v.id === id) itemIndex = i;
    return v.id === id;
  });

  if (!item && amount > 0) {
    nextOrder[guest].push({
      id,
      label,
      countInCart: amount,
      optionId: nextOptionId,
    });
  } else if (item) {
    item.countInCart = amount;
    item.optionId = nextOptionId;
    item.label = label;
  }

  if (
    amount === 0
    && typeof itemIndex === 'number'
  ) {
    nextOrder[guest].splice(itemIndex, 1);
  }

  if (nextOrder[guest].length === 0) {
    delete nextOrder[guest];
  }

  changeOrder(dispatch, nextOrder);
}
