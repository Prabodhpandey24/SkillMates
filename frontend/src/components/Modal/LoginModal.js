import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SignIn from "../SignIn";
import Modal from "react-modal";

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = '#f00';
//   }

  function closeModal() {
    setIsOpen(false);
  }

  const handleLogin = () => {
    // Add your login logic here
    // You can make an API call, authenticate the user, etc.
    console.log("Logging in with:", username, password);
    onClose();
  };

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
