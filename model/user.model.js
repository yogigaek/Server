const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	fullname: {
		type: String,
		required: [true, 'Nama makanan harus diisi'],
		minlength: [3, 'Panjang nama makanan minimal 3 karakter'],
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter']
	},

	customer_id: {
		type: Number
	},

	email: {
		type: String,
		required: [true, 'Nama makanan harus diisi'],
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter']
	},

	password: {
		type: String,
		required: [true, 'Nama makanan harus diisi'],
		maxlength: [255, 'Panjang nama makanan maximal 255 karakter']
	},

	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},

	token: [String]

}, { timestamps: true })

UserSchema.path('email').validate(value => {
	const EMAIL_RE = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i
	return EMAIL_RE.test(value)
}, attr => `${attr.value} email tidak valid`)

UserSchema.path('email').validate( async function (value) {
	try {
		const count = await this.model('User').count({email: value})
		return !count
	} catch(err) {
		throw err
	}
}, attr => `${$attr.value} sudah terdaftar`)

const HASH_ROUND = 10
UserSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, HASH_ROUND)
	next()
})

UserSchema.plugin(AutoIncrement, {inc_field: 'customer_id'})

const User = mongoose.model('User', UserSchema)

module.exports = User