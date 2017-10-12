const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');

module.exports = router;

// routes don't currently add new products
// or delete current products in db

// gets all products
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

// gets one product
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

// add product to cart
router.post('/:id/lineItems', (req,res,next)=> {
	Order.addProductToCart({
		productId : req.params.id,
		cartId : req.body.cartId,
		userId : req.body.userId
	})
		.then((cart)=> {
			res.send(cart)
		})
		.catch(next)
})

router.delete('/', (req, res, next) => {
});

router.put('/:id', (req, res, next) => {
	Product.update(req.body, { where : { id : req.params.id }, returning : true, plain : true })
		.then((result)=> {
			res.send(result[1].dataValues)
		})
});

router.post('/', (req, res, next) => {
});
