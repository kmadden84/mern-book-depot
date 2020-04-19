import React from 'react';

export default React.createContext({



  books: [
    { 
    title: '', 
    author: '',
    length: '',
    pubDate: '',
    Notes: '',
    createdby: '',
    _id: '',
  }],
  user: {
    id: '',
    email: '',
    token: ''
  },

  isLoggedIn: false,
  savedBook: null,
  token: (localStorage.getItem('token') != null) ? JSON.parse(localStorage.getItem('token')): '',
  id: (localStorage.getItem('id') != null ) ? JSON.parse(localStorage.getItem('id')): '',
  email: (localStorage.getItem('email') != null) ? JSON.parse(localStorage.getItem('email')): '',
  currentUser: (localStorage.getItem('user')) ? localStorage.getItem('user') : '',
  addProductToCart: product => {},
  removeProductFromCart: productId => {},
  updateUser: data => {},
  logOut: () => {},
  fetchBooks: () => {}

});
