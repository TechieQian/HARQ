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

LineItem.prototype.modifyQty = function(option) {
  option==='decrement' ? this.qty-- : this.qty++
  if(this.qty===0) {
    return this.destroy()
               .then(()=>console.log('LI Deleted'))
  } else{ return this.qty }
}

module.exports = LineItem;
