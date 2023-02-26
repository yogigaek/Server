const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ShippingAddressSchema = new Schema({
	name: {
		type: String,
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter'],
		required: [true, 'Nama makanan harus diisi']
	},

	kelurahan: {
		type: String,
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter'],
		required: [true, 'Nama makanan harus diisi']
	},

	kecamatan: {
		type: String,
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter'],
		required: [true, 'Nama makanan harus diisi']
	},

	kabupaten: {
		type: String,
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter'],
		required: [true, 'Nama makanan harus diisi']
	},

	provinsi: {
		type: String,
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter'],
		required: [true, 'Nama makanan harus diisi']
	},

	detail: {
		type: String,
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter'],
		required: [true, 'Nama makanan harus diisi']
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

}, { timestamps: true })

const ShippingAddress = mongoose.model('ShippingAddress', ShippingAddressSchema)

module.exports = ShippingAddress