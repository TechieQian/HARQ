const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');
const User = require('./User');

const seed = () => {
    return Promise.all([
    Product.create({ name: 'Anger', price : 100 }),
    Product.create({ name: 'Joy', price : 52 }),
    Product.create({ name: 'Sadness', price : 5 }),
    Product.create({ name: 'Disgust', price : 94 }),
    Product.create({ name: 'Fear', price : 88 }),
    User.create({ name: 'Rav', email: 'ravsworld@gmail.com', password: 'password' }),
    User.create({ name: 'Annie', email: 'annielovescode@gmail.com', password: 'password' }),
    User.create({ name: 'admin', email: 'admin@gmail.com', password: 'admin', admin: true })
  ])
		.then(([anger, joy, sadness, disgust, fear, Rav, Annie]) => {
			Promise.all([
				Order.create({userId : Rav.id, active : false}),
				Order.create({active : false})
			])
				.then(([ravorder, anonorder])=> {
					LineItem.create({ orderId	: ravorder.id, productId: fear.id })
					LineItem.create({ orderId : anonorder.id, productId : fear.id })
				})
    })
    .then(console.log('seeded!'))
}


module.exports = seed;
