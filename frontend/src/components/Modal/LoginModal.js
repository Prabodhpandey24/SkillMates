import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const navigate = useNavigate();
    const loginData = async () => {
        // setLoading(true);
        // loadingBar.current.continuousStart();
    
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          let result = await fetch("http://localhost:5000/api/v1/login", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          result = await result.json();
          console.warn(result);
          if (result.email) {
            localStorage.setItem("user", JSON.stringify(result));
            // dispatch(loginSuccess("RishuPandeyLogedin"));
            // navigate("/");
            // console.log(reduxdata);
          } else {
            // setErrorMessage("Enter a valid Email and Password!...");
          }
        } catch (error) {
          console.error("Error:", error);
        //   setErrorMessage("An error occurred while logging in.");
        } finally {
        //   setLoading(false);
        //   loadingBar.current.complete();
        }
      };
    return (
        <div>
            <Button variant="primary" onClick={() => document.getElementById('loginModal').style.display='block'}>
                Login
            </Button>

            <Modal
                id="loginModal"
                show={true}
                onHide={() => document.getElementById('loginModal').style.display='none'}
            >
                <Modal.Header onClick={onClose} closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary"onClick={loginData}>
                        Login
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginModal;
