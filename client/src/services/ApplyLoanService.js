import axios from "axios";

class ApplyLoanService {

    static async applyLoan(Payload) {
        const res = await axios.post('http://localhost:8085/lms/api/applyLoan', Payload);
        return res;
    }
}

export default ApplyLoanService;