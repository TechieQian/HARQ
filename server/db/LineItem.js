const db = require('./conn');
const { Sequelize } = db;

// added quantity column
// can we remove name column?
const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

LineItem.prototype.increment = function(action) {
  action==='decrement' ? this.qty-- : this.qty++
  return this.qty
}

module.exports = LineItem;
