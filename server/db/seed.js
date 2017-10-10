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
    Product.create({ name: 'Joy', price : 5 }),
    Product.create({ name: 'Sadness' }),
    Product.create({ name: 'Disgust' }),
    Product.create({ name: 'Fear' }),
    Order.create(),
    User.create({ name: 'Rav', email: 'ravsworld@gmail.com', password: 'password' }),
    User.create({ name: 'Annie', email: 'annielovescode@gmail.com', password: 'password' })
  ])
    .then(([anger, joy, sadness, disgust, fear, order, Rav, Annie]) => {
          order.setUser(Rav)
          Order.addProductToCart({ userId: Rav.id, productId: fear.id })
          Order.addProductToCart({ userId: Annie.id, productId: disgust.id })
    })
    .then(console.log('seeded!'))
}


module.exports = seed;
