import React, { useEffect } from 'react';
import T from 'prop-types';

import Modal from 'app/elements/Modal';

import isServer from 'helpers/isServer';

import cx from 'classnames';
import css from './index.styl';

function lockHtml() {
  if (isServer) return;

  const html = document.querySelector('html');
  html.classList.add('lock');
}

function unlockHtml() {
  if (isServer) return;

  const html = document.querySelector('html');
  html.classList.remove('lock');
}

export default function ModalWrap(props) {
  const {
    id,
    isOpen,
    modalId,
    handleOpen,
    shouldLockHtml,
    children,
    className,
    backClassName,
    iconClassName,
  } = props;

  useEffect(() => {
    if (shouldLockHtml && isOpen) {
      lockHtml();
    }

    return () => {
      if (shouldLockHtml) {
        unlockHtml();
      }
    };
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOpen}
      id={`modal-wrap-${id}`}
    >
      {/* eslint-disable-next-line */}
      <div
        className={cx(css.back, backClassName)}
        onClick={handleOpen}
      />
      <div
        className={cx(css.modal, className)}
        id={modalId || `modal-window-${id}`}
      >
        <div className={cx(css.crossIcon, iconClassName)}>
          ✕
        </div>
        {children}
      </div>
    </Modal>
  );
}

ModalWrap.propTypes = {
  id: T.oneOfType([T.string, T.number]).isRequired,
  children: T.node.isRequired,
  isOpen: T.bool.isRequired,
  modalId: T.string,
  shouldLockHtml: T.bool,
  handleOpen: T.func,
  className: T.string,
  backClassName: T.string,
  iconClassName: T.string,
};
ModalWrap.defaultProps = {
  handleOpen: () => {},
  shouldLockHtml: true,
  modalId: '',
  className: '',
  backClassName: '',
  iconClassName: '',
};
