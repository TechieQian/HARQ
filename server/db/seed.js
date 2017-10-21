const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');
const User = require('./User');

const sadness_img = 'http://vignette4.wikia.nocookie.net/disney/images/8/82/SADNESS_Fullbody_Render.png/revision/latest?cb=20150615091236'
const joy_img = 'https://vignette3.wikia.nocookie.net/disney/images/c/c0/Joy_1.jpg/revision/latest?cb=20150622135833'
const anger_img = 'https://vignette.wikia.nocookie.net/disney/images/9/9c/Anger-inside-out.png/revision/latest?cb=20151120110950'
const disgust_img = 'https://vignette3.wikia.nocookie.net/disney/images/c/c1/DISGUST_Fullbody_Render.png/revision/latest?cb=20150615095437'
const fear_img = 'https://vignette2.wikia.nocookie.net/disney/images/b/b1/FEAR_Fullbody_Render.png/revision/latest?cb=20150615091325'

const seed = () => {
    return Promise.all([
    Product.create({ name: 'Anger', price : 100, image: anger_img }),
    Product.create({ name: 'Joy', price : 52, image: joy_img }),
    Product.create({ name: 'Sadness', price: 5, image: sadness_img }),
    Product.create({ name: 'Disgust', price: 94, image: disgust_img  }),
    Product.create({ name: 'Fear', price: 88, image: fear_img }),
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
