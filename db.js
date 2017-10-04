'use strict';
const Sequelize = require('sequelize');
const DATABASE_URL = process.env.DATABASE_URL || `postgres://localhost:5432/harq`;
const app = new Sequelize(DATABASE_URL, {
  logging: debug
});

const Product = app.define('product', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = {
  models: {
    Product
  }
};
