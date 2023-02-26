const Tag = require('../model/tag.model')

const getTag = async (keyword) => {
	try {
		let tag = await Tag.find(keyword)
		return tag
	} catch(e) {
		console.log(e.message)
		throw Error('Error Tag')
	}
}

const postTag = async (payload) => {
	try {
		let tag = new Tag(payload)
		await tag.save()
		return tag
	} catch(e) {
		console.log(e.message)
		throw Error('Error Tag')
	}
}

const putTag = async (id, payload) => {
	try {
		let tag = await Tag.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
		return tag
	} catch(e) {
		console.log(e.message)
		throw Error('Error Tag')
	}
}

const deleteTag = async (id) => {
	try {
		let tag = await Tag.findByIdAndDelete(id)
		return tag
	} catch(e) {
		console.log(e.message)
		throw Error('Error Tag')
	}
}

module.exports = { getTag, postTag, putTag, deleteTag }