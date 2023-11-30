import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom"
import { FaBars, FaCog, FaFilter, FaBookOpen, FaEyeSlash, FaPlus, FaCheck, FaCode, FaRegTrashAlt, FaEllipsisV, FaUndo, FaRedo, FaBook } from "react-icons/fa"
import { BsChatLeftText, BsGlobe } from "react-icons/bs"

import React, { setState, useEffect, useState, formData } from "react"


export default function Editor(){

//   var id = 0 // ВРЕМЕННАЯ ФИГНЯ, ПОТОМ ПЕРЕДЕЛАТЬ
//   let navigate = useNavigate(); 
//   const routeChange = () =>{ 
//   let path = '/project/:id'; 
//   navigate(path);
//   }

  return (
  <>
    <header>
    <Container fluid className="py-1 border-bottom d-flex flex-wrap justify-content-between">
      <div className="d-inline-flex align-items-center">
        <Button variant="outline-dark"><FaBars style={{marginBottom: "3px"}}/></Button>        
      </div>
      <div className="d-inline-flex align-items-center">
        <h3 className="pt-1">Проект: Раздел</h3>
      </div>
      <div className="d-inline-flex align-items-center">
        <Button variant="outline-dark"><FaCog style={{marginBottom: "3px"}}/></Button>
      </div>
    </Container>
    
    <Container fluid className="row py-1 d-flex flex-wrap justify-content-between">
      <Col>
        <div className="py-1 d-inline-flex align-items-center">
          <Button variant="link"><FaUndo style={{marginBottom: "3px"}}/></Button>
          <Button variant="link"><FaRedo style={{marginBottom: "3px"}}/></Button>
          <Button variant="outline-primary" style={{marginLeft: "10px"}}><FaFilter style={{marginBottom: "3px"}}/></Button>
          <Button variant="outline-primary" style={{marginLeft: "10px"}}><FaBookOpen style={{marginBottom: "3px"}}/></Button>
          <Button variant="outline-primary" style={{marginLeft: "10px"}}><FaCode style={{marginBottom: "3px"}}/></Button>
          <Button variant="outline-primary" style={{marginLeft: "10px"}}><FaPlus style={{marginBottom: "3px"}}/></Button>
          <Form style={{marginLeft: "10px"}}>
            <Form.Group controlId="pieceSearch">
              <Form.Control type="search" placeholder="Поиск..."/>
            </Form.Group>
          </Form>
        </div>
      </Col>
      <Col>
        <div className="py-1 d-inline-flex align-items-center">
          <Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><FaCheck style={{marginBottom: "3px"}}/></Button>
          <Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><FaEyeSlash style={{marginBottom: "3px"}}/></Button>
          <Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><FaRegTrashAlt style={{marginBottom: "3px"}}/></Button>
          <Button disabled variant="outline-secondary" style={{marginLeft: "10px"}}><FaEllipsisV style={{marginBottom: "3px"}}/></Button>
        </div>
      </Col>
      <Col>
      </Col>
    </Container>
  </header>

  <Container fluid>
      <Row>
        <Col className="border" ></Col>
        <Col className="border" md={4}>
          <Button variant="info" style={{margin: "10px 0px 0px 0px"}}><FaPlus style={{marginBottom: "3px"}}/></Button>
        </Col>
        <Col className="border d-flex flex-column" md="auto">
          <Button variant="outline-primary" style={{margin: "10px 0px 0px 0px"}}><FaBook style={{marginBottom: "3px"}}/></Button>
          <Button variant="outline-primary" style={{margin: "10px 0px 0px 0px"}}><BsChatLeftText style={{marginBottom: "3px"}}/></Button>
          <Button variant="outline-primary" style={{margin: "10px 0px 10px 0px", height: "100%"}}><BsGlobe style={{marginBottom: "3px"}}/></Button>
        </Col>
      </Row>
  </Container>
  </>
  );
}