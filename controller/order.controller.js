const { getOrder, postOrder } = require('../services/order.service')
const { getCart, deleteCart } = require('../services/cart.service')
const { showAddress } = require('../services/shippingAddress.service')


const index = async (req, res, next) => {
	let {skip = 0, limit = 10} = req.query
	try {
		let { orders, count } = await getOrder({user: req.user._id}, skip, limit)
		return res.status(200).json({
			status: 200,
			data: orders.map(order => order.toJSON({virtuals: true})), count, 
			message: "Succesfully Order Retrieved" 
		})
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const store = async (req, res, next) => {
	let { shipping_address, shipping_fee } = req.body
	let userId = req.user._id
	
	try {
		const items = await getCart(userId)
		if (!items) {
			return res.json({
				error: 1,
				message: 'Tambahkan barang ke keranjang untuk memesan'
			})
		}
		let shippingAddress = await showAddress(shipping_address)
		let order = await postOrder(userId, shipping_fee, shippingAddress, items)
		await deleteCart(userId)

		return res.status(200).json({ status: 200, data: order, message: "Succesfully Cart Retrieved" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

module.exports = { index, store }