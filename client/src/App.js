import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar.js"
import Registration from './components/Registration';
import Login from './components/Login';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSign, faCameraRetro, faPeopleGroup, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddCustomer from './components/Admin/AddCustomer';
import AdminDashboard from './components/Admin/AdminDashboard'
import CustomerDataManagement from './components/Admin/CustomerDataManagement';
import AddLoan from './components/Admin/AddLoan';
import AddItem from './components/Admin/AddItem';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import ViewLoans from './components/Employee/ViewLoans';
import ApplyLoan from './components/Employee/ApplyLoan';
import ItemPurchased from "./components/Employee/ItemPurchased";

import CDE from './components/Admin/CDE';

import LandingPage from './components/LandingPage';
import LDE from './components/Admin/LDE'

import IDE from './components/Admin/IDE'

library.add(faSign, faCameraRetro, faPeopleGroup, faTrash, faEdit);

function App() {
  return (
    <div className="App bg1">
      <section>
        <div style={{
          // backgroundImage: "url(/images/loan-bg.jpg)",
          backgroundSize: 'cover', backgroundRepeat: "no-repeat",
          minHeight: '140vh', minWidth: '100vw'
        }}>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />

              <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
              <Route path="/viewLoans" element={<ViewLoans />} />
              <Route path="/applyLoan" element={<ApplyLoan />} />
              <Route path="/itemPurchased" element={<ItemPurchased />} />

              <Route path="/adminDashboard" element={<AdminDashboard />} />
              <Route path='/cde' element={<CDE />} />
              <Route path='/addCustomer/:id' element={<AddCustomer />} />
              <Route path="/LDE" element={<LDE />} />
              <Route path="/addLoan/:id" element={<AddLoan />} />
              <Route path="/IDE" element={<IDE />} />
              <Route path="/addItem/:id" element={<AddItem />} />

            </Routes>
          </Router>

        </div>
      </section>
      <footer>
        <div class="row px-3 footer">
          <small class="ml-4 ml-sm-5 mb-2">Copyright &copy; 2023. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default App;