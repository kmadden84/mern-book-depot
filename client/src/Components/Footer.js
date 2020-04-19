import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';

import BookContext from '../context/book-context';

const Footer = (props) => {
  
  var date = new Date().getFullYear();

    return ( 

<div className="footer">
        <Container>
        <Row>
        <Col> © Copyright Kevin Madden {date}</Col>
        

        </Row>
        </Container>
        </div>
);
}
 
export default Footer;