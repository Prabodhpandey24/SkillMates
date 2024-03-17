import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import TopLoadingBar from "react-top-loading-bar";
import LoadingOverlay from "../Loader/LoadingOverlay";
import Background1 from "../homecarousel/img/homeIcon.png"
import {useSelector, useDispatch} from 'react-redux'
import {loginSuccess} from '../../redux/Loginreducer'


function EduDash_Login({visible}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadingBar = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginData = async () => {
    setLoading(true);
    loadingBar.current.continuousStart();

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        let result = await fetch("http://localhost:5000/api/v1/adminlogin", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (result.ok) {
            const data = await result.json();
            dispatch(loginSuccess(data));
            console.log("adminlogin...",data);
            navigate("/admindashboard");
            console.log(">>>>>>>>>>>>>>>>>>adminlogin...");
        } else {
            setErrorMessage("Enter a valid Email and Password!...");
        }
    } catch (error) {
        console.error("Error:", error);
        setErrorMessage("An error occurred while logging in.");
    } finally {
        setLoading(false);
        loadingBar.current.complete();
    }
};


  return (
    <div className="container-fluid">
      <TopLoadingBar ref={loadingBar} color="#f11946" shadow={true} />
      {loading && <LoadingOverlay />}
      <div className="row">
        <div className="card flex-row px-0 border-0" >
          {!visible && (
            <div className="col-sm-7 align-items-center d-flex justify-content-center" style={{ borderRight: '0.2px solid rgb(28, 28, 72)', backgroundColor: "aliceblue"}}>
              <img
                src={Background1}
                className="card-img-left-login"
                alt="Login"
              />
            </div>
          )}
          <div className={visible ? "col-sm-12" : "col-sm-5"}>
            <div className="card-body d-flex align-items-center px-5">
              <div style={{ width: "100%", textAlign: "start" }}>
                <h3 className="">Welcome to Skill Mates</h3>
                <h5 className="py-4">Get Onboard and jumpstart your career!</h5>
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

                  <div className="form-floating d-flex mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="showHideBtn text-uppercase"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
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
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader
                          size={20}
                          color={"#ffffff"}
                          loading={true}
                        />
                      ) : (
                        "LogIn"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EduDash_Login;
