import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import LandingPage from './components/LandingPage';
import EditCustomer from './components/Admin/EditCustomer';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './context/RequireAuth';
library.add(faSign, faCameraRetro);

function App() {
  return (
    <AuthProvider>
      <div className="App bg">
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
{/* 
                <Route path="/employeeDashboard" element={<RequireAuth><EmployeeDashboard /></RequireAuth>} />
                <Route path="/viewLoans" element={<RequireAuth><ViewLoans /></RequireAuth>} />
                <Route path="/applyLoan" element={<RequireAuth><ApplyLoan /></RequireAuth>} />
                <Route path="/itemPurchased" element={<RequireAuth><ItemPurchased /></RequireAuth>} />

                <Route path="/adminDashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
                <Route path="/customerDataManagement" element={<RequireAuth><CustomerDataManagement /></RequireAuth>} />
                <Route path="/addCustomer" element={<RequireAuth><AddCustomer /></RequireAuth>} />
                <Route path="/loanCardManagement" element={<RequireAuth><LoanCardManagement /></RequireAuth>} />
                <Route path="/itemsMasterData" element={<RequireAuth><ItemsMasterData /></RequireAuth>} />
                <Route path="/editCustomer" element={<RequireAuth><EditCustomer /></RequireAuth>} /> */}
                <Route path="/employeeDashboard" element={<EmployeeDashboard />}/>
                <Route path="/viewLoans" element={<RequireAuth><ViewLoans /></RequireAuth>} />
                <Route path="/applyLoan" element={<ApplyLoan />} />
                <Route path="/itemPurchased" element={<RequireAuth><ItemPurchased /></RequireAuth>} />

                <Route path="/adminDashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
                <Route path="/customerDataManagement" element={<RequireAuth><CustomerDataManagement /></RequireAuth>} />
                <Route path="/addCustomer" element={<RequireAuth><AddCustomer /></RequireAuth>} />
                <Route path="/loanCardManagement" element={<RequireAuth><LoanCardManagement /></RequireAuth>} />
                <Route path="/itemsMasterData" element={<RequireAuth><ItemsMasterData /></RequireAuth>} />
                <Route path="/editCustomer" element={<RequireAuth><EditCustomer /></RequireAuth>} />
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
    </AuthProvider>
  );
}

export default App;