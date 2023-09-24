import axios from "axios";
const LOANS_REST_API_URL = "http://localhost:8085/lms/api/getEmpLoanData";

class LoanService {
  static async getLoanById(empId) {
    const res= await axios.get(LOANS_REST_API_URL + "/" + empId);
    return res;
  }
}

export default LoanService;
