const router = require('express').Router()
const policy_check = require('../middlewares/policy')
const order = require('../controller/order.controller')

router.get('/order',
    policy_check('view', 'Order'),
    order.index
)

router.post('/order',
    policy_check('create', 'Order'),
    order.store
)

module.exports = router