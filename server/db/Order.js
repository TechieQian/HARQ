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
    include: [LineItem]
  })
  .then(order => {
    if(!order) {
      return Order.create({ userId: userId })
    }
    else {
      return order
    }
  })
}

Order.createLineItem = ({orderId, productId}) => {
  LineItem.findOne({
    where: {
      productId: productId
    }
  })
    .then(lineItem => {
      if(lineItem) {
        lineItem.update({ qty: lineItem.increment() })
      }
      else {
        LineItem.create()
          .then(lineItem => {
            Product.findById(productId)
              .then(product => lineItem.setProduct(product))
              .then(() => {
                Order.findById(orderId)
                  .then(order => lineItem.setOrder(order))
              })
          })
      }
    })
}

Order.addLineItem = ({userId, productId}) => {
  return User.findById(userId, { include: Order })
      .then(user => {
        Order.getActiveOrderByUser(userId)
          .then(order => {
            Order.createLineItem({ orderId: order.id, productId })
          })
      })
      .then(() => { return Order.getActiveOrderByUser(userId) })
}


module.exports = Order;
