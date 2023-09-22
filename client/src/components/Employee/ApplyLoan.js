import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ApplyLoanService from "../../services/ApplyLoanService";
import EmployeeDashboard from "./EmployeeDashboard";

export default function ApplyLoan() {
  const [itemId, setItemId] = useState("");
  const [itemCategory, setItemCategory] = useState("Furniture");
  const [itemDescription, setItemDescription] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [issueStatus, setIssueStatus] = useState("Y");
  const [itemMake, setItemMake] = useState("Wodden");
  const [issueId, setIssueId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

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
      issueDate,
      returnDate,
      itemValuation: itemValue
    }

    const hi = ApplyLoanService.applyLoan(Payload).then((response) => { console.log(response) });

  }


  return (
    <div className="container">
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Item Id</Form.Label>
                <Form.Control
                  type="text"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Item Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setItemCategory(e.target.value)}
              >
                <option value="Furniture">Furniture</option>
                <option value="Stationary">Stationary</option>
                <option value="Crockery">Crockery</option>
              </Form.Select>
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
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setIssueStatus(e.target.value)}
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Item Make</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setItemMake(e.target.value)}
                >
                  <option value="Wodden">Wodden</option>
                  <option value="Plastic">Plastic</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Issue Date</Form.Label>
                <Form.Control
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Return Date</Form.Label>
                <Form.Control
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
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
