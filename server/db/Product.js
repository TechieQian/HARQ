const db = require('./conn');
const { Sequelize } = db;

const Product = db.define('product',{
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Product;
