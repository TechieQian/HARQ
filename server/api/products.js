const router = require('express').Router();
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
