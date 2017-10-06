const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');

const seed = () => {
    return Promise.all([
    Product.create({ name: 'Anger' }),
    Product.create({ name: 'Joy' }),
    Product.create({ name: 'Sadness' }),
    Product.create({ name: 'Disgust' }),
    Product.create({ name: 'Fear' }),
    Order.create({name: 'Annie\'s Order'})
  ])
    .then(([anger, joy, sadness, disgust, fear, order]) => {
      LineItem.create({ name: 'Annie\'s Cart'})
              .then(cart => {
                cart.setProduct(anger, joy)
              })
    })
    .then(console.log('seeded!'))
}

module.exports = seed;
