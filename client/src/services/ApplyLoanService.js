import axios from "axios";

class ApplyLoanService {

    static applyLoan(Payload){
        return axios.post('http://localhost:8085/lms/api/applyLoan',Payload);
    }
}

export default ApplyLoanService;