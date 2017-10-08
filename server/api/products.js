const router = require('express').Router();
const Product = require('../db/Product');

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

router.delete('/', (req, res, next) => {
});

router.put('/', (req, res, next) => {
});

router.post('/', (req, res, next) => {
});
