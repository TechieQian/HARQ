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
    .then(lineitem => { lineitem.setPrice() })
}

Order.addProductToCart = ({cartId, productId, userId, option}) => {
	return Order.findById(cartId)
		.then(order => {
			return Order.createLineItem({ orderId: order.id, productId, option }).then(()=>order.setTotal())
		})
		.then(()=> {
			return Order.findById(cartId, {
				include : [{ model : LineItem, include : [Product] }]
			})
		})
}

Order.deleteLineItem = (lineItemId) => {
  return LineItem.destroy({
    where: {
      id: lineItemId
    }
  })
    .then(lineItem => { return lineItem } )
}

Order.prototype.setTotal = function(){
  return LineItem.findAll({
    where: {
      orderId: this.id
    }
  })
    .then(lineitems => {
      this.price = lineitems.reduce((sum, item)=>{
        return item.totalPrice + sum;
      }, 0)
    })
    .then(()=> this.save())
}

module.exports = Order;
