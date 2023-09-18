import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar.js"
import Registration from './components/Registration';
import Login from './components/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSign, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import AddCustomer from './components/Admin/AddCustomer';
import AdminDashboard from './components/Admin/AdminDashboard'
import CustomerDataManagement from './components/Admin/CustomerDataManagement';
import LoanCardManagement from './components/Admin/LoanCardManagement';
import ItemsMasterData from './components/Admin/ItemsMasterData';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import ViewLoans from './components/Employee/ViewLoans';
import ApplyLoan from './components/Employee/ApplyLoan';
import ItemPurchased from "./components/Employee/ItemPurchased";

library.add(faSign, faCameraRetro);

function App() {
  return (
    <div className="App gradient-custom">
      <section>
        <div style={{
          backgroundColor:"#e2e4da",
          backgroundSize: 'cover', backgroundRepeat: "no-repeat",
          minHeight: '140vh', minWidth: '100vw'
        }}>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
              <Route path="/viewLoans" element ={<ViewLoans/>}/>
              <Route path="applyLoan" element={<ApplyLoan/>}/>
              <Route path="itemPurchased" element={<ItemPurchased/>}/>

              <Route path="/adminDashboard" element={<AdminDashboard/>} />
              <Route path="/customerDataManagement" element={<CustomerDataManagement/>} />
              <Route path="/addCustomer" element={<AddCustomer/>} />
              <Route path="/loanCardManagement" element={<LoanCardManagement/>} />
              <Route path="/itemsMasterData" element={<ItemsMasterData/>} />


            </Routes>
          </Router>

        </div>
      </section>
    </div>
  );
}

export default App;