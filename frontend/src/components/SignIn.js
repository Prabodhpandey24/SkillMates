import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const loginData = async () => {
        console.warn(email, password);
        let result = await fetch("http://localhost:5000/api/v1/login",{
            method:"post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        result = await result.json();
        console.warn(result);
        if (result.email) {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
        } else {
            alert("Enter valid details!");
        }
    };
    

    return (
        <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left_login d-none d-md-flex"></div>
              <div className="card-body p-4 p-sm-5">
                <h3 className="card-title text-center mb-3 fw-light fs-5">Log In</h3>
                <h5 className="card-title text-center mb-5 fw-light fs-4">Welcome to Skill Mates</h5>
                <form>

                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="floatingInputEmail">Email</label>
                  </div>
  
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
  
                  <div className="d-grid mb-2">
                    <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="button" onClick={loginData} >LogIn</button>
                  </div>
  
                  <a className="d-block text-center mt-2 small" href="#">Don't have an account? Register</a>
  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SignIn;
