import React from "react";
import "../../styles/Navbar.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ViewLoans from "./ViewLoans";
import ApplyLoan from "./ApplyLoan";
import ItemPurchased from "./ItemPurchased";
import NavBar from "../NavBar";
import "../../styles/Navbar.css"
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import AppContext from "../../Context";

const EmployeeDashboard = () => {
  const auth = useAuth();
  const location = useLocation();
  const data = location.state;
  const [itemPur, setItemPur] = useState(false);
  return (
    <div>
      <AppContext.Provider value={{ itemPur, setItemPur }}>
        <NavBar />
        <Tabs
          defaultActiveKey="viewLoans"
          id="uncontrolled-tab-example"
          className="mb-3 navbar justify-content-center tabBg"
          style={{ fontFamily: "Libre Baskerville" }}
        >
          <Tab eventKey="viewLoans" title="Loans">
            <ViewLoans id={auth.user} des={data[0]} dept={data[1]} />
          </Tab>
          {/* <Tab eventKey="applyLoans" title="Apply Loans">
          <ApplyLoan id={auth.user} des={data[0]} dept={data[1]} />
        </Tab> */}
          <Tab eventKey="itemsPurchased" title="Items Purchased">
            <ItemPurchased id={auth.user} des={data[0]} dept={data[1]} />
          </Tab>
        </Tabs>
      </AppContext.Provider>
    </div>
  );
};

export default EmployeeDashboard;
