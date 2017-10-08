const db = require('./conn');
const { Sequelize } = db;
const Order = require('./Order');

const User = db.define('user',{
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true        //isEmail covers notNull
    }
  },
  password: {
    type: Sequelize.STRING,
    len: [8, 40]            //password must be atleast 8 char long
  }
})

module.exports = User;
