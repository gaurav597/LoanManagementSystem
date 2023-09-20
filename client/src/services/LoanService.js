import axios from "axios";
const LOANS_REST_API_URL = "http://localhost:8085/lms/api/loans";

class LoanService {
  static getLoanById(loanIdId) {
    return axios.get(LOANS_REST_API_URL + "/" + loanId);
  }
}

export default LoanService;
