const Cart = require('../model/cartItem.model')

const getCart = async (userId) => {
	try {
		const cart = await Cart.find({user: userId}).populate('product')
		return cart
	} catch(e) {
		console.log(e.message)
		throw Error('Error Cart')
	}
}

const putCart = async (cartItem, userId) => {
	try {
		const cart = await Cart.bulkWrite(cartItem.map(item => {
			return {
				updateOne: {
					filter: {
						user: userId,
						product: item.product
					},
					update: item,
					upsert: true
				}
			}
		}))
		return cart
	} catch(e) {
		console.log(e.message)
		throw Error('Error Cart')
	}
}
const deleteCart = async (userId) => {
	try {
		const cart = await Cart.deleteMany({user: userId})
		return cart
	} catch(e) {
		console.log(e.message)
		throw Error('Error Cart')
	}
}

module.exports = { getCart, putCart, deleteCart }