import axios from "axios";

class LoanCardService {

    static addLoanCard(LoanCard){
        return axios.post('http://localhost:8085/lms/api/addLoanCard',LoanCard);
    }

    static getLoan(){
        return axios.get('http://localhost:8085/lms/api/getLoanData');
    }
}

export default LoanCardService;