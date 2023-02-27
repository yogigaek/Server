const router = require('express').Router()
const policy_check = require('../middlewares/policy')
const tag = require('../controller/tag.controller')

router.get('/tag', tag.index)
router.post('/tag',
	policy_check('create', 'Tag'),
	tag.store
)
router.put('/tag/:id',
	policy_check('update', 'Tag'),
 	tag.update
)
router.delete('/tag/:id',
	policy_check('delete', 'Tag'),
	tag.destroy
)

module.exports = router