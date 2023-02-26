const router = require('express').Router()
const policy_check = require('../middlewares/policy')
const cart = require('../controller/cart.controller')

router.get('/cart',
	policy_check('read', 'Cart'),
	cart.index
)

router.put('/cart',
	policy_check('update', 'Cart'),
	cart.update
)

module.exports = router