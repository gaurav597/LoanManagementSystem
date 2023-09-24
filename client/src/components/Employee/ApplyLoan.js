import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ApplyLoanService from "../../services/ApplyLoanService";
import EmployeeDashboard from "./EmployeeDashboard";
import ItemMasterService from "../../services/ItemMasterService";

export default function ApplyLoan() {
  const [itemId, setItemId] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [issueStatus, setIssueStatus] = useState("Y");
  const [itemMake, setItemMake] = useState("");
  const [issueId, setIssueId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [itemIds, setItemIds] = useState([]);

  useEffect(()=>{
    ItemMasterService.getItemIds().then((response)=>{
      setItemIds(response.data);
    })
   

  })

  function handleSubmit(e) {
    e.preventDefault();
    const Payload = {
      itemId,
      itemDescription,
      issueStatus,
      itemMake,
      itemCategory,
      issueId,
      employeeId,
      itemValuation: itemValue
    }

    const hi = ApplyLoanService.applyLoan(Payload).then((response) => { console.log(response) });

  }

  function handleItemIds(item) {
    console.log("hi there");
    console.log(item);
    ItemMasterService.getItemData(item).then((response)=>{
      setItemId(item)
      setItemCategory(response.data.itemCategory);
      setItemDescription(response.data.itemDescription);
      setItemMake(response.data.itemMake);
      setItemValue(response.data.itemValuation);
      setIssueStatus(response.data.issueStatus);
      console.log(response.data);
    })
    // ItemMasterService.getItemData(item).then((response)=>{
    //   console.log(response);
    // });
  }


  return (
    <div className="container" style={{backgroundColor:"white"}}>
      <h1>Apply for Loan</h1>
      <Container fluid="md">
        <Form>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Employee Id</Form.Label>
                <Form.Control
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Issue Id</Form.Label>
                <Form.Control
                  type="text"
                  value={issueId}
                  onChange={(e) => setIssueId(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Label>Item Id</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleItemIds(e.target.value)}
              >
              <option>Select Item Id</option>
                {itemIds.map((item)=>(
                  <option value={item}>{item}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Item Category</Form.Label>
              <Form.Control
                  readOnly
                  type="text"
                  value={itemCategory}
                />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Item Description</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Item value</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={itemValue}
                  onChange={(e) => setItemValue(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Issue Status</Form.Label>
                <Form.Control
                readOnly
                  type="text"
                  value={issueStatus}
                />
              </Form.Group>
            </Col>
            <Col>
            <Form.Group>
                <Form.Label>Item Make</Form.Label>
                <Form.Control
                  readOnly
                  type="text"
                  value={itemMake}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Apply
        </Button>
      </Container>
    </div>
  );
}
