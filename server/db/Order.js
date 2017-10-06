const db = require('./conn');
const { Sequelize } = db;

const Order = db.define('order',{
  name: {
    type: Sequelize.STRING
  }
})


module.exports = Order;
