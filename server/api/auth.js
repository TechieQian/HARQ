var router = require('express').Router();
const User = require('../db/User');

router.post('/', (req, res, next) => {

    User.login(req.body)
        .then(user => {
            // req.session.userId = user.id;
            // user.password = null;
            // delete user.dataValues.password;
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
            res.send(user);
        })
        .catch(next);
})

module.exports = router;
