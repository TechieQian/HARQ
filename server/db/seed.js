const db = require('./conn');
const { Sequelize } = db;

//Models
const Product = require('./Product');
const LineItem = require('./LineItem');
const Order = require('./Order');

db.sync({ force:true })
  .then(() => {
    Product.bulkCreate([
      { name: 'Anger' },
      { name: 'Joy' },
      { name: 'Sadness' },
      { name: 'Disgust' },
      { name: 'Fear' }
    ], {
      returning: true
    })
      .then(([happy, sad, angry, jealous, anxious])=>{
        console.log('seeded!');
      })
  })
