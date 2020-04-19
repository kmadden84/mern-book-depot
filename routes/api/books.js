const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const Book = require('../../controllers/book');

//POST new user route (optional, everyone has access)

router.post('/create/:id', auth.required, Book.create);

router.get('/populate/:id', auth.required, Book.userByBook);

router.post('/delete/:id', auth.required, Book.delete);


module.exports = router;