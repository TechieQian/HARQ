`user strict`

const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 1337
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

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
