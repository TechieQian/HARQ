const router = require('express').Router();
const Product = require('../db/Product');
const User = require('../db/User');
const Order = require('../db/Order');
const LineItem = require('../db/LineItem');
module.exports = router;

// get all users
router.get('/', (req, res, next) => {
	User.findAll()
    .then(users => res.send(users))
})

// get one user
router.get('/:id', (req, res, next) => {
	User.findById(req.params.id)
    .then(user => res.send(user))
})

// get user orders
router.get('/:id/orders', (req, res, next) => {
	Order.getOrdersByUser(req.params.id)
		.then(orders=> {
			res.send(orders)
		})
		.catch(next)
});

// get user cart
router.get('/:id/cart', (req,res,next)=> {
	Order.getOrdersByUser(req.params.id)
		.then(orders=> {
			 res.send(orders.find((order)=> order.active))
		})
		.catch(next)
})

// delete line item?
router.delete('/:lineItemId', (req, res, next) => {
  User.deleteLineItem(req.params.lineItemId)
       .then(res.redirect('/'))
       .catch(next)
});
