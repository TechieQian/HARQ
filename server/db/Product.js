const db = require('./conn');
const { Sequelize } = db;

const Product = db.define('product',{
  name: {
		type: Sequelize.STRING
	},
	price : {
		type : Sequelize.INTEGER,
		defaultValue : 0 
	}
})

module.exports = Product;
