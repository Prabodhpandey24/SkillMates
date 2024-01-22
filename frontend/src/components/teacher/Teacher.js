import React, { useState } from 'react';
import '/home/ritesh/My_Space/SkillMates/frontend/src/components/teacher/Teacher.css';
import { useNavigate } from "react-router-dom";

const Teacher = () => {
    const [showSecondDiv, setShowSecondDiv] = useState(false);
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [wpl, setWpl] = useState("");
    const [experience, setExperience] = useState("");
    const navigate = useNavigate();

    

    const handleNextClick = () => {
        setShowSecondDiv(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const teacherDetails = {
                teacher_details: [{
                    fullname,
                    email,
                    mobile,
                    dob,
                    address,
                    pincode,
                    wpl,
                    experience,
                }],
            };

            const response = await fetch('http://localhost:5000/api/v1/teachers', {
                method: 'POST',
                body: JSON.stringify(teacherDetails),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.warn(result);
            navigate("/");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="containers">
                <h1>Teacher Basic Info</h1>
                <form onSubmit={handleSubmit}>
                    {!showSecondDiv && (
                        <div className="first_div">
                            <label>FullName:</label>
                            <input type="text" id="fullname" name="fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} required />

                            <label>Email :</label>
                            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <label>Mobile :</label>
                            <input type="number" id="mobile" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />

                            <label>Date of Birth:</label>
                            <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />

                            <label>Address:</label>
                            <input type="text" id="text" name="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

                            <label>Pincode :</label>
                            <input type="number" id="pincode" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                            
                            <label>Work Profile Link :</label>
                            <input type="text" id="wpl" name="wpl" value={wpl} onChange={(e) => setWpl(e.target.value)} required />
                            
                        </div>
                    )}

                    {showSecondDiv && (
                        <div className="second_div">
                            <label>Add Experience :</label>
                            <select id="experience" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} required>
                                <option value="">Choose your experience.</option>
                                <option value="0-2 year">0-2 Year</option>
                                <option value="2-5 Year">2-5 Year</option>
                                <option value="5-10 Year">5-10 Year</option>
                                <option value="10-20 Year">10-20 Year</option>
                            </select>
                        </div>
                    )}

                    {!showSecondDiv ? (
                        <button type="button" onClick={handleNextClick}>
                            Next
                        </button>
                    ) : (
                        <button type="submit">Submit</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Teacher;
