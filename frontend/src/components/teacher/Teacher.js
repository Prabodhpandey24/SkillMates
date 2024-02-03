import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../teacher/Teacher.css';

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
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateFields = () => {
        const newErrors = {};

        if (!fullname) {
            newErrors.fullname = "Full Name is required";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!mobile) {
            newErrors.mobile = "Mobile is required";
        } else if (!/^\d{10}$/.test(mobile)) {
            newErrors.mobile = "Invalid mobile number";
        }

        if (!dob) {
            newErrors.dob = "Date of Birth is required";
        }

        if (!address) {
            newErrors.address = "Address is required";
        }

        if (!pincode) {
            newErrors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(pincode)) {
            newErrors.pincode = "Invalid pincode";
        }

        if (!wpl) {
            newErrors.wpl = "Work Profile Link is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextClick = () => {
        if (validateFields()) {
            setShowSecondDiv(true);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateFields()) {
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
                            {errors.fullname && <div className="error">{errors.fullname}</div>}

                            <label>Email :</label>
                            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            {errors.email && <div className="error">{errors.email}</div>}

                            <label>Mobile :</label>
                            <input type="tel" id="mobile" name="mobile" value={mobile}
                                onChange={(e) => {
                                            const newValue = e.target.value.replace(/\D/g, '');
                                            const limitedValue = newValue.slice(0, 10);
                                            setMobile(limitedValue); }
                                         }required
                            />
                            {errors.mobile && <div className="error">{errors.mobile}</div>}


                            <label>Date of Birth:</label>
                            <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
                            {errors.dob && <div className="error">{errors.dob}</div>}

                            <label>Address:</label>
                            <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            {errors.address && <div className="error">{errors.address}</div>}

                            <label>Pincode :</label>
                            <input type="number" id="pincode" name="pincode" value={pincode}
                                onChange={(e) => { const newValue = e.target.value.replace(/\D/g, '');
                                                   const limitedValue = newValue.slice(0, 6); 
                                                   setPincode(limitedValue);
                                                 }
                                         }required
                            /> 
                            {errors.pincode && <div className="error">{errors.pincode}</div>}

                            <label>Work Profile Link :</label>
                            <input type="text" id="wpl" name="wpl" value={wpl} onChange={(e) => setWpl(e.target.value)} required />
                            {errors.wpl && <div className="error">{errors.wpl}</div>}
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
