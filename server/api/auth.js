var router = require('express').Router();
const User = require('../db/User');
const passport = require('passport');

router.post('/', (req, res, next) => {

    User.login(req.body)
        .then(user => {
            delete user.dataValues.password;
            req.session.user = user;
            // console.log(user);
            res.send(user);
        })
        .catch(err => {
            res.status(401).send(err);
        });
});

router.post('/signup', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            delete user.dataValues.password;
            req.session.user = user;
            res.send(user);
        })
        .catch(next);
})

router.post('/logout', (req, res, next) => {
    delete req.session.user;
    res.send('logged out');
})

router.get('/me', (req, res, next) => {
    if(req.session.user) return res.send(req.session.user);
    res.send({});
})

// Google authentication and login
// Where the user requests login through Google
router.get('/google', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/login',
    failureRedirect: '/login'
  })
);
module.exports = router;
