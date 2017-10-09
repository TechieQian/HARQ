const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');
module.exports = router;

router.get('/', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => res.send(order))
})


router.delete('/:lineItemId', (req, res, next) => {
  Order.deleteLineItem(req.params.lineItemId)
       .then(res.redirect('/'))
       .catch(next)
});
