import React from "react";
import Carousel from "react-bootstrap/Carousel";
import NavBar from "./NavBar";
const LandingPage = () => {
  return (
    <div>
      <NavBar />

      <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div class="card card0 border-0">
          <div class="row d-flex">
            <div class="col-lg-6">
              <div class="card1 pb-5">
                <br /> <br /> <br /> <br />
                <div class="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img
                    src="images\img-back.png"
                    width="290px"
                    height="230px"
                  />
                </div>
                <br /> <br /> <br />
              </div>
            </div>
            <div class="col-lg-6">
              <br /> <br /> <br /> <br /> <br />  <br /> <br />
              <div
                class="row px-3 justify-content-center"
                style={{ fontFamily: "Croissant One" }}
              >
                <h1> Welcome to Loan Management System</h1>
                <br /> <br />  <br /> <br />  <br /> <br />
              </div>
              <div
                class="row px-3 justify-content-center"
                style={{ fontFamily: "Croissant One" }}
              >
                <h3>GIS Global Mart</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
