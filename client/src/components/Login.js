import React, { useState } from "react";
import "../styles/Login.css";
import AuthenticationService from "../services/AuthenticationService";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavBar from "./NavBar";

const Login = () => {
  const history = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessmMg] = useState("");

  const handleLogin = async () => {
    if (!employeeId || !password) {
      setErrorMsg("Please enter id and password");
      return;
    }
    const employee = { employeeId, password };
    try {
      const loginSuccess = await AuthenticationService.login(employee);
      console.log("API Response", loginSuccess.data);
      if (loginSuccess) {
        console.log(loginSuccess);
        setSuccessmMg("Login Successful! Redirecting...");
        setTimeout(() => {
          //history('/dashboard') // on successful login navigate to product component
          history("/adminDashboard");
          // history('/employeeDashboard')
        }, 500);
      } else {
        setErrorMsg("Invalid id or Password");
      }
    } catch (error) {
      console.log("Login Error: ", error);
      setErrorMsg("Error occured during login");
    }
  };
  return (
    <div>
      <NavBar />
      <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div class="card card0 border-0">
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
                <br /> <br />
                <div>
                  <label class="mb-1"> Employee ID </label>
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
                <div class="row px-3 mb-4">
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
                </div>
                <div class="row mb-3 px-3">
                  <Button
                    style={{
                      background: "#322333",
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
