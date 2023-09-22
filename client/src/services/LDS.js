import axios from 'axios'

const LRA_URL = 'http://localhost:8085/lms/api';

class LoanService {

    static getLoans()
    {
        return axios.get(LRA_URL+'/getLoan');
    }

    static addLoan(loan)
    {
        return axios.post(LRA_URL+'/addLoan', loan);
    }

    static getLoanById(loanId)
    {
        return axios.get(LRA_URL+'/getLoan/'+loanId);
    }

    static updateLoan(loan, loanId)
    {
        return axios.put(LRA_URL+'/addLoan/'+loanId, loan);
    }

    static deleteLoan(loanId)
    {
        return axios.delete(LRA_URL+'/deleteLoan/'+loanId);
    }
}

export default LoanService