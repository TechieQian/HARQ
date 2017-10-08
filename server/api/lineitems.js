const router = require('express').Router();
const LineItem = require('../db/LineItem');
const Order = require('../db/Order');
const User = require('../db/User');
const Product = require('../db/Product');

module.exports = router;

router.get('/', (req, res, next) => {
  return LineItem.findAll({
    include: [{ all: true }]
  })
    .then(lineitems => res.send(lineitems));
});

router.get('/:userId/:orderId', (req, res, next) => {
  const orderId = req.params.orderId;
  const userId = req.params.userId;

  return LineItem.findAll({
    where: {
      orderId
    },
    include: [{ all: true }]
  })
    .then(lineitems => res.send(lineitems));
});

router.delete('/', (req, res, next) => {
});
