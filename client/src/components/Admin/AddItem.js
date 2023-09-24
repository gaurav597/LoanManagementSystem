import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ItemService from "../../services/IDS";
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTag, faToggleOn, faCogs, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function AddItem() {
    const { itemId, setItemId, desc, setDesc, status, setStatus, make, setMake, ctg, setCtg, val, setVal } = useContext(AppContext);

    // methods to set value of state
    const changeIdHandler = (event) => setItemId(event.target.value);
    const changeDescHandler = (event) => setDesc(event.target.value);
    const changeStatusHandler = (event) => setStatus(event.target.value);
    const changeMakeHandler = (event) => setMake(event.target.value);
    const changeCtgHandler = (event) => setCtg(event.target.value);
    const changeValHandler = (event) => setVal(event.target.value);

    return (
        <Container fluid="md" className="py-4">
            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="itemIdInput">
                            <Form.Label><FontAwesomeIcon icon={faBox} className="mr-2" />Item Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter item ID" value={itemId} onChange={changeIdHandler} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="itemCategoryInput">
                            <Form.Label><FontAwesomeIcon icon={faTag} className="mr-2" />Item Category</Form.Label>
                            <Form.Select aria-label="Item Category" value={ctg} onChange={changeCtgHandler}>
                                <option value="Furniture">Furniture</option>
                                <option value="Stationary">Stationary</option>
                                <option value="Crockery">Crockery</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="itemDescriptionInput">
                            <Form.Label><FontAwesomeIcon icon={faTag} className="mr-2" />Item Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter item description" value={desc} onChange={changeDescHandler} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="itemValueInput">
                            <Form.Label><FontAwesomeIcon icon={faDollarSign} className="mr-2" />Item Value</Form.Label>
                            <Form.Control type="text" placeholder="Enter item value" value={val} onChange={changeValHandler} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="issueStatusInput">
                            <Form.Label><FontAwesomeIcon icon={faToggleOn} className="mr-2" />Issue Status</Form.Label>
                            <Form.Select aria-label="Issue Status" value={status} onChange={changeStatusHandler}>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="itemMakeInput">
                            <Form.Label><FontAwesomeIcon icon={faCogs} className="mr-2" />Item Make</Form.Label>
                            <Form.Select aria-label="Item Make" value={make} onChange={changeMakeHandler}>
                                <option value="Wooden">Wooden</option>
                                <option value="Plastic">Plastic</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}