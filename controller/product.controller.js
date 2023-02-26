const path = require('path')
const fs = require('fs')
const config = require('../config/config')
const { showCategory } = require('../services/category.service')
const { getTag } = require('../services/tag.service')
const { getProduct, showProduct, postProduct, putProduct, deleteProduct } = require('../services/product.service')

const index = async (req, res, next) => {	
	let { skip = 0, limit = 10, name = '', category = '', tags = [] } = req.query
	let criteria = {}
	let sort = {}

	if (name.length) {
		criteria = {
			...criteria,
			name: {$regex: name, $options: 'i'}
		}
	}

	if (category.length) {
		category = await showCategory({name :{$regex: category, $options: 'i'}})

		if (category) {
			criteria = {...criteria, category: category._id}
		}
	}

	if (tags.length) {
		tags = await getTag({name: {$in: tags}})
		criteria = {...criteria, tags: {$in: tags.map(tag => tag._id)}}
	}

	try {
		let { product, count } = await getProduct(criteria, skip, limit, sort )
		return res.status(200).json({ status: 200, count, data: product, message: "Succesfully Product Retrieved" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const store = async (req, res, next) => {
	let payload = req.body

	if(payload.category) {
		let category = await showCategory({ name: {$regex: payload.category, $options: 'i'} })
		if(category) {
			payload = {...payload, category: category._id}
		} else {
			delete payload.category
		}
	}

	if(payload.tags && payload.tags.length > 0) {
		let tags = await getTag({ name: {$in: payload.tags} })
		if(tags.length) {
			payload = {...payload, tags: tags.map(tag => tag._id)}
		} else {
			delete payload.tags
		}
	}

	if(req.file) {
		let tmp_path = req.file.path
		let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
		let filename = req.file.filename + '.' + originalExt
		let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`)

		const src = fs.createReadStream(tmp_path)
		const dest = fs.createWriteStream(target_path)
		src.pipe(dest)

		src.on('end', async () => {
			try {
				let product = await postProduct(payload, filename)
				return res.status(200).json({ status: 200, data: product, message: "Succesfully Product Stored" })
			} catch(e) {
				fs.unlinkSync(target_path)
				return res.status(400).json({ status: 400, message: e.message });
			}
		})
	} else {
		try {			
			let product = await postProduct(payload)
			return res.status(200).json({ status: 200, data: product, message: "Succesfully Product Stored" })
		} catch(e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
	}
}

const update = async (req, res, next) => {
	
	let payload = req.body
	let { id } = req.params

	if(payload.category) {
		let category = await showCategory({ name: {$regex: payload.category, $options: 'i'} })
		if(category) {
			payload = {...payload, category: category._id}
		} else {
			delete payload.category
		}
	}

	if(payload.tags && payload.tags.length > 0) {
		let tags = await getTag({ name: {$in: payload.tags} })
		if(tags.length) {
			payload = {...payload, tags: tags.map(tag => tag._id)}
		} else {
			delete payload.tags
		}
	}

	if(req.file) {
		let tmp_path = req.file.path
		let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
		let filename = req.file.filename + '.' + originalExt
		let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`)

		const src = fs.createReadStream(tmp_path)
		const dest = fs.createWriteStream(target_path)
		src.pipe(dest)

		src.on('end', async () => {
			try {
				product = await showProduct(id)
				
				let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`
				if(fs.existsSync(currentImage)) {
					fs.unlinkSync(currentImage)
				}	
					
				product = await putProduct(id, payload, filename)
				return res.status(200).json({ status: 200, data: product, message: "Succesfully Product Updated" })
			
			} catch(e) {
				fs.unlinkSync(target_path)
				return res.status(400).json({ status: 400, message: e.message });
			}
		})
	} else {
		try {
			let	product = await putProduct(id, payload)
			return res.status(200).json({ status: 200, data: product, message: "Succesfully Product Updated" })
		} catch(e) {
			return res.status(400).json({ status: 400, message: e.message });
		}
		
	}
}

const destroy = async (req, res, next) => {
	let { id } = req.params

	try {
		let product = await deleteProduct(id)
		let currentImage = `${config.rootPath}/public/images/products/${product.image_url}`
		if(fs.existsSync(currentImage)) {
			fs.unlinkSync(currentImage)
		}
		return res.status(200).json({ status: 200, data: product, message: "Succesfully Product Deleted" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

module.exports = { index, store, update, destroy }