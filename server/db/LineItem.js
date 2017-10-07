const db = require('./conn');
const { Sequelize } = db;

const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})


module.exports = LineItem;
