const db = require('./conn');
const { Sequelize } = db;

// added quantity column
// can we remove name column?
const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

LineItem.prototype.increment = function() {
  this.qty++
  return this.qty
}
// originally thought we could use a hook to update quantity
// but realized that the only reason I am updating a lineItem
// is when I update the quantity so seemed superfluous

// LineItem.hook('beforeUpdate', (item) => {
//   item.quantity++;
// });

module.exports = LineItem;
