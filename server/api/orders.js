const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');

module.exports = router;

// gets one order 
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

// create order
router.post('/', (req, res, next) => {
	console.log('creating order in api.', req.body)
	Order.create(req.body)
		.then(order=> res.send(order))
		.catch(next)
});

router.delete('/', (req, res, next) => {
});

router.put('/', (req, res, next) => {
});

