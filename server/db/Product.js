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
    type: Sequelize.STRING,
    defaultValue: "https://www.wired.com/wp-content/uploads/2015/05/ap_insideout_ff1.jpg"
  }
})

module.exports = Product;
