const router = require('express').Router();
module.exports = router;

router.use('/lineitems', require('./lineitems'));
router.use('/products', require('./products'));
