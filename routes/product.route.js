const router = require('express').Router()
const multer = require('multer')
const os = require('os')
const policy_check = require('../middlewares/policy')

const product = require('../controller/product.controller')

// Route URL untuk mengakses data product
router.get('/product', product.index)

// Route URL untuk menambahkan product
router.post('/product', 
	multer({dest: os.tmpdir()}).single('image'), 
	policy_check('create', 'Product'),
	product.store
)

// Route URL untuk mengubah product
router.put('/product/:id', 
	multer({dest: os.tmpdir()}).single('image'),
	policy_check('update', 'Product'),
 	product.update
 )

// Route URL untuk menghapus product
router.delete('/product/:id',
	policy_check('delete', 'Product'), 
	product.destroy
)

module.exports = router