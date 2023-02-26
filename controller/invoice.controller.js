const { subject } = require('@casl/ability')
const policyFor = require('../utils/policy')
const { getInvoice } = require('../services/invoice.service')

const index = async (req, res, next) => {
  let {order_id} = req.params;
  try {    
    let invoice = await getInvoice(order_id); 
    let policy = policyFor(req.user);
    let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id});
    if(!policy.can('read', subjectInvoice)){
      return res.json({
        error: 1, 
        message: `Anda tidak memiliki akses untuk melihat invoice ini.`
      });
    }
    return res.status(200).json({ status: 200, data: invoice, message: "Succesfully Invoice Retrieved" })
  } catch(e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
}

module.exports = { index }