import React, { useState } from "react";
import SignIn from "../SignIn";
import Modal from "react-modal";

const LoginModal = ({ onClose }) => {
  const [modalIsOpen, setIsOpen] = useState(true);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = '#f00';
//   }

  function closeModal() {
    setIsOpen(false);
  }



  return (
        <Modal
            isOpen={modalIsOpen}
           // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
        >
        <SignIn visible={true}></SignIn>
      </Modal>
  );
};

export default LoginModal;
