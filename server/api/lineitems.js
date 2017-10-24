const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');
module.exports = router;

router.delete('/:lineItemId', (req, res, next) => {
  LineItem.findById(req.params.lineItemId)
          .then(lineItem => {
            lineItem.getOrder()
            .then(order => order.deleteLineItem(req.params.lineItemId)
            .then(lineItemId => {
              res.json(lineItemId)
            })
            .catch(next))
          })
});
