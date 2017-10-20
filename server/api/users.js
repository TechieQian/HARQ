const router = require('express').Router();
const Product = require('../db/Product');
const User = require('../db/User');
const Order = require('../db/Order');
const LineItem = require('../db/LineItem');
module.exports = router;


router.get('/', (req, res, next) => {
	User.findAll()
    .then(users => res.send(users))
})

router.get('/:id', (req, res, next) => {
	User.findById(req.params.id)
    .then(user => res.send(user))
})

router.get('/:id/orders', (req, res, next) => {
	Order.getOrdersByUser(req.params.id)
		.then(orders=> {
			res.send(orders)
		})
		.catch(next)
});

router.get('/:id/cart', (req,res,next)=> {
	Order.getOrdersByUser(req.params.id)
		.then(orders=> {
			 res.send(orders.find((order)=> order.active))
		})
		.catch(next)
})

router.delete('/:lineItemId', (req, res, next) => {
  User.deleteLineItem(req.params.lineItemId)
       .then(res.redirect('/'))
       .catch(next)
});
