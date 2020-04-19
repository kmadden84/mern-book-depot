const mongoose = require('mongoose');

const passport = require('passport');
const User = mongoose.model('Users');
const Book = mongoose.model('Book');

module.exports = {
    create: async (req, res) => {
        const { body: { user } } = req;

        if (!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!user.password) {
            return res.statusCode(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        const finalUser = new User(user);

        finalUser.setPassword(user.password);

        return finalUser.save()
            .then(() => res.json({ user: finalUser.toAuthJSON() }));
    },
    login: async (req, res,  next) => {
        const { body: { user } } = req;

        if (!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();

                return res.json({ user: user.toAuthJSON() });
            }

            return res.status(400).json(info);
        })(req, res, next);
    },
    current: async (req, res) => {
        const { payload: { id } } = req;

        return Users.findById(id)
            .then((user) => {
                if (!user) {
                    return res.sendStatus(400);
                }

                return res.json({ user: user.toAuthJSON() });
            });
    },
    booksByUser : async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id).populate('books');
 
         res.send(user.books);
     }
}