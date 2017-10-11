const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');
const User = require('./User');

const seed = () => {
    return Promise.all([
    Product.create({ name: 'Anger' }),
    Product.create({ name: 'Joy' }),
    Product.create({ name: 'Sadness' }),
    Product.create({ name: 'Disgust' }),
    Product.create({ name: 'Fear' }),
    Order.create(),
    User.create({ name: 'Rav', email: 'ravsworld@gmail.com', password: 'password' }),
    User.create({ name: 'Annie', email: 'annielovescode@gmail.com', password: 'password' })
  ])
    .then(([anger, joy, sadness, disgust, fear, order, Rav, Annie]) => {
          order.setUser(Rav)
          Order.addProductToCart({ cartId: 1, productId: fear.id })
    })
    .then(console.log('seeded!'))
}


module.exports = seed;
