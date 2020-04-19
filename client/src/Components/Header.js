import React, { useContext } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import {Link} from 'react-router-dom';

import BookContext from '../context/book-context';

const Header = (props) => {

    const context = useContext(BookContext)

    return ( 
      <div className="header">
        <Container>
        <Row>
        <Col>Kevin's Book Depot App</Col>

        <Col>{(context.email) ? <a href={"mailto:" + context.email}>{context.email}</a>  : ''}</Col>

        {
        (context.token) 
        ?<Col><div onClick={() => context.logOut()} className="logOut">Log Out</div></Col>
        :<Col><Link to="/signup">Sign Up</Link> | <Link to="/login">Log In</Link></Col>
        }

        </Row>
        </Container>
        </div>
       );
}
 
export default Header;