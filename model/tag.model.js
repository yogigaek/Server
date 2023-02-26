const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TagSchema = new Schema({
	name: {
		type: String,
		minlength: [3, 'Panjang nama tag minimal 3 karakter'],
		maxlength: [20, 'Panjang nama tag maximal 20 karakter'],
		required: [true, 'Nama tag harus diisi']
	}
})

const Tag = mongoose.model('Tag', TagSchema)

module.exports = Tag