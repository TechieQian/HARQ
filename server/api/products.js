const router = require('express').Router();
const Product = require('../db/Product');
const Order = require('../db/Order');

module.exports = router;

// routes don't currently add new products
// or delete current products in db

// gets all products
router.get('/', (req, res, next) => {
  return Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

// gets one product
router.get('/:id', (req, res, next) => {
  return Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

// delete product from cart
router.delete('/', (req, res, next) => {
  return Product.deleteProductFromCart(req.body)
    .catch(next);
});

// update (+1) product in cart
router.put('/', (req, res, next) => {
  return Product.updateProductInCart(req.body)
    .catch(next);
});

// add new product to cart
router.post('/', (req, res, next) => {
	 const { userId, productId } = req.body;
	 
  Order.addLineItem({ userId, productId })
		.then(order => res.send(order))
    .catch(next);
})



const models = require('../db').models
const Products = models.product
module.exports = router;

//GET All products
router.get('/', (req, res) => {
	Products.findAll()
		.then((products)=> {
			res.json(products)
		})
});

router.delete('/', (req, res) => {
});
