const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');

module.exports = router;

// gets all products
router.get('/', (req, res, next) => {
  Product.findAll({order : ['id']})
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
		userId : req.body.userId,
    action: req.body.action
	})
		.then((cart)=> {
			res.send(cart)
		})
		.catch(next)
})

// delete product
router.delete('/:id', (req, res, next) => {
	Product.destroy({ where : { id : req.params.id } })
		.then(()=> {
			res.sendStatus(200)
		})
		.catch(next)
});

// edit product
router.put('/:id', (req, res, next) => {
	Product.update(req.body, { where : { id : req.params.id }, returning : true, plain : true })
		.then((result)=> {
			res.send(result[1].dataValues)
		})
		.catch(next)
});

// create product
router.post('/', (req, res, next) => {
	console.log('api post', req.body)
	Product.create(req.body)
		.then(product=> res.send(product))
		.catch(next)
});
