`user strict`

const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

//TODO: Rav Integration
//1. Create seed file.
//2. Create npm seed in package.json
//3. Uncomment db
//4. Verify seeding works
const db = require('./db')



app.listen(PORT, (req,res)=> {
	console.log(`listening on ${PORT}`)
})

//Logging
app.use(morgan('dev'))

//TODO: Annie Integration
//1. Uncomment api
//2. do curl commands to test out routes and verify json
//app.use('/api', require('./api'))

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))

// send index html page
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
)

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
)
