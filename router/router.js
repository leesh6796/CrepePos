var express = require('express');
var redirector = require('./redirect');
var order = require('./order');

var router = express.Router();

router.route('/').get(redirector.getIndex);
router.route('/neworder').get(redirector.getNewOrder);

router.route('/order/add/:bell/:n_strawberry/:n_banana').post(order.postAdd);
router.route('/order/get').get(order.getGet);
router.route('/order/complete/:id').put(order.putComplete);

module.exports = router;
