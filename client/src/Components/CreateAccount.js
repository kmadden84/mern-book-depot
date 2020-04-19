
import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import BookContext from '../context/book-context';
import { useHistory } from "react-router-dom";

const CreateAccount = (props) => {

    const context = useContext(BookContext);
  const history = useHistory();
     useEffect(() => {
        console.log(context.id, context.email, context.token)

     }, [context.id, context.email, context.token])

    const [userInfo, setUserInfo] = useState({
        "name": '',
        "email": '',
        "password": ''
    });
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');


    const updateText = (e) => {
        const {name, value} = e.target;

        setUserInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const createAccount = (e) => {
        e.preventDefault();

        fetch('/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                "name": userInfo.name,
                "email": userInfo.email,
                "password": userInfo.password
                }
            })
        }).then((response) => {
            response.json()
            .then((data) => {
                console.log(data)
                console.log(response)
                if (response.status === 200) {
                    context.updateUser(data);
                    history.push("/mybooks");
                } else {
                    alert(JSON.stringify(data.errors))
                }          
                
            })
        }).catch((err) => alert(err))
     }
    return (    <Container>
      <Row style={{justifyContent:"center",marginTop:"20px"}}>
      <Col md={6} push={3}>

        <Form>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="name" name="name" onChange={(e) => updateText(e)} value={userInfo.name}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => updateText(e)} value={userInfo.email} />
                <Form.Text className="text-muted">
                    We'll never share your em4ail with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" name="password" onChange={(e) => updateText(e)} value={userInfo.password}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => createAccount(e)}>
                Submit
            </Button>
        </Form>
</Col></Row></Container>
   );
}

export default CreateAccount;
