`user strict`

const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
const app = express()
const path = require('path')

//TODO: Rav Integration
//1. Create seed file.
//2. Create npm seed in package.json
//3. Uncomment db
//4. Verify seeding works
const db = require('./db')
const { Product, Category } = db.models;

app.listen(PORT, (req,res)=> {
	console.log(`listening on ${PORT}`)
})

//Logging
app.use(morgan('dev'))

//TODO: Annie Integration
//1. Uncomment api
//2. do curl commands to test out routes and verify json
//app.use('/api', require('./api'))

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
