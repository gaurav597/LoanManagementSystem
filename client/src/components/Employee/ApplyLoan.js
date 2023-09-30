import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ApplyLoanService from "../../services/ApplyLoanService";
import ItemMasterService from "../../services/ItemMasterService";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context";
export default function ApplyLoan(props) {
  const {
    itemId, setItemId,
    itemCategory, setItemCategory,
    itemDescription, setItemDescription,
    itemValue, setItemValue,
    issueStatus, setIssueStatus,
    itemMake, setItemMake,
    issueId, setIssueId,
    employeeId, setEmployeeId,
    issueDate, setIssueDate,
    returnDate, setReturnDate,
    itemIds, setItemIds,
    successMessage, setSuccessMessage,
    errors, setErrors,
  } = useContext(AppContext);

  useEffect(() => {
    ItemMasterService.getItemIds().then((response) => {
      setItemIds(response.data);
    })
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();
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
    try {
      const res = await ApplyLoanService.applyLoan(Payload);
      if (res.status === 200) {
        alert("Loan Applied Successfully");
        setSuccessMessage("Loan Applied successfully!");
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  function handleItemIds(item) {
    ItemMasterService.getItemData(item).then((response) => {
      setItemId(item)
      setItemCategory(response.data.itemCategory);
      setItemDescription(response.data.itemDescription);
      setItemMake(response.data.itemMake);
      setItemValue(response.data.itemValuation);
      setIssueStatus(response.data.issueStatus);
    })
  }


  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      {/* <br />
      <h1>Apply for Loan</h1>
      <br /> */}
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
                  className={errors.employeeId && "error"}
                />
                {errors.employeeId && (
                  <p className="error-message">{errors.employeeId}</p>
                )}
              </Form.Group>
            </Col>

            <Col>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Issue Id</Form.Label>
                <Form.Control
                  type="text"
                  value={issueId}
                  onChange={(e) => setIssueId(e.target.value)}
                  className={errors.issueId && "error"}
                />
                {errors.issueId && (
                  <p className="error-message">{errors.issueId}</p>
                )}
              </Form.Group> */}
              <Form.Label>Item Id</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleItemIds(e.target.value)}
                name="itemIds"
                className={errors.itemIds && "error"}
              >
                <option>Select Item Id</option>
                {itemIds.map((item) => (
                  <option value={item}>{item}</option>
                ))}
                {errors.itemIds && (
                  <p className="error-message">{errors.itemIds}</p>
                )}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Item Category</Form.Label>
              <Form.Control
                readOnly
                type="text"
                value={itemCategory}
              />
            </Col>
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
          </Row>
          <Row>
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
          </Row>
          <Row>
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
            <Col>

            </Col>
          </Row>
        </Form>
        {/* <Button variant="primary" type="submit" onClick={handleSubmit}>
          Apply
        </Button> */}
        <br /> <br />
        {/* {errorMsg && <p className="error-message">{errorMsg}</p>} */}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </Container>
    </div>
  );
}
