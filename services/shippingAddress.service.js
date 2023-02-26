const ShippingAddress = require('../model/shippingAddress.model')

const getAddress = async (userId, skip, limit) => {
	try {
		let count = await ShippingAddress.find({user: userId}).countDocuments()
		let shippingAddress = await ShippingAddress.find({user: userId}).skip(parseInt(skip)).limit(parseInt(limit)).sort('-createdAt')
		return data = { shippingAddress, count }
	} catch(e) {
		console.log(e.message)
		throw Error('Error Shipping Adress')
	}
}

const showAddress = async (id) => {
	try {
		let shippingAddress = await ShippingAddress.findById(id)
		return shippingAddress
	} catch(e) {
		console.log(e.message)
		throw Error('Error Shipping Adress')
	}
}

const postAddress = async (payload, userId) => {
	try {
		let shippingAddress = new ShippingAddress({...payload, user: userId})
		await shippingAddress.save()
		return shippingAddress
	} catch(e) {
		console.log(e.message)
		throw Error('Error Shipping Adress')
	}
}

const putAddress = async (id, payload, userId) => {
	try {
		shippingAddress = await ShippingAddress.findByIdAndUpdate(id, {...payload, user: userId}, { new: true, runValidators: true })
		return shippingAddress
	} catch(e) {
		console.log(e.message)
		throw Error('Error Shipping Adress')
	}
}

const deleteAddress = async (id) => {
	try {
		let shippingAddress = await ShippingAddress.findByIdAndDelete(id)
		return shippingAddress
	} catch(e) {
		console.log(e.message)
		throw Error('Error ShippingAdress')
	}
}

module.exports = { getAddress, showAddress, postAddress, putAddress, deleteAddress }