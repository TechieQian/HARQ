`user strict`

const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 1337
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session');
const nodemailer = require('nodemailer');

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
// app.use(function (req, res, next) {
//   console.log('session', req.session);
//   next();
// });

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.post('/submitted', (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const cart = req.body.cart;
	const orderId = req.body.orderId;

	const cartHtml = (name, cart, orderId) => {
		const html = cart.map(cart => {
			return `<li>${cart.product.name} x${cart.qty}</li>`
		})

		return `<h1>${name}, this is your order confirmation:</h1><p>Order ID: ${orderId}</p>` + html.join('');
	}

	let transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
					user: 'tzzs5oinndr4qwc3@ethereal.email', // generated ethereal user
					pass: 'JNSZxxuSaB9FsQ2ANV'  // generated ethereal password
			}
	});

	// setup email data with unicode symbols
	let mailOptions = {
			from: '"HARQ 👻" <HARQ@gmail.com>',
			to: email, // list of receivers
			subject: 'Thank you for your order, ' + name,
			html: cartHtml(name, cart, orderId)
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
					return console.log(error);
			}
			console.log('Message sent: %s', info.messageId);
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		})
});

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
