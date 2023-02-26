const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CartItemSchema = new Schema({
	name: {
		type: String,
		minlength: [5, 'Panjang nama makanan minimal 5 karakter'],
		required: [true, 'Nama makanan harus diisi']
	},

	qty: {
		type: Number,
		required: [true, 'Nama makanan harus diisi'],
		min: [1, 'tambahkan minimal 1 product']
	},

	price: {
		type: Number,
		default: 0
	},

	image_url: String,

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product'
	}

}, { timestamps: true })

const CartItem = mongoose.model('CartItem', CartItemSchema)

module.exports = CartItem