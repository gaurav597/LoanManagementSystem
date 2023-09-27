import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/Navbar.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import CDE from "./CDE";
import LDE from "./LDE";
import IDE from "./IDE";

import { useAuth } from "../../context/AuthContext";
import NavBar from "../NavBar";
import "../../styles/Navbar.css"
import { Link } from "react-router-dom";

function AdminDashboard() {
  const location = useLocation();
  const data = location.state;
  // console.log(data);
  const auth = useAuth();
  return (
    <div>
      <NavBar />
      <Tabs
        defaultActiveKey="custDataMgmt"
        id="uncontrolled-tab-example"
        className="mb-3 navbar justify-content-center tabBg"
        style={{ fontFamily: "Libre Baskerville" }}
        >
        <Tab eventKey="custDataMgmt" title="Customer Data Management">
          <CDE />
        </Tab>
        <Tab eventKey="loanCardMgmt" title="Loan Card Management">
          <LDE />
        </Tab>
        <Tab eventKey="itemsMasterCard" title="Items Master Data">
          <IDE />
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;