const router = require('express').Router();
const LineItem = require('../db/LineItem');
module.exports = router;

router.post('/', (req, res, next) => {
    const {orderId, lineItemObj} = req.body;
    LineItem.addItemToCart(orderId*1, lineItemObj)
            .catch(err => {
                next(err);
            })
});

router.delete('/', (req, res) => {
});
