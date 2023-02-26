const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	name: {
		type: String,
		minlength: [3, 'Panjang nama product minimal 3 karakter'],
		required: [true, 'Nama product harus diisi']
	},

	description: {
		type: String,
		maxlength: [1000, 'Panjang nama product maximal 1000 karakter'],
	},

	price: {
		type: Number,
		default: 0
	},

	brand: {
		type: String,
		minlength: [1, 'Panjang Brand product minimal 1 karakter'],
		required: [true, 'Brand product harus diisi']
	},

	productInfo: {
		type: String,
	},

	image_url: String,

	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category'
	},

	tags: {
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}

}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product