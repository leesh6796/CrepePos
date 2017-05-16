var express = require('express');
var redirector = require('./redirect');
var order = require('./order');

var router = express.Router();

router.route('/').get(redirector.getIndex);
router.route('/neworder').get(redirector.getNewOrder);

router.route('/order/add/:bell/:n_strawberry/:n_banana').post(order.postAdd);

module.exports = router;
