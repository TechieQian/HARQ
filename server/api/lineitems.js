const router = require('express').Router();
module.exports = router;

router.get('/', (req, res) => {
    res.send('You got /api/lineitems');
});

router.delete('/', (req, res) => {
    res.send('You delete /api/lineitems');
});
