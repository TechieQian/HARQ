`user strict`

const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 1337
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session');





// database
const db = require('./db');
const seed = require('./db/seed');

db.sync({ force: true })
	.then(()=>{
		seed();
	})
	.then(() => {
		app.listen(PORT, (req,res)=> {
			console.log(`listening on ${PORT}`)
		})
	})


// logging
app.use(morgan('dev'))

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Session should be established before any routing
app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'harqiscool', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUninitialized: false
}));

// Session logging for easier debugging
app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))

// api routing
app.use('/api', require('./api'))

// send index html page
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
)

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
)
