import React, { useState } from "react";
import 'react-phone-input-2/lib/style.css';

function SignUp() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setrePassword] = useState("");

    const collectData = async () => {
        console.warn(name, phoneNumber, email, password, repassword);

        console.log(name, email, password);
        let result = await fetch("http://localhost:5000/api/v1/signup", {
            method: 'post',
            body: JSON.stringify({ name, phone_number: phoneNumber, email, password, repassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
    };

    return (


        <div className="container">
        <div className="row">
          <div className="col-lg-10 col-xl-9 mx-auto">
            <div className="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div className="card-img-left d-none d-md-flex"></div>
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">Register</h5>
                <form>
  
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" placeholder="myname" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="floatingInputname">Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="myphonenumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)}/>
                    <label htmlFor="floatingInputPhonenumber">Contact number</label>
                </div>

  
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInputEmail">Email address</label>
                  </div>
  
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
  
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="repassword" placeholder="Confirm Password"  value={repassword} onChange={(e) => setrePassword(e.target.value)}/>
                    <label htmlFor="floatingPasswordConfirm">Confirm Password</label>
                  </div>
  
                  <div className="d-grid mb-2">
                    <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="button" onClick={collectData} >Sign Up</button>
                  </div>
  
                  <a className="d-block text-center mt-2 small" href="#">Have an account? Sign In</a>
  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    );
}

export default SignUp;



















            // <div className="d-flex justify-content-center mt-5">
        //     <Card className="" style={{ width: '25rem' }}>
        //         <Card.Body>
        //             <Card.Title>SignUp</Card.Title>
        //             <form>
        //                 <div className="form-group">
        //                     <label htmlFor="name">Name</label>
        //                     <input className="inputBox" type="text" id="name" placeholder="Enter Name"
        //                         value={name} onChange={(e) => setName(e.target.value)}
        //                     />
        //                 </div>
                        // <div className="form-group">
                        //     <label htmlFor="phone">Phone Number</label>
                        //     <PhoneInput
                        //         inputProps={{
                        //             name: "phone",
                        //             id: "phone",
                        //             required: true,
                        //         }}
                        //         country={'in'}
                        //         value={phoneNumber}
                        //         onChange={(value) => setPhoneNumber(value)}
                        //     />
                        // </div>
        //                 <div className="form-group">
        //                     <label htmlFor="email">Email</label>
        //                     <input className="inputBox" type="text" id="email" placeholder="Enter Email"
        //                         value={email} onChange={(e) => setEmail(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="password">Password</label>
        //                     <input className="inputBox" type="password" id="password" placeholder="Enter password"
        //                         value={password} onChange={(e) => setPassword(e.target.value)}
        //                     />

        //                     <label htmlFor="password"> Confirm Password</label>
        //                     <input className="inputBox" type="repassword" id="repassword" placeholder="Enter confirm password"
        //                         value={repassword} onChange={(e) => setrePassword(e.target.value)}
        //                     />
        //                 </div>
        //                 <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        //             </form>
        //         </Card.Body>
        //     </Card>
        // </div>