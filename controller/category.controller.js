const { getCategory, postCategory, putCategory, deleteCategory } = require('../services/category.service')

const index = async (req, res, next) => {
	try {
		let category = await getCategory()
		return res.status(200).json({ status: 200, data: category, message: "Succesfully Category Retrieved" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const store = async (req, res, next) => {
	let payload = req.body

	try {
		let category = await postCategory(payload)
		return res.status(200).json({ status: 200, data: category, message: "Succesfully Category Stored" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const update = async (req, res, next) => {
	let payload = req.body
	let { id } = req.params.id

	try {
		let category = await putCategory(id, payload)
		return res.status(200).json({ status: 200, data: category, message: "Succesfully Category Updated" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const destroy = async (req, res, next) => {
	let { id } = req.params.id

	try {
		let category = await deleteCategory(id)
		return res.status(200).json({ status: 200, data: category, message: "Succesfully Category Deleted" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

module.exports = { index, store, update, destroy }