const { getTag, postTag, putTag, deleteTag } = require('../services/tag.service')

const index = async (req, res, next) => {
	try {
		let tag = await getTag()
		return res.status(200).json({ status: 200, data: tag, message: "Succesfully Tag Retrieved" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const store = async (req, res, next) => {
	let payload = req.body

	try {
		let tag = await postTag(payload)
		return res.status(200).json({ status: 200, data: tag, message: "Succesfully Tag Stored" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const update = async (req, res, next) => {
	let payload = req.body
	let { id } = req.params.id

	try {
		let tag = await putTag(id, payload)
		return res.status(200).json({ status: 200, data: tag, message: "Succesfully Tag Updated" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const destroy = async (req, res, next) => {
	let { id } = req.params.id

	try {
		let tag = await deleteTag(id)
		return res.status(200).json({ status: 200, data: tag, message: "Succesfully Tag Deleted" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

module.exports = { index, store, update, destroy }