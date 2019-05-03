const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Igor Martins" <igor@igor.com>',
      to: purchaseAd.author.email,
      subject: `Buying incomiiing : ${purchaseAd.title}`,
      html: `<p>Test: ${content}</p>`
    })
    return res.send()
  }
}

module.exports = new PurchaseController()
