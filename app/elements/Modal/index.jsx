import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import T from 'prop-types';

import isServer from 'helpers/isServer';

const ESCAPE_CODE = 27;

function findNode(props) {
  const { id } = props;

  const node = document.getElementById(`modal-${id}`);
  return node || null;
}

function createNode(props) {
  const { id } = props;

  const node = document.createElement('modal');
  node.setAttribute('id', `modal-${id}`);
  document.body.appendChild(node);

  return node;
}

function destroyNode(props) {
  const node = findNode(props);
  if (node !== null) {
    document.body.removeChild(node);
  }
}

function Modal(props) {
  const { children, onClose } = props;

  useEffect(() => {
    function onKeydown(e) {
      if ((e || {}).keyCode === ESCAPE_CODE) {
        onClose();
      }
    }

    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, []);

  let node = findNode(props);
  if (node === null) {
    node = createNode(props);
  }

  return createPortal(children, node);
}

/**
 * @return {null}
 */
export default function ModalController(props) {
  const { isOpen } = props;

  if (isServer) {
    return null;
  }

  useEffect(() => {
    if (!isOpen) {
      destroyNode(props);
    }
  }, [isOpen]);

  return isOpen ? <Modal {...props} /> : null;
}

ModalController.propTypes = {
  id: T.string,
  isOpen: T.bool,
  onClose: T.func,
};
ModalController.defaultProps = {
  id: 'modal',
  isOpen: false,
  onClose: () => {},
};
