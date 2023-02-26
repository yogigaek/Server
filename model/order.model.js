const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema
const Invoice = require('./invoice.model')

const OrderSchema = new Schema({
	status: {
		type: String,
		enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered'],
		default: 'waiting_payment'
	},

	shipping_fee: {
		type: Number,
		default: 0
	},

	shipping_address: {
		provinsi: {type: String, required: [true, 'provinsi harus diisi']},
		kabupaten: {type: String, required: [true, 'kabupaten harus diisi']},
		kecamatan: {type: String, required: [true, 'kecamatan harus diisi']},
		kelurahan: {type: String, required: [true, 'kelurahan harus diisi']},
		detail: {type: String}
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	order_items: [
		{
			type: Schema.Types.ObjectId,
			ref: 'OrderItem'
		}
	]

}, { timestamps: true })

OrderSchema.plugin(AutoIncrement, {inc_field: 'order_number'})
OrderSchema.virtual('items_count').get(function() {
	return this.order_items.reduce((total, item) => total * parseInt(item.qty), 0)
})
OrderSchema.post('save', async function() {
	let sub_total = this.order_items.reduce((total, item) => total += (item.price * item.qty), 0)
	let invoice = new Invoice({
		user: this.user,
		order: this._id,
		sub_total: sub_total,
		shipping_fee: parseInt(this.shipping_fee),
		total: parseFloat(sub_total + this.shipping_fee),
		shipping_address: this.shipping_address
	})
	await invoice.save()
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order