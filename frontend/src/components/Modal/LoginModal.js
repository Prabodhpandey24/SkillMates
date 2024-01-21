import React, { useState } from "react";
import SignIn from "../SignIn";
import Modal from "react-modal";

const LoginModal = ({ onClose }) => {
  const [modalIsOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      width: "50%",
      height: "70%",
      margin: "auto",
      transition: "opacity 0.2s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "30px"
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      transition: "opacity 0.2s ease",
    },
    closeButton: {
      position: "absolute",
      top: "5px",
      right: "10px",
      cursor: "pointer",
      fontSize: "30px",
      borderRadius: "50%",
      transition: "background-color 0.3s ease",
    
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div style={customStyles.closeButton} onClick={closeModal}>
        X
      </div>
      <SignIn visible={true}></SignIn>
    </Modal>
  );
};

export default LoginModal;
