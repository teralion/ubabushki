
const prefix = 'responsive';
const t = {
  change: `${prefix}/change`,
};

const defaultResponsive = {
  isMobile: false,
};

export default function initResponsive(initialResponsive) {
  return function responsive(store) {
    store.on('@init', () => ({
      responsive: initialResponsive || defaultResponsive,
    }));
    store.on(t.responsive, (isMobile, { nextResponsive = {} }) => ({
      responsive: { ...nextResponsive },
    }));
  };
}

export function changeResponsive(dispatch, nextResponsive) {
  dispatch(t.responsive, { nextResponsive });
}
