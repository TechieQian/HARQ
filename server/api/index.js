const router = require('express').Router();
module.exports = router;

router.use('/lineitems', require('./lineitems'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
