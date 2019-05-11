import items from 'helpers/data';

export default function findItem(id, label) {
  return items[label].find(v => (v || {}).id === id);
}

export function findItemOption(fullItem, orderItem) {
  if (
    !orderItem.optionId
    || orderItem.optionId === fullItem.id
  ) {
    return fullItem;
  }

  return fullItem.options.find(v => (
    v.id === orderItem.optionId
  )) || {};
}
