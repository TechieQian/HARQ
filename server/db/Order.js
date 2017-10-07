const db = require('./conn');
const { Sequelize } = db;
const User = require('./User');
const LineItem = require('./LineItem');

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

Order.addLineItem = ({userId, product}) => {
  User.findById(userId, { include: Order })
      .then(user => {
        Order.getActiveOrderByUser(user.id)
          .then(order => {
            LineItem.create()
              .then(lineItem => lineItem.setProduct(product))
              .then(lineItem => {lineItem.setOrder(order)})
          })
      })
}


module.exports = Order;
