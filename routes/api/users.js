const mongoose = require('mongoose');

const router = require('express').Router();
const auth = require('../auth');
const User = require('../../controllers/user');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, User.create)

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, User.login);

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, User.current);


router.post('/books/:id', auth.required, User.booksByUser);


module.exports = router;