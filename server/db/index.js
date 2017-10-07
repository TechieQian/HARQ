const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');

//Associations
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);


module.exports = db;
