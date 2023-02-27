const router = require('express').Router()
const policy_check = require('../middlewares/policy')
const category = require('../controller/category.controller')


router.get('/category', category.index)
router.post('/category',
	policy_check('create', 'Category'), 
	category.store
)
router.put('/category/:id',
	policy_check('update', 'Category'),
	category.update
)
router.delete('/category/:id',
	policy_check('delete', 'Category'),
	category.destroy
)

module.exports = router