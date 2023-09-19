import axios from 'axios'

const LRA_URL = 'http://localhost:8085/lms/api';

class LoanService {

    static getLoans()
    {
        return axios.get(LRA_URL);;
    }

    static createLoans(loan)
    {
        return axios.post(LRA_URL, loan);
    }

    static getLoanById(loanId)
    {
        return axios.get(LRA_URL+'/'+loanId);
    }

    static updateLoan(loan, loanId)
    {
        return axios.put(LRA_URL+'/'+loanId, loan);
    }

    static deleteLoan(loanId)
    {
        return axios.delete(LRA_URL+'/'+loanId);
    }
}

export default LoanService