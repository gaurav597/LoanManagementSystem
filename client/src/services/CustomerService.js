import axios from "axios";

class CustomerService {
    static async addCustomer(customer){
        console.log("it is reaching here");
        return await axios.post('http://localhost:8085/lms/api/addCustomer', customer);
    }

    static getCustomer(){
        return axios.get('http://localhost:8085/lms/api/getCustomer');
    }

    static deleteCustomer(empId){
        return axios.delete('http://localhost:8085/lms/api/deleteCustomer', {data : empId});
    }

}

export default CustomerService;