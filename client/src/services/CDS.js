import axios from 'axios'

const CRA_URL = 'http://localhost:8085/lms/api';

class CustomerService {

    static getCustomers()
    {
        return axios.get(CRA_URL);
    }

    static addCustomer(customer)
    {
        return axios.post(CRA_URL, customer);
    }

    static getCustomerById(empId)
    {
        return axios.get(CRA_URL+'/'+empId);
    }

    static updateCustomer(customer, empId)
    {
        return axios.put(CRA_URL+'/'+empId, customer);
    }

    static deleteCustomer(empId)
    {
        return axios.delete(CRA_URL+'/'+empId);
    }
}

export default CustomerService