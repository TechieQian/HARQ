const db = require('./conn');
const { Sequelize } = db;
const Order = require('./Order');
const LineItem = require('./LineItem');

const Product = db.define('product',{
  name: {
    type: Sequelize.STRING
  }
})

// need productId, orderId to add to LineItem table
// should add a completely new lineItem
Product.addProductToCart = ({orderId, productId}) => {
  // no name for lineitem. don't think we need name
  return LineItem.create({})
    .then(lineItem => {
      lineItem.setProduct(productId);
      lineItem.setOrder(orderId);
    });
};

// delete product entirely from cart
Product.deleteProductFromCart = ({ orderId, productId }) => {
  return Product.destroy({
    where: {
      orderId, productId
    }
  });
};

// could potentially use the same function for item.quantity--
// this for now takes care of increasing quantity by 1
Product.prototype.updateProductInCart = ({orderId, productId}) => {
  return this.update({ quantity: this.quantity++ }, {
    where: {
      orderId, productId
    }
  });
};

module.exports = Product;
