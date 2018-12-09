const models = require('../models')
const services = require('../services')
const jobs = require('../jobs')

class Purchase {
  async store(req, res) {
    const {
      ad,
      content
    } = req.body
    const purchaseAd = await models.Ad.findById(ad).populate('author')
    const user = await models.User.findById(req.userId)

    if (purchaseAd.purchasedBy) {
      return res.status(400).json({
        error: 'This ad had already been purchased'
      })
    }

    const purchase = await models.Purchase.create({
      ad: purchaseAd,
      content: content,
      requester: user._id
    })

    services.Queue.create(jobs.PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }
}

module.exports = new Purchase()
