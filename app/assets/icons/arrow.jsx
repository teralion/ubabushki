import React from 'react';
import T from 'prop-types';

export default function CartIcon(props) {
  const { className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={className}>
      <polygon fill="#000000" points="8.382 15 11.921 10.753 10.417 9.5 5 16 10.417 22.5 11.921 21.247 8.382 17 27 17 27 15" />
    </svg>
  );
}
CartIcon.propTypes = {
  className: T.string,
};
CartIcon.defaultProps = {
  className: '',
};
