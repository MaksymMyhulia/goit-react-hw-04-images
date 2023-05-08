import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import {
  ModalBackdrop,
  ModalContent,
  ModalDescr,
  ModalPicture,
} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal ({ onCloseModal, largeImage, tags }) {

  useEffect(() => {
    function handleKeyDown(evt) {
      if (evt.key === 'Escape') {
        console.log(onCloseModal);
        onCloseModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseModal]);


  function handleBackdropeClick(evt) {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  
    return createPortal(
      <ModalBackdrop onClick={handleBackdropeClick}>
        <ModalContent>
          <ModalPicture src={largeImage} alt={tags} />
          <ModalDescr>{tags}</ModalDescr>
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  
};


Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};