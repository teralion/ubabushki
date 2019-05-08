import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import T from 'prop-types';

import isServer from 'helpers/isServer';

const ESCAPE_KEY_CODE = 27;

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

export default function Modal(props) {
  const { children } = props;

  if (isServer) {
    return;
  }

  useEffect(() => {
    function handleKeydown(event) {
      if (event.keyCode === ESCAPE_KEY_CODE) {
        props.onClose();
      }
    }

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  useEffect(() => () => { destroyNode(props); });

  let node = findNode(props);
  if (node === null) {
    node = createNode(props);
  }

  return createPortal(children, node);
}

Modal.propTypes = {
  id: T.string,
  onClose: T.func,
};
Modal.defaultProps = {
  id: 'modal',
  onClose: () => {},
};
