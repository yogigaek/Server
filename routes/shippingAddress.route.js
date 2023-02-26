const router = require('express').Router()
const policy_check = require('../middlewares/policy')
const shippingAddress = require('../controller/shippingAddress.controller')

router.get('/shipping-address', shippingAddress.index)
router.post('/shipping-address',
	policy_check('create', 'shippingAddress'),
	shippingAddress.store
)
router.put('/shipping-address/:id',	shippingAddress.update)
router.delete('/shipping-address/:id', shippingAddress.destroy)

module.exports = router