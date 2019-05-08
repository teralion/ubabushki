import React from 'react';
import T from 'prop-types';

import Modal from 'app/elements/Modal';

import cx from 'classnames';
import css from './index.styl';

export default function ModalWrap(props) {
  const {
    id,
    isOpen,
    handleOpen,
    children,
  } = props;

  if (!isOpen) {
    return;
  }

  return (
    <Modal
      id={`modal-wrap-${id}`}
      onClose={handleOpen}
    >
      {/* eslint-disable-next-line */}
      <div className={css.back} onClick={handleOpen} />
      <div className={css.modal}>
        <div className={css.crossIcon}>
          ✕
        </div>
        {children}
      </div>
    </Modal>
  );
}

/* eslint-disable */
ModalWrap.propTypes = {
  id: T.oneOfType([T.string, T.number]).isRequired,
  children: T.node,
  isOpen: T.bool,
  handleOpen: T.func,
  className: T.string,
};
ModalWrap.defaultProps = {
  isOpen: true,
  handleOpen: () => {},
  className: '',
};
/* eslint-enable */
