import axios from "axios";

class CustomerService {
    static async addCustomer(customer){
        console.log("it is reaching here");
        return await axios.post('http://localhost:8085/lms/api/addCustomer', customer);
    }

    static updateCustomer(customer){
        return axios.put('http://localhost:8085/lms/api/updateCustomer', customer);
    }
    static getCustomer(){
        return axios.get('http://localhost:8085/lms/api/getCustomer');
    }

    static deleteCustomer(empId){
        return axios.delete(`http://localhost:8085/lms/api/deleteCustomer/${empId}`);
    }

}

export default CustomerService;