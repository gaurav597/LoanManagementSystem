import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ItemService from "../../services/IDS";
import Header from '../Header';
import AdminDashboard from './AdminDashboard';
import { useNavigate, useParams } from 'react-router-dom';

export default function ItemMasterData()
{
  const navigate = useNavigate();
  const {id} = useParams();

  const [itemId, setItemId] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Y");
  const [make, setMake] = useState("Wodden");
  const [ctg, setCtg] = useState("Furniture");
  const [val, setVal] = useState("");

  useEffect(()=>{
    if(id!=='_add')
    {
        const Response = ItemService.getItemById(id).then((Response)=>{
            setDesc(Response.desc);
            setStatus(Response.status);
            setMake(Response.make);
            setCtg(Response.ctg);
            setVal(Response.val);
        });
    }
}, [id]);

const saveOrUpdateItem = (event) => {
    event.preventDefault();
    const item = {itemId, desc, status, make, ctg, val};

    if(id==='_add')
    {
        ItemService.addItem(item).then((Response)=>{
            console.log(Response)
        })
        navigate('/IDE');
    }
    else
    {
        ItemService.updateItem(item, id).then(()=>{
            navigate('/IDE');
        });
    }
};

// methods to set value of state
const changeIdHandler = (event) => {
    setItemId(event.target.value);
}
const changeDescHandler = (event) => {
    setDesc(event.target.value);
};

const changeStatusHandler = (event) => {
    setStatus(event.target.value);
};

const changeMakeHandler = (event) => {
    setMake(event.target.value); 
};

const changeCtgHandler = (event) => {
    setCtg(event.target.value);
};

const changeValHandler = (event) => {
    setVal(event.target.value);
};

const cancel = () => {
  navigate('/IDE');
};

const getTitle = () => {
  if (id==='_add') {
      return <h1 className="text-center" style={{color: "white"}}>Add Item</h1>;
  } else {
      return <h1 className="text-center" style={{color: "white"}}>Update Item</h1>;
  }
};

  return (

    <div className='container'>
      {getTitle()}
      <Container fluid="md">
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Item Id</Form.Label>
                <Form.Control type="text" value={itemId} onChange={changeIdHandler} />
              </Form.Group>

            </Col>
            <Col>
              <Form.Label>Item Category</Form.Label>
              <Form.Select aria-label="Default select example" defaultValue={ctg} onChange={changeCtgHandler}>
                <option value="Furniture">Furniture</option>
                <option value="Stationary">Stationary</option>
                <option value="Crockery">Crockery</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Item Description</Form.Label>
                <Form.Control type="text" value={desc} onChange={changeDescHandler} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Item value</Form.Label>
                <Form.Control type="text" value={val} onChange={changeValHandler} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Issue Status</Form.Label>
                <Form.Select aria-label="Default select example" defaultValue={status} onChange={changeStatusHandler}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Item Make</Form.Label>
                <Form.Select aria-label="Default select example" defaultValue={make} onChange={changeMakeHandler}>
                  <option value="Wodden">Wodden</option>
                  <option value="Plastic">Plastic</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <button className="btn btn-success" onClick={saveOrUpdateItem}>Submit</button>
        <button className="btn btn-danger" onClick={cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
      </Container>
    </div>
  )
}

