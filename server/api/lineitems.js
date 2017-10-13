const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');
module.exports = router;

router.delete('/:lineItemId', (req, res, next) => {
  Order.deleteLineItem(req.params.lineItemId)
       .then(res.redirect('/'))
       .catch(next)
});
