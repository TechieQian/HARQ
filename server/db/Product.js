const db = require('./conn');
const { Sequelize } = db;
const Order = require('./Order');
const LineItem = require('./LineItem');

const Product = db.define('product',{
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Product;
