import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import ItemService from '../../services/IDS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminDashboard from './AdminDashboard';

function IDE() {
    const history = useNavigate();

    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        fetchItemData();
    }, []);

    const fetchItemData = () => {
        ItemService.getItems().then((Response) => {
            console.log(Response.data);
            setItems(Response.data);
        })
        // setItems(ItemService.getItems().data)
    }

    const addItem = () => {
        history('/addItem/_add'); //Navigates to CreateCustomer component and passes '_add' as parameter.
    }

    const editItem = (id) => {
        history(`/addItem/${id}`); //Navigates to CreateCustomer component and passes 'id' as parameter.
    }

    const deleteItem = (id) => {
        ItemService.deleteItem(id).then(()=>{
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
            <button className='btn btn-success' onClick={()=>editItem(data.itemId)}>
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

    return (
        <div>
            <br/>
            <AdminDashboard />
            <h1 className="text-heading" style={{color: "white"}}>Item Master Data Details</h1>
            <div className="row justify-content-center" >
                <table className="table table-success w-auto">
                <thead>
                    <tr className="table-danger">
                        <th> Item Id</th>
                        <th> Description</th>
                        <th> Issue Status</th>
                        <th> Item Make</th>
                        <th> Item Category</th>
                        <th> Item Valuation</th>
                        <th> Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {console.log(items)}
                        {items&&items.map(
                                item => 
                                <tr key={item.id}>
                                    <td> {item.itemId} </td>
                                    <td> {item.itemDescription} </td>
                                    <td> {item.issueStatus} </td>
                                    <td> {item.itemMake} </td>
                                    <td> {item.itemCategory} </td>
                                    <td> {item.itemValuation} </td>
                                    <td>
                                        {editButton(item)}
                                        &nbsp;
                                        {deleteButton(item)}
                                    </td>
                                
                                </tr>
                            )
                        }
                </tbody>
                </table>
            </div>
            <br/>
                <div className = "row justify-content-center">
                    <button className='btn btn-info w-auto' onClick={addItem}>Add Item</button>
                </div>
            <br/>
            {message && <div className='alert alert-success'>{message}</div>}
        </div>
    )
}

export default IDE;