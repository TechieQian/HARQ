const router = require('express').Router();
const User = require('../db/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; // for defining google strategy

require('dotenv').config();

// console.log("process.env.GOOGLE_CLIENT_SECRET=", process.env.GOOGLE_CLIENT_SECRET);

router.post('/', (req, res, next) => {

    User.login(req.body)
        .then(user => {
            delete user.dataValues.password;
            // req.session.user = user;
            req.login(user, function(err) {
              if (err) { return next(err); }
              return res.send(user);
            });
            // console.log(user);
            // res.send(user);
        })
        .catch(err => {
            res.status(401).send(err);
        });
});

router.post('/signup', (req, res, next) => {
    User.create(req.body)
        .then(user => {
            delete user.dataValues.password;
            // req.session.user = user;
            req.login(user, function(err) {
              if (err) { return next(err); }
              return res.send(user);
            });
            res.send(user);
        })
        .catch(next);
})

router.post('/logout', (req, res, next) => {
    delete req.session.user;
    // delete req.user;
    req.logout();
    res.send('logged out');
})

router.get('/me', (req, res, next) => {
    // if(req.session.user) return res.send(req.session.user);
    if(req.user) return res.send(req.user);
    res.send({});
})


// Defining What google strategy is, so passport knows what to do.
passport.use(
  new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK // This is the route for handling post-auth from google
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
        user = result[0];
        delete user.dataValues.password;
      done(null, user);
    })
    .catch(err => {
        // console.log('----------In the error of findOrCreate-------------------')
        // console.log('err is ', err)
        done(err);
    });
  })
);

// Getting user info into req.user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  User.findById(userId)
  .then(function (user) {
    delete user.dataValues.password;
    done(null, user);
  })
  .catch(done);
});

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
