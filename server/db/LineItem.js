const db = require('./conn');
const { Sequelize } = db;

const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  total: {
    type: Sequelize.INTEGER
  }
})

LineItem.prototype.setPrice = function() {
  return this.getProduct()
  .then(product => this.total=(product.price*this.qty))
}

LineItem.prototype.modifyQty = function(option) {
  option==='decrement' ? this.qty-- : this.qty++
  if(this.qty===0) {
    this.destroy()
     .catch(ex => console.log('Error: ', ex.message))
    }
  else{ return this.qty }
}

module.exports = LineItem;
