const db = require('./conn');
const { Sequelize } = db;
const User = require('./User');
const LineItem = require('./LineItem');
const Product = require('./Product');

const Order = db.define('order',{
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Order.getActiveOrderByUser = (userId) => {
  return Order.findOne({
    where: {
      userId: userId,
      active: true
    },
    include: [{
      model: LineItem,
      include: [Product]
    }]
  })
}

Order.createLineItem = ({orderId, productId}) => {
  return LineItem.findOne({
    where: {
      productId,
      orderId
    }
  })
    .then(lineItem => {
      if(lineItem) {
        return lineItem.update({ qty: lineItem.increment() })
      }
      else {
				return LineItem.create({productId, orderId})
      }
    })
}

Order.addProductToCart = ({cartId, productId, userId}) => {
	return Order.findById(cartId)
		.then(order => {
			if (!order) {
				Order.create({userId})
					.then((order)=> {
						return Order.createLineItem({ orderId: order.id, productId })
					})
			}
			else {
				return Order.createLineItem({ orderId: order.id, productId })
			}
		})
		.then(()=> {
			return Order.findById(cartId, {
				include : [{ model : LineItem, include : [Product] }]
			})
		})
		.catch((ex)=> {
			console.log('addProductToCart fail', ex)
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


module.exports = Order;
