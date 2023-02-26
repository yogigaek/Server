const { Types } = require('mongoose')
const Order = require('../model/order.model')
const OrderItem = require('../model/orderItem.model')
const CartItem = require('../model/cartItem.model')

const getOrder = async (userId, skip, limit) => {
	try {
		const count = await Order.find(userId).countDocuments()
		const orders = await Order.find(userId).skip(parseInt(skip)).limit(parseInt(limit)).populate('order_items').sort('-createdAt')
		return data = {orders, count}
	} catch(e) {
		console.log(e.message)
		throw Error('Error Order')
	}
}

const postOrder = async (userId, shipping_fee, shippingAddress, items) => {
	try {
		let order = new Order({
			_id: new Types.ObjectId(),
			status: 'waiting_payment',
			shipping_fee: shipping_fee,
			shipping_address: {
				provinsi: shippingAddress.provinsi,
				kabupaten: shippingAddress.kabupaten,
				kecamatan: shippingAddress.kecamatan,
				kelurahan: shippingAddress.kelurahan,
				detail: shippingAddress.detail
			},
			user: userId
		})

		let orderItem = await OrderItem.insertMany(items.map(item => ({
			...item,
			name: item.product.name,
			qty: parseInt(item.qty),
			price: parseFloat(item.product.price),
			order: order._id,
			product: item.product._id
		})))
		orderItem.forEach(item => order.order_items.push(item))
		await order.save()
		return order
	} catch(e) {
		console.log(e.message)
		throw Error('Error Order')
	}
}

module.exports = { getOrder, postOrder }