const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');

Product.bulkCreate([
  { name: 'Happy' },
  { name: 'Sad' },
  { name: 'Angry' },
  { name: 'Jealous' },
  { name: 'Anxious' }
], {
  returning: true
})
  .then(([happy, sad, angry, jealous, anxious])=>{
    console.log('seeded!');
  })
