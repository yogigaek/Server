const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
	name: {
		type: String,
		minlength: [2, 'Panjang nama kategori minimal 3 karakter'],
		maxlength: [20, 'Panjang nama kategori maximal 20 karakter'],
		required: [true, 'Nama kategori harus diisi']
	}
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category