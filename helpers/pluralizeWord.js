import curry from 'lodash.curry';

export default curry((word, endings, num) => {
  const number = Math.abs(num);
  const mod10 = number % 10;
  const mod100 = number % 100;
  let idx = 2;

  if (mod10 === 1 && mod100 !== 11) {
    idx = 0;
  }

  if (mod10 > 1 && mod10 < 5 && (mod100 < 10 || mod100 >= 20)) {
    idx = 1;
  }

  return word + endings[idx];
}, 3);
