const Product = require('../model/product.model')

const getProduct = async (criteria, skip, limit) => {
	try {
		const count = await Product.find().countDocuments()
		const product = await Product.find(criteria).skip(parseInt(skip)).limit(parseInt(limit)).populate('category').populate('tags').sort({createdAt: -1})
		return data = {product, count}
	} catch(e) {
		console.log(e.message)
		throw Error('Error Product')
	}
}

const showProduct = async (id) => {
	try {
		let product = await Product.findById(id)
		return product
	} catch(e) {
		console.log(e.message)
		throw Error('Error Product')
	}
}

const postProduct = async (payload, filename) => {
	try {
		let product = {}
		if (filename) {
			product = new Product({
				...payload,
				image_url: filename
			})	
		} else {
			product = new Product(payload)
		}
		await product.save()
		return product
	} catch(e) {
		console.log(e.message)
		throw Error('Error Product')
	}
}

const putProduct = async (id, payload, filename) => {
	try {
		let product = {}
		if (filename) {
			product = await Product.findByIdAndUpdate(id, {
				...payload,
				image_url: filename
			}, { new: true, runValidators: true })	
		} else {
			product = await Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
		}
		return product
	} catch(e) {
		console.log(e.message+'db')
		throw Error('Error Product')
	}
}

const deleteProduct = async (id) => {
	try {
		let product = await Product.findByIdAndDelete(id)
		return product
	} catch(e) {
		console.log(e.message)
		throw Error('Error Product')
	}
}

module.exports = { getProduct, showProduct, postProduct, putProduct, deleteProduct }