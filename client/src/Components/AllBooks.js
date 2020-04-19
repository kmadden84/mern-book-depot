import React from 'react';
import { Jumbotron, Button, Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const AllBooks = (props) => {
    return ( <Container>
<Row>
<Col>
<Jumbotron style={{marginTop: "20px"}}> 
  <h1>Welcome to the Book Depot!</h1>
  <p>
Please create an account and you'll be able to start logging the books you've read, along with any notes you'd like to keep about the book!
  </p>
  <p>
    <Button variant="primary"><Link to="/signup" style={{color: "white"}}>Get Started!</Link></Button>
  </p>
</Jumbotron>
</Col>
</Row>
</Container> );
}
 
export default AllBooks;