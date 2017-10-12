const router = require('express').Router();
const Product = require('../db/Product');
const User = require('../db/User');
const Order = require('../db/Order');
const LineItem = require('../db/LineItem');
module.exports = router;

router.get('/:id', (req, res, next) => {
	User.findById(req.params.id, {
		include : [{ model : Order, include : [{ model : LineItem, include : [Product] }] }]
	})
    .then(user => res.send(user))
})


router.get('/:id/orders', (req, res, next) => {
  User.findById(req.params.id,
		{include: [
			{model: Order,
				include: [{model: LineItem, include: [Product] }] } ]
		})
		.then(user => res.send(user.orders))
		.catch(next);
});

router.get('/:id/cart', (req,res,next)=> {
	Order.getActiveOrderByUser(req.params.id)
		.then(cart=> {
			res.send(cart)
		})
})

	/*
router.get('/:id/activeorder', (req, res, next) => {
  User.findById(req.params.id,
		{include: [
			{model: Order, where: {active: true},
				include: [{model: LineItem, include: [Product] }] } ]
		})
		.then(user => {
			if (user.orders.length == 1){
				return res.send(user.orders[0])
			}
			else { throw 'Found more than one active order' }
		})
		.catch(next);
});*/

router.delete('/:lineItemId', (req, res, next) => {
  User.deleteLineItem(req.params.lineItemId)
       .then(res.redirect('/'))
       .catch(next)
});
