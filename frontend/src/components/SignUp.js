import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setRepasswordError] = useState("");
  const [selectedRoleError, setSelectedRoleError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepasswordVisibility = () => {
    setShowRepassword(!showRepassword);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber) || phoneNumber.length !== 10) {
      setPhoneNumberError("Phone number must be exactly 10 digits");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }
    

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password || !/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)) {
      setPasswordError("Password must contain at least one capital letter and one special character (!@#$%^&*)");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== repassword) {
      setRepasswordError("Passwords do not match");
      isValid = false;
    } else {
      setRepasswordError("");
    }

    if (!selectedRole) {
      setSelectedRoleError("Role is required");
      isValid = false;
    } else {
      setSelectedRoleError("");
    }

    return isValid;
  };

  const collectData = async () => {
    if (validateForm()) {
      console.warn(name, phoneNumber, email, password, repassword, selectedRole);

      console.log(name, email, password, selectedRole);
      let result = await fetch("http://localhost:5000/api/v1/signup", {
        method: "post",
        body: JSON.stringify({
          name,
          phone_number: phoneNumber,
          email,
          password,
          repassword,
          role: selectedRole,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
          <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
            <div className="card-img-left d-none d-md-flex"></div>
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
              <form>
                <select
                  className="form-select mb-4"
                  aria-label="Default select example"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="" disabled>
                     Please Choose your role here
                  </option>
                  <option value="School">School</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                </select>
                <div className="text-danger">{selectedRoleError}</div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="myname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="floatingInputname">Name</label>
                  <div className="text-danger">{nameError}</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="myphonenumber"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}

                  />
                  <label htmlFor="floatingInputPhonenumber">Contact number</label>
                  <div className="text-danger">{phoneNumberError}</div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInputEmail">Email address</label>
                  <div className="text-danger">{emailError}</div>
                </div>

               

                <div className="form-floating d-flex mb-3">
                  <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <button
                      type="button"
                      className="btn btn-light"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  <label htmlFor="floatingPassword">Password</label>
                  <div className="text-danger">{passwordError}</div>
                </div>


                <div className="form-floating d-flex mb-3">
                  <input type={showRepassword ? "text" : "password"} className="form-control" id="repassword" placeholder="Confirm Password"  value={repassword} onChange={(e) => setRepassword(e.target.value)}/>
                  <button
                      type="button"
                      className="btn btn-light"
                      onClick={toggleRepasswordVisibility}
                    >
                      {showRepassword ? "Hide" : "Show"}
                    </button>
                  <label htmlFor="floatingPasswordConfirm">Confirm Password</label>
                  <div className="text-danger">{repasswordError}</div>
                </div>

                <div className="d-grid mb-2">
                  <button
                    className="btn btn-lg btn-primary btn-login fw-bold text-uppercase"
                    type="button"
                    onClick={collectData}
                  >
                    Sign Up
                  </button>
                </div>

                <a className="d-block text-center mt-2 small" href="/signin">
                  Have an account? Sign In
                </a>
              </form>
            </div>
          </div>
      
      </div>
    </div>
  );
}

export default SignUp;
