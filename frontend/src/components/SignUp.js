import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import 'react-phone-input-2/lib/style.css';

function SignUp() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const collectData = async () => {
        if (password !== rePassword) {
            console.error("Passwords do not match");
            // Handle password mismatch on the frontend
            return;
        }

        // Perform other validations if needed

        try {
            const response = await fetch("/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    phoneNumber,
                    email,
                    password,
                    rePassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("User registered successfully", data);
                // Handle success, e.g., redirect to login page
            } else {
                console.error("Registration failed", data.error || "Internal Server Error");
                // Handle registration failure, show error message to the user
            }
        } catch (error) {
            console.error("Error during registration", error);
            // Handle other errors, show a generic error message to the user
        }
    };
    
    return (
        <div className="d-flex justify-content-center mt-5">
            <Card className="text-white bg-dark" style={{ width: '25rem' }}>
                <Card.Body>
                    <Card.Title>SignUp</Card.Title>

                    <input className="inputBox" type="text" placeholder="Enter Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input className="inputBox" type="number" placeholder="Enter Phone Number"
                        value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input className="inputBox" type="text" placeholder="Enter Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className="inputBox" type="password" placeholder="Enter password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <input className="inputBox" type="password" placeholder="Enter re-password"
                        value={rePassword} onChange={(e) => setRePassword(e.target.value)}
                    />
                    <button onClick={collectData} className="appButton" type="button">Sign Up</button>

                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUp;
