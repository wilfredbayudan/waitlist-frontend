import React, { useEffect } from 'react';
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  left: 50%;
  bottom: ${props => props.active ? '30px' : '-50%'};
  transform: translate(-50%, -50%);
  z-index: ${props => props.active ? '4' : '-1'};
  text-align: center;
  background-color: rgba(255, 255, 255, 1);
  padding: 15px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;  
  transition-duration: 600ms;
  transition-timing-function: ease;
`;

function OverlayModal({ overlayModal, setOverlayModal }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayModal({
        ...overlayModal,
        active: false
      })
    }, 3500)

    return (() => {
      clearTimeout(timer);
    })
  })

  return (
    <Modal active={overlayModal.active}>
      <h3>{overlayModal.title}</h3>
      <p>{overlayModal.message}</p>
    </Modal>
  )
}

export default OverlayModal;