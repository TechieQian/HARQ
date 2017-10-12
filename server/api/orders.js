const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');

module.exports = router;

// gets one product
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => res.send(order))
    .catch(next);
});

// add product to lineitem
router.post('/:id/orders/:orderId', (req,res,next)=> {
	Order.addProductToCart({
		productId : req.params.id,
		cartId : req.params.orderId
	})
		.then(()=> {
			res.send()
			console.log('posted product lineitem')
		})
		.catch((ex)=> {
			console.log(ex)
		})
})

router.delete('/', (req, res, next) => {
});

router.put('/', (req, res, next) => {
});

router.post('/', (req, res, next) => {

});
