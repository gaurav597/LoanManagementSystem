import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ItemMasterService from "../../services/ItemMasterService";
import ItemDataManagement from './ItemDataManagement';

export default function AddItem() {
  const [itemId, setItemId] = useState("");
  const [itemCategory, setItemCategory] = useState("Furniture");
  const [itemDescription, setItemDescription] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [issueStatus, setIssueStatus] = useState("Y");
  const [itemMake, setItemMake] = useState("Wodden");


  function handleSubmit(e) {
    e.preventDefault();
    const Item = {
      itemId,
      itemDescription,
      issueStatus,
      itemMake,
      itemCategory,
      itemValuation: itemValue
    }
    const hi = ItemMasterService.addItem(Item).then((response) => { console.log(response) });

  }

  return (
<React.Fragment>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg-item">Add Item</button>
            
            <div class="modal fade bd-example-modal-lg-item" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title" id="exampleModalLabel">Add Item Data</h1>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div className='container'>
      <Container fluid="md">
        <Form>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Item Id</Form.Label>
                <Form.Control type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} />
              </Form.Group>

            </Col>
            <Col>
              <Form.Label>Item Category</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => setItemCategory(e.target.value)}>
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
                <Form.Control type="text" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Item value</Form.Label>
                <Form.Control type="text" value={itemValue} onChange={(e) => setItemValue(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Issue Status</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setIssueStatus(e.target.value)}>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Item Make</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setItemMake(e.target.value)}>
                  <option value="Wodden">Wodden</option>
                  <option value="Plastic">Plastic</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button variant="primary" data-dismiss="modal" type="submit" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ItemDataManagement/>
        </React.Fragment>
   
  )
}

