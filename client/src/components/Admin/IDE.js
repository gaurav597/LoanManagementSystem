import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import ItemService from '../../services/IDS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminDashboard from './AdminDashboard';
import AppContext from '../../Context';
import AddItem from './AddItem'

function IDE() {
    const history = useNavigate();

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');

    const [id, setId] = useState("_none")
    const [itemId, setItemId] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("Y");
    const [make, setMake] = useState("Wooden");
    const [ctg, setCtg] = useState("Furniture");
    const [val, setVal] = useState("");
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(false);

    useEffect(()=>{
        fetchItemData();
        setShow(false);
        setChanged(false);
    }, [changed]);

    const fetchItemData = () => {
        ItemService.getItems().then((Response) => {
            console.log(Response.data);
            setItems(Response.data);
        })
        // setItems(ItemService.getItems().data)
    }

    useEffect(()=>{
        if(id==="_none")
        {
            setShow(false);
            setItemId("");
            setDesc("");
            setStatus("Y");
            setMake("Wooden");
            setCtg("Furniture");
            setVal("");
            console.log('loli');
        }
        else if(id!=='_add')
        {
            const Response = ItemService.getItemById(id).then((Response)=>{
                console.log('lol', Response);
                setItemId(Response.data.itemId);
                setDesc(Response.data.itemDescription);
                setStatus(Response.data.issueStatus);
                setMake(Response.data.itemMake);
                setCtg(Response.data.itemCategory);
                setVal(Response.data.itemValuation);
                setShow(true)
                // console.log('lol', Response);
            });
        }
        else
        {
            setItemId("");
            setDesc("");
            setStatus("Y");
            setMake("Wooden");
            setCtg("Furniture");
            setVal("");
            setShow(true);
            console.log('lolli');
        }
      }, [id]);

    const addItem = () => {
        setId("_add");
        setShow(true);
        console.log('hihihi');
        // history('/addItem/_add'); //Navigates to CreateCustomer component and passes '_add' as parameter.
    }

    const editItem = (iid) => {
        setId(iid);
        console.log('hihi');
        // history(`/addItem/${id}`); //Navigates to CreateCustomer component and passes 'id' as parameter.
    }

    const deleteItem = (iid) => {
        ItemService.deleteItem(iid).then(()=>{
            fetchItemData();
            setMessage('Item deleted successfully.');
            //Clear the message after 2 seconds.
            setTimeout(() => {
                setMessage('');
            }, 2000);
        });
    }

    const editButton = (data) =>
    {
        return(
            <button className='btn btn-success' data-toggle='modal' data-target=".bd-example-modal-lg-item" onClick={()=>editItem(data.itemId)}>
                <span>
                    <FontAwesomeIcon icon="edit" />
                </span>
            </button>
        )
    }

    const deleteButton = (data) =>
    {
        return(
            <button className='btn btn-danger' onClick={()=>deleteItem(data.itemId)}>
                <span>
                    <FontAwesomeIcon icon="trash" />
                </span>
            </button>
        )
    }

    const saveOrUpdateItem = (event) => {
        event.preventDefault();
        const item = {"itemId": itemId, "itemDescription": desc, "issueStatus": status, "itemMake": make, "itemCategory": ctg, "itemValuation": val};
    
        if(id==='_add')
        {
            ItemService.addItem(item).then((Response)=>{
                console.log(Response)
            })
            setId("_none");
            setShow(false);
            setChanged(true);
            // navigate('/IDE');
        }
        else if(id!=="_none")
        {
            ItemService.updateItem(item, id).then(()=>{
                // navigate('/IDE');
            });
            setId("_none");
            setShow(false);
            setChanged(true);
        }
    };

    const getTitle = () => {
        if (id==='_add') {
            return <h1 className="modal-title">Add Item</h1>;
        } else {
            return <h1 className="modal-title">Update Item</h1>;
        }
      };

    const cancel = () => {
        // history('/IDE');
        setId("_none");
        setShow(false);
    };

    return (
        <React.Fragment>
            <div>
                <div className="modal fade bd-example-modal-lg-item" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                {getTitle()}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {show ? (
                                    <div className="container">
                                        <AppContext.Provider value={{ itemId, setItemId, desc, setDesc, status, setStatus, make, setMake, ctg, setCtg, val, setVal }}>
                                            <AddItem />
                                        </AppContext.Provider>
                                    </div>
                                ) : <></>}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-success" data-dismiss="modal" onClick={saveOrUpdateItem}>Submit</button>
                                <button className="btn btn-danger" data-dismiss="modal" onClick={cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h1 className="text-center mb-5" style={{ color: "white" }}>Item Master Data Details</h1>

                {message && <div className="alert alert-success">{message}</div>}

                <div className="d-flex justify-content-center">
                    <div className="table-responsive" style={{width: "80%"}}>
                        <table className="table table-striped table-hover table-bordered w-100">
                            <thead className="table-danger">
                                <tr className="table-danger">
                                    <th>Item Id</th>
                                    <th>Description</th>
                                    <th>Issue Status</th>
                                    <th>Item Make</th>
                                    <th>Item Category</th>
                                    <th>Item Valuation</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items && items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.itemId}</td>
                                        <td>{item.itemDescription}</td>
                                        <td>{item.issueStatus}</td>
                                        <td>{item.itemMake}</td>
                                        <td>{item.itemCategory}</td>
                                        <td>{item.itemValuation}</td>
                                        <td>
                                            {editButton(item)}
                                            &nbsp;
                                            {deleteButton(item)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg-item" onClick={addItem}>Add Item</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default IDE;