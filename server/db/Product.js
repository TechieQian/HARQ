const db = require('./conn');
const { Sequelize } = db;

const Product = db.define('product',{
  name: {
		type: Sequelize.STRING
	},
	price : {
		type : Sequelize.INTEGER,
		defaultValue : 0
  },
	description : {
		type : Sequelize.TEXT,
		defaultValue : 'This product has no description'
	},
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Product;
