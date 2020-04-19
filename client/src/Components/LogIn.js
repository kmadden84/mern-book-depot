
import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import BookContext from '../context/book-context';
import { useHistory, Link } from "react-router-dom";


const LogIn = (props) => {

    const history = useHistory();
    const context = useContext(BookContext);

    useEffect(() => {
        console.log(context.id, context.email, context.token)

    }, [context.id, context.email, context.token])

    const [userInfo, setUserInfo] = useState({
        "email": '',
        "password": ''
    });

    const updateText = (e) => {
        const { name, value } = e.target;

        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const createAccount = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    "email": userInfo.email,
                    "password": userInfo.password,
                }
            })
        }).then((response) => {
            response.json()
                .then((data) => {
                    console.log(data)
                    console.log(response)
                    if (response.status === 200) {
                        context.updateUser(data);
                        setTimeout(function() {
                            history.push("/mybooks");
                        },1000)
                    } else {
                        alert(JSON.stringify(data.errors))
                    }
                })
        }).catch((err) => alert(err))
    }
    return (

    <Container>
<Row style={{justifyContent:"center",marginTop:"20px"}}>
<Col md={6} push={3}>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => updateText(e)} value={userInfo.email} />
                <Form.Text className="text-muted">
                    We'll never share your em4ail with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" name="password" onChange={(e) => updateText(e)} value={userInfo.password} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => createAccount(e)}>
                Submit
            </Button>
        </Form>
        <p>Don't have an account? <Link to="/signup">Sign-up here!</Link></p>
        </Col>
</Row>

        </Container>);
}

export default LogIn;