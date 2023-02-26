const Invoice = require('../model/invoice.model')

const getInvoice = async (orderId) => {
	try {
    let invoice = await Invoice.findOne({order: orderId}).populate('order').populate('user')
    return invoice
	} catch(e) {
		console.log(e.message)
		throw Error('Error Invoice')
	}
}

module.exports = { getInvoice }