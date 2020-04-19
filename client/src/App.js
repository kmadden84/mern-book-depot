import React, {useEffect, useContext} from 'react';
import { Container, Row } from 'react-bootstrap';

import logo from './logo.svg';
import './App.css';
import {Route, Switch, withRouter, useHistory} from 'react-router-dom';
import GlobalState from './context/GlobalState';
import BookContext from './context/book-context';

import AllBooks from './Components/AllBooks';
import MyBooks from './Components/MyBooks';
import CreateBook from './Components/CreateBook';
//import EditBook from './Components/EditBook';
import LogIn from './Components/LogIn';
import CreateAccount from './Components/CreateAccount';
import Header from './Components/Header';
import Footer from './Components/Footer';






const App = (props) => {

  const history = useHistory();
  const context = useContext(BookContext);

  useEffect(() => {

  if (localStorage.getItem('token') != null) {
    history.push("/mybooks");
  }
  
  }, [])

  return (
    <GlobalState {...props}>
      <Header {...props} />
      <Container >
      <Row>
        <Switch>
          <Route exact path="/" render={(props) => <AllBooks {...props} />} />
          <Route exact path="/mybooks" render={(props) => <MyBooks {...props} />} />
          <Route exact path="/createbook" render={(props) => <CreateBook {...props} />} />
          <Route exact path="/login" render={(props) => <LogIn {...props} />} />
          <Route exact path="/signup" exact={true} render={(props) => <CreateAccount {...props} />} />
        </Switch>
        </Row>
        </Container>
      <Footer {...props} />
    </GlobalState>
  );
}

export default App;
