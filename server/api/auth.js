var router = require('express').Router();
const User = require('../db/User');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

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

passport.use(
  new GoogleStrategy({
    clientID: '481143342506-5vfrcabli7kg8ja9l94q4d3d13395i65.apps.googleusercontent.com',
    clientSecret: 'TLsJrmWDwu5BT4GDBRVkErom',
    callbackURL: '/api/auth/google/callback' // This is the route for handling post-auth from google
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    let info = {
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    // console.log(profile);
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .then(function (result) { // findOrCreate returns an array [user, boolean(true: created, false: existing)]
        // console.log('----------In the then of findOrCreate--------------------')
      done(null, result[0]);
    })
    .catch(err => {
        // console.log('----------In the error of findOrCreate-------------------')
        // console.log('err is ', err)
        done(err);
    });

    // console.log('---', 'in verification callback', profile, '---');
    // done();
  })
);



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
