import axios from "axios";

class ItemMasterService {

    static addItem(Item){
        return axios.post('http://localhost:8085/lms/api/addItemData',Item);
    }
}

export default ItemMasterService;