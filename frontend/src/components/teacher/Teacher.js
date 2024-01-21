import React, { useState } from 'react';
import '/home/ritesh/My_Space/SkillMates/frontend/src/components/teacher/Teacher.css';

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

    // Add state variables for error messages
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [dobError, setDobError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [wplError, setWplError] = useState("");
    const [experienceError, setExperienceError] = useState("");

    const handleNextClick = () => {
        if (validateForm()) {
            setShowSecondDiv(true);
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (!fullname) {
            setNameError("Enter valid name.");
            isValid = false;
        } else {
            setNameError("");
        }

        if (!mobile || !/^\d{10}$/.test(mobile) || mobile.length !== 10) {
            setMobileError("Enter valid Phone number.");
            isValid = false;
        } else {
            setMobileError("");
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError("Enter a valid email id.");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (!dob) {
            setDobError("Enter valid Date of Birth");
            isValid = false;
        } else {
            setDobError("");
        }

        if (!address) {
            setAddressError("Enter valid Address.");
            isValid = false;
        } else {
            setAddressError("");
        }

        if (!pincode || !/^\d{5}$/.test(pincode)) {
            setPincodeError("Pincode must be exactly 5 digits");
            isValid = false;
        } else {
            setPincodeError("");
        }
    
        if (!wpl || !/^www\.\S+\.\S+$/.test(wpl)) {
            setWplError("Enter a valid Work Profile Link (www.abc.com)");
            isValid = false;
        } else {
            setWplError("");
        }

        if (!experience) {
            setExperienceError("Enter valid Experience.");
            isValid = false;
        } else {
            setExperienceError("");
        }

        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            // Stop form submission if validation fails
            return;
        }

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
                            <div className="error">{nameError}</div>

                            <label>Email :</label>
                            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <div className="error">{emailError}</div>

                            <label>Mobile :</label>
                            <input type="number" id="mobile" name="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                            <div className="error">{mobileError}</div>

                            <label>Date of Birth:</label>
                            <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />
                            <div className="error">{dobError}</div>

                            <label>Address:</label>
                            <input type="text" id="text" name="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                            <div className="error">{addressError}</div>

                            <label>Pincode :</label>
                            <input type="number" id="pincode" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                            <div className="error">{pincodeError}</div>

                            <label>Work Profile Link :</label>
                            <input type="text" id="wpl" name="wpl" value={wpl} onChange={(e) => setWpl(e.target.value)} required />
                            <div className="error">{wplError}</div>
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
                            <div className="error">{experienceError}</div>
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
