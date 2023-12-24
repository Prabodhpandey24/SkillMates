import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginData = async () => {
    console.warn(email, password);
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
      navigate("/");
    } else {
      setErrorMessage("Enter valid Email and Password !...");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
       
          <div className="card flex-row border-0  px-0">
            <div className="col-sm-7">
              <img src="https://www.freecodecamp.org/news/content/images/2021/06/w-qjCHPZbeXCQ-unsplash.jpg" className="card-img-left-login"></img>
            </div>  
            <div className="col-sm-5">
            <div className="card-body d-flex align-items-center px-5">
              <div style={{width: "100%", textAlign:"start"}}>
              <h3 className="">Welcome to Skill Mates</h3>
              <h5 className="py-4">
                Get Onboard and jumpstart your career!
              </h5>
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInputEmail">Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {errorMessage && (
                  <p className="text-danger">{errorMessage}</p>
                )}
                <div className="d-grid mb-2 ">
                  <button
                    className="LogInSubmitBtn text-uppercase "
                    type="button"
                    onClick={loginData}
                  >
                    LogIn
                  </button>
                </div>
                <a className="d-block text-center mt-2 small" href="/signup">
                  Don't have an account? Register
                </a>
              </form>
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SignIn;
