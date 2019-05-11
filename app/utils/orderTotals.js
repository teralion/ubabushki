import findItem, { findItemOption } from 'app/utils/orderItem';

export function getMansTotal(mansOrder) {
  let total = 0;
  mansOrder.forEach((orderItem) => {
    const { countInCart } = orderItem;

    const fullItem = findItem(orderItem.id, orderItem.label);
    const optionItem = findItemOption(fullItem, orderItem);
    total += (optionItem.price || 0) * countInCart;
  });

  return total;
}

export default function getTotals(whoOrdered, props) {
  const { order } = props;

  const totals = {
    total: 0,
    items: 0,
  };
  whoOrdered.forEach((man) => {
    totals[man] = getMansTotal(order[man]);
    totals.total += totals[man];
    totals.items += order[man].length;
  });

  return totals;
}
