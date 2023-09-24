import axios from "axios";

class ItemMasterService {

    static addItem(Item){
        return axios.post('http://localhost:8085/lms/api/addItemData',Item);
    }

    static getItemIds(){
        return axios.get('http://localhost:8085/lms/api/getItemIds');
    }

    static getItemData(itemId){
        console.log(itemId);
        return axios.post('http://localhost:8085/lms/api/getItemDetail',itemId);
    }

    static getItemsPurchased(itemId){
        return axios.post('http://localhost:8085/lms/api/itemsPurchased',itemId);
    }
}

export default ItemMasterService;