const Category = require('../model/category.model')

const getCategory = async () => {
	try {
		let category = await Category.find()
		return category
	} catch(e) {
		console.log(e.message)
		throw Error('Error Category')
	}
}

const showCategory = async (keyword) => {
	try {
		let category = await Category.findOne(keyword)
		return category
	} catch(e) {
		console.log(e.message)
		throw Error('Error Category')
	}
}

const postCategory = async (payload) => {
	try {
		let category = new Category(payload)
		await category.save()
		return category
	} catch(e) {
		console.log(e.message)
		throw Error('Error Category')
	}
}

const putCategory = async (id, payload) => {
	try {
		let category = await Category.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
		return category
	} catch(e) {
		console.log(e.message)
		throw Error('Error Category')
	}
}

const deleteCategory = async (id) => {
	try {
		let category = await Category.findByIdAndDelete(id)
		return category
	} catch(e) {
		console.log(e.message)
		throw Error('Error Category')
	}
}

module.exports = { getCategory, showCategory, postCategory, putCategory, deleteCategory }