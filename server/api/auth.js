var router = require('express').Router();
const User = require('../db/User');

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
            console.log(user)
            // delete user.dataValues.password;
            req.session.user = user;
            res.send(user);
        })
        .catch(next);
})

router.post('/logout', (req, res, next) => {
    delete req.session.user;
    res.send('logged out');
})

module.exports = router;
