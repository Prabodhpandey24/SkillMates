import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const isFormValid = email !== "" && password !== "";

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <Card className="text-white bg-dark" style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>SignIn</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="d-flex justify-content-start">Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="d-flex justify-content-start">Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                        </Form.Group>

                        <div className="d-flex justify-content-start mt-3 mb-2">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        <Button variant="primary" type="submit" disabled={!isFormValid}>
                            SignIn
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignIn;
