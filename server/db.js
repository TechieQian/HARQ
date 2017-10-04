'use strict'

const Sequelize = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/harq';
const db = new Sequelize(DATABASE_URL, {
  logging: false
});

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  }
})

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = {
  db,
  models: {
    Product,
    Category
  }
};
