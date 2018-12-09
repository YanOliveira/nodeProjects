const models = require('../models')

class Approve {
  async update(req, res) {
    const {
      id
    } = req.params

    const {
      ad
    } = await models.Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })

    if (ad.purchasedBy) {
      return res.status(400).json({
        error: 'This ad had already been purchased'
      })
    }

    if (!ad.author._id.equals(req.userId)) {
      return res.status(400).json({
        error: "You're not the ad author"
      })
    }

    ad.purchasedBy = id
    ad.save()
    return res.json(ad)
  }
}

module.exports = new Approve()
