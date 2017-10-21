const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');
const LineItem = require('../db/LineItem.js')

module.exports = router;

// gets all orders
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.send(orders))
    .catch(next);
});

// gets one order 
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, {
    include: [{
      model: LineItem,
      include: [Product]
		}]
	})
    .then(order => res.send(order))
    .catch(next);
});

// create order
router.post('/', (req, res, next) => {
	Order.create(req.body)
		.then(order=> res.send(order))
		.catch(next)
});

router.delete('/', (req, res, next) => {
});

// update order
router.put('/:id', (req, res, next) => {
	Order.update(req.body, {
		where : { id : req.params.id }
	})
		.then((cart)=> {
			res.send(cart)
		})
});

