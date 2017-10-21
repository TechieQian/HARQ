const db = require('./conn');
const { Sequelize } = db;

// added quantity column
// can we remove name column?
const LineItem = db.define('lineitem', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
},
{
  hooks: {
    afterCreate(item){
      item.setPrice()
    }
  }
})

LineItem.prototype.modifyQty = function(option) {
  option==='decrement' ? this.qty-- : this.qty++
  this.setPrice();
  if(this.qty===0) {
    this.destroy()
     .catch(ex => console.log('Error: ', ex.message))
    } 
  else{ return this.qty }
}

LineItem.prototype.setPrice = function(){
  return this.getProduct()
  .then(product => this.update({totalPrice: this.qty*product.price}))
  .catch(ex => console.log('ex: ', ex.message))
}

module.exports = LineItem;
