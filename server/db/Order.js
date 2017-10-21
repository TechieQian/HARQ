const db = require('./conn');
const { Sequelize } = db;
const User = require('./User');
const LineItem = require('./LineItem');
const Product = require('./Product');

const Order = db.define('order',{
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Order.prototype.setTotal = function() {
    return LineItem.findAll({
      where: {
        orderId: this.id
      }
    })
    .then(lineitems => {
      this.price = lineitems.reduce((sum, item)=>{
        return sum + item.price
      }, 0)
    })
    .then(()=>this.save())
}

Order.getOrdersByUser = (userId) => {
  return Order.findAll({
    where: {
      userId: userId
    },
    include: [{
      model: LineItem,
      include: [Product]
    }]
  })
}

Order.createLineItem = ({orderId, productId, option }) => {
  return LineItem.findOne({
    where: {
      productId,
      orderId
    }
  })
    .then(lineItem => {
      if(lineItem) {
        return lineItem.update({ qty: lineItem.modifyQty(option) })
      }
      else {
				return LineItem.create({productId, orderId})
      }
    })
}

Order.addProductToCart = ({cartId, productId, userId, option}) => {
	return Order.findById(cartId)
		.then(order => {
			return Order.createLineItem({ orderId: order.id, productId, option })
      .then((lineItem)=>{
        return lineItem.setPrice().then(()=> order.setTotal().then(()=>{
          Order.findById(cartId).then(cart => console.log('CART', cart))
      			return Order.findById(cartId, {
      				include : [{ model : LineItem, include : [Product] }]
      			})
          }))
        })
		})
}

Order.prototype.deleteLineItem = function(lineItemId) {
  return LineItem.destroy({
    where: {
      id: lineItemId
    }
  })
    .then(() => { this.setTotal() } )
}

module.exports = Order;
