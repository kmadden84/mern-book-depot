import React, { useState } from 'react';
import { Route , withRouter} from 'react-router-dom';

import BookContext from './book-context';


const GlobalState = props => {

    const [isLoggedIn, setIsLoggedIn] = useState('false');

    const [currentUser, setCurrentUser] = useState((localStorage.getItem('user')) ? localStorage.getItem('user') : {
        id: '',
        email: '',
        token: ''
    });
    const [email, setEmail] = useState((localStorage.getItem('email') != null) ? JSON.parse(localStorage.getItem('email')): '');
    const [id, setId] = useState((localStorage.getItem('id') != null ) ? JSON.parse(localStorage.getItem('id')): '');
    const [token, setToken] = useState((localStorage.getItem('token') != null) ? JSON.parse(localStorage.getItem('token')): '');
    const [books, setBooks] = useState(null);


    const updateUser = (data) => {

        const {email, _id, token} = data.user;
        console.log(_id)
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('id', JSON.stringify(_id));
        localStorage.setItem('token', JSON.stringify(token));

        setToken(token);
        setId(_id);
        setEmail(email);
        setIsLoggedIn('true')

    }

    function alertCurrentUser() {
        alert(JSON.stringify(currentUser))

    }
    const logOut = () => {
        localStorage.clear();

        setToken('');
        setId('');
        setEmail('');
        setBooks(null);

       props.history.push('/login');
    }

    return (
        <BookContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                books: books,
                setBooks: setBooks,
                currentUser: currentUser,
                setCurrentUser: setCurrentUser,
                setIsLoggedIn: setIsLoggedIn,
                updateUser: updateUser,
                email: email,
                id: id,
                token: token,
                logOut: logOut
            }}
        >
            {props.children}
        </BookContext.Provider>
    );
};

export default GlobalState;
