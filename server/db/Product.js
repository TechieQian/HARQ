const db = require('./conn');
const { Sequelize } = db;

const Product = db.define('product',{
  name: {
		type: Sequelize.STRING
	},
	description : {
		type : Sequelize.TEXT,
		defaultValue : 'This product has no description'
	}
})

module.exports = Product;
