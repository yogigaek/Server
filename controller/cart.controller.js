const { getCart, putCart, deleteCart } = require('../services/cart.service')
const { getProduct } = require('../services/product.service')

const index = async (req, res, next) => {
	let userId = req.user._id
	
	try {
		const cart = await getCart(userId)
		return res.status(200).json({ status: 200, data: cart, message: "Succesfully Cart Retrieved" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

const update = async (req, res, next) => {
	const { items } = req.body
	const userId = req.user._id
	
	try {
		const productId = items.map(item => item.product._id)
		const { product } = await getProduct({_id: {$in: productId}})
		const products = product
		let cartItem = items.map(item => {
			let relateProduct = products.find(product => product._id.toString() === item.product._id)
			return {
				product: relateProduct._id,
				price: relateProduct.price,
				image_url: relateProduct.image_url,
				name: relateProduct.name,
				user: req.user._id,
				qty: item.qty
			}
		})

		await deleteCart(userId)
		await putCart(cartItem, req.user._id)
		return res.status(200).json({ status: 200, data: cartItem, message: "Succesfully Cart Retrieved" })
	} catch(e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
}

module.exports = { index, update }