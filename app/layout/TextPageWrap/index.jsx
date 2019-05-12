import React from 'react';
import T from 'prop-types';

import ContactInfo from 'app/sections/ContactInfo';
import Header from 'app/sections/Header';

import cx from 'classnames';
import css from './index.styl';

export default function TextPageWrap(props) {
  const {
    children,
    className,
    ...restProps
  } = props;

  return (
    <>
      <ContactInfo />
      <Header {...restProps} />

      <main className={cx(css.main, className)}>
        { children }
      </main>
    </>
  );
}

TextPageWrap.propTypes = {
  children: T.node.isRequired,
  className: T.string,
};
TextPageWrap.defaultProps = {
  className: '',
};
