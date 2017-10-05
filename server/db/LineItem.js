const db = require('./conn');
const { Sequelize } = db;

const LineItem = db.define('lineitem', {
  name: {
    type: Sequelize.STRING
  }
})


module.exports = LineItem;
