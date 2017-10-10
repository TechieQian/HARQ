
const router = require('express').Router();
const Product = require('../db/Product');
const User = require('../db/User');
const Order = require('../db/Order');
const LineItem = require('../db/LineItem');
module.exports = router;

router.get('/:id', (req, res, next) => {
	console.log('got user find id route')
	User.findById(req.params.id, {
		include : [{ model : Order, include : [{ model : LineItem, include : [Product] }] }]
	})
    .then(user => res.send(user))
})


router.delete('/:lineItemId', (req, res, next) => {
  User.deleteLineItem(req.params.lineItemId)
       .then(res.redirect('/'))
       .catch(next)
});

