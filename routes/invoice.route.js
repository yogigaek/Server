const router = require('express').Router()
const invoice = require('../controller/invoice.controller')

router.get('/invoice/:order_id', invoice.index)

module.exports = router