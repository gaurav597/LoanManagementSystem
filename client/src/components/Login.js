import React, { useState } from "react";
import "../styles/Login.css";
import AuthenticationService from "../services/AuthenticationService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const history = useNavigate();
  const auth = useAuth();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessmMg] = useState("");

  const handleLogin = async () => {
    if (!employeeId || !password) {
      setErrorMsg("Please enter id and password");
      return;
    }
    const employee = { "employeeId": employeeId, "password": password };
    try {
      const loginSuccess = await AuthenticationService.login(employee);
      if (loginSuccess[0]) {
        setSuccessmMg("Login Successful! Redirecting...");
        auth.login(employeeId);
        setTimeout(() => {
          if (loginSuccess[1][0] == "Manager") {
            history("/adminDashboard", { state: loginSuccess[1] }, { replace: true });
          }
          else
            history('/employeeDashboard', { state: loginSuccess[1] }, { replace: true });
        }, 500);
      } else {
        setErrorMsg("Invalid id or Password");
      }
    } catch (error) {
      setErrorMsg("Error occured during login");
    }
  };
  return (
    <div>
      <NavBar />
      <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div class="card card0 border-0" style={{borderRadius:"30px"}}>
          <div class="row d-flex">
            <div class="col-lg-6">
              <div class="card1 pb-5">
                <br /> <br /> <br /> <br /> <br /> <br />
                <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img
                    src="https://simplyfi.tech/images/LMS/Digital-Loan-Management.svg"
                    class="image"
                  />
                </div>
                <br /> <br /> <br />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="card2 card border-0 px-4 py-5">
                <br /> <br /><br/>
                <div>
                  <label class="mb-1 mt-3"> Employee ID </label>
                  <input
                    class="mb-4"
                    type="text"
                    name="id"
                    placeholder="Enter your employee ID"
                    value={employeeId}
                    onChange={(e) => {
                      setEmployeeId(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label class="mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <br />
                <br />
                {/* <div class="row px-3 mb-4">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      id="chk1"
                      type="checkbox"
                      name="chk"
                      class="custom-control-input"
                    />
                    <label for="chk1" class="custom-control-label text-sm">
                      Remember me
                    </label>
                  </div>
                </div> */}
                <div class="row mb-3 px-3">
                  <Button
                    style={{
                      background: "radial-gradient(circle, rgba(0, 135, 145, 1) 0%, rgba(30, 140, 96, 1) 61%, rgba(89, 179, 76, 1) 93%)"
                    }}
                    onClick={handleLogin}
                  >
                    {" "}
                    Login{" "}
                  </Button>
                </div>
                <div class="row mb-4 px-3">
                  <small class="font-weight-bold">
                    Don't have an account?{" "}
                    <a class="text-danger ">
                      {" "}
                      <Link to="/register"> Register </Link>
                    </a>
                  </small>
                </div>
                {errorMsg && <p className="error-message">{errorMsg}</p>}
                {successMsg && <p className="success-message">{successMsg}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
