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

// add product to lineitem
router.post('/:id/lineitems', (req,res,next)=> {
	Order.addProductToCart({
		userId : req.body.userId,
		productId : req.params.id
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
