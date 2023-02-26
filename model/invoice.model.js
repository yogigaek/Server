const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
	sub_total: {
		type: Number,
		required: [true, 'total harus diisi']
	},

	shipping_fee: {
		type: Number,
		required: [true, 'ongkir harus diisi']
	},

	shipping_address: {
		provinsi: {type: String, required: [true, 'provinsi harus diisi']},
		kabupaten: {type: String, required: [true, 'kabupaten harus diisi']},
		kecamatan: {type: String, required: [true, 'kecamatan harus diisi']},
		kelurahan: {type: String, required: [true, 'kelurahan harus diisi']},
		detail: {type: String}
	},

	total: {
		type: Number,
		required: [true, 'total harus diisi']
	},

	status: {
		type: String,
		enum: ['waiting_payment', 'paid'],
		default: 'waiting_payment'
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	order: {
		type: Schema.Types.ObjectId,
		ref: 'Order'
	}

}, { timestamps: true })

const Invoice = mongoose.model('Invoice', InvoiceSchema)

module.exports = Invoice