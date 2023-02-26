const policyFor = require('../utils/policy')
const { getAddress, postAddress, putAddress, deleteAddress } = require('../services/shippingAddress.service')

const index = async (req, res, next) => {
	let {skip = 0, limit = 10} = req.query
	let userId = req.user._id

	try {
		let { shippingAddress, count } = await getAddress(userId, skip, limit)
		return res.status(200).json({ status: 200, data: shippingAddress, count, message: "Succesfully Address Retrieved" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const store = async (req, res, next) => {
	let payload = req.body
	let userId = req.user._id

	try {
		let shippingAddress = await postAddress(payload, userId)
		return res.status(200).json({ status: 200, data: shippingAddress, message: "Succesfully Address Stored" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const update = async (req, res, next) => {
	let { _id, ...payload } = req.body
	let { id } = req.params
	let userId = req.user._id

	try {
		let shippingAddress = await putAddress(id, payload, userId)
		return res.status(200).json({ status: 200, data: shippingAddress, message: "Succesfully Address Updated" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const destroy = async (req, res, next) => {
	let { id } = req.params

	try {
		let shippingAddress = await deleteAddress(id)
		return res.status(200).json({ status: 200, data: shippingAddress, message: "Succesfully Address Deleted" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

module.exports = { index, store, update, destroy }