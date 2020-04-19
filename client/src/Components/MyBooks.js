import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container, Accordion, Card } from 'react-bootstrap';
import BookContext from '../context/book-context';

const MyBooks = (props) => {

  const context = useContext(BookContext);

  const [allBooks, setAllBook] = useState('');


  useEffect(() => {

    const fetchBooks = () => {
      const id = context.id;
      const token = context.token;

      console.log(id)
      console.log(token)
      const url = 'http://localhost:8000/api/books/populate/' + id;
      fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.length && context.savedBook == null) {
            context.setBooks(data)
            alert('successfully loaded books')
          } else if (!data.length) {
            alert('you have no books - consider adding some!')
          }
          else {
            alert(JSON.stringify(data.errors))
          }
        }).catch((err) => alert(err));

    }
    fetchBooks();
    console.log(context.books)

  }, [])

  const addBook = (e) => {

    e.preventDefault();

    if (context.books !== null) {
      context.setBooks([...context.books, {
        title: 'Enter Book Title'
      }])
    } else {
      context.setBooks([{ title: 'Enter Book Title' }])
    }
  }

  const updateText = (e) => {

    const { name, value } = e.target;

    let index = e.target.getAttribute('data-tag');
    let newArr = [...context.books];
    newArr[index][name] = value;

    context.setBooks(newArr)
  }


  const saveBook = (e) => {
    e.preventDefault();

    let checkfailed;
    context.books.forEach(function(item, index) {
      if (item["title"] === undefined || item["pubDate"] === undefined || item["author"] === undefined ) {
        alert('Title, author and publication date are all required to save');
        checkfailed = true;
        return false;
      }
    })

    if (checkfailed == true) {
      return false;
    }

    fetch('http://localhost:8000/api/books/create/' + context.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${context.token}`
      },
      body: JSON.stringify(context.books)
    }).then((response) => {
      response.json()
        .then((data) => {
          console.log(data)
          console.log(response)
          if (response.status === 200) {
            alert('successfully saved')
          } else {
            alert(JSON.stringify(data.errors))
          }

        }).catch((err) => alert(err));
    })
  }


  const readBook = (e) => {
    var id = e.target.getAttribute("id");
    var parentDiv = document.querySelectorAll('.accordion');

    parentDiv.forEach(function(item, index) {
      console.log(index)
      console.log(item)
      if (item.getAttribute('id') == id) {
         item.classList.add("bookread");
       }
    })



    console.log(parentDiv);

  }
  const deleteBook = (e) => {

    const id = e.target.getAttribute("id");

    const verify = window.confirm("Deletions are final, are you sure?");

    if (verify == false) {
      return false;
    } else {
    fetch('http://localhost:8000/api/books/delete/' + context.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${context.token}`
      },
      body: JSON.stringify({
        _id: id
      })
    }).then((response) => {
      response.json()
        .then((data) => {
          console.log(data)
          console.log(response)
          if (response.status === 200) {
            alert('successfully deleted')
            window.location.reload();
          } else {
            alert(JSON.stringify(data.errors))
          }

        }).catch((err) => alert(err));
    })
  }
  }


  return (

      <div className="col-md-12">
      <Button variant="primary" name="book" style={{ marginTop: "20px", marginBottom: "20px" }} onClick={(e) => addBook(e)}>Add Book +</Button>

        <Form>

          {
            (context.books != null)
              ? context.books.map((book, index) => {
                return (
                  <Accordion className="col-md-12" id={index}>
                    <Card className="col-md-12">
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          {book.title}
                        </Accordion.Toggle>
                        {
                          (book._id) 
                          ? <div className="bookActions"><div className="delete" id={book._id} onClick={(e) => deleteBook(e) }>Delete</div></div> 
                          : ''
                        }
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Col md={4}>
                            <Form.Group controlId={"formBasicTitle" + index} id={index}>
                              <Form.Control type="text" placeholder="Enter Title..." name="title" onChange={(e) => updateText(e)} value={book.title} data-tag={index} />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <Form.Group controlId={"formBasicAuthor" + index} id={index}>
                              <Form.Control type="text" placeholder="Enter Author..." name="author" onChange={(e) => updateText(e)} value={book.author} data-tag={index} />
                            </Form.Group>
                          </Col>

                          <Col md={4}>
                            <Form.Group controlId={"formBasicLength" + index} id={index}>
                              <Form.Control type="text" placeholder="Enter book length..." name="length" onChange={(e) => updateText(e)} value={book.length} data-tag={index} />
                            </Form.Group> </Col>
                          <Col md={4}>
                            <Form.Group controlId={"formBasicPubDate" + index} id={index}>
                              <Form.Control type="text" placeholder="Date of publication" name="pubDate" onChange={(e) => updateText(e)} value={book.pubDate} data-tag={index} />
                            </Form.Group></Col>
          
                          <Col md={4}>
                            <Form.Group controlId={"formBasicCreatedBy" + index} id={index}>
                              <Form.Control type="text" placeholder={context.email} name="createdby" disabled="disabled" value={context.currentUser.email} data-tag={index} />
                            </Form.Group>
                          </Col>
                          {
                        (book._id) 
                        ?  <Col md={4}>
                            <Form.Group controlId={"formBasicNotes" + index} id={index}>
                              <Form.Control type="text" disabled="disabled" placeholder="Relevant Notes" name="Notes" onChange={(e) => updateText(e)} value={book._id} data-tag={index} />
                            </Form.Group>
                          </Col>
                         : ''
                          }
                          <Col md={12}>
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                             <Form.Label>Relevant Notes</Form.Label>
                              <Form.Control as="textarea" rows="3"  placeholder="Relevant Notes" name="Notes"onChange={(e) => updateText(e)} value={book.Notes} data-tag={index}/>
                           </Form.Group>
                           </Col>

              
                        </Card.Body>
   
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                )
              })
              : ''}

              {
             (context.books)   
          ? <Button style={{ marginTop: "20px", marginBottom: "20px" }} variant="primary" type="submit" onClick={(e) => saveBook(e)}>Save Book</Button>
          : ''
              }
        </Form>
  
        </div>

  );
}

export default MyBooks;