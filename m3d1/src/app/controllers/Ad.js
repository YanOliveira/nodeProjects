const models = require('../models')

class Ad {
  async index(req, res) {
    const filters = {}
    if (req.query.price_min || req.query.price_max) {
      filters.price = {}
      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }
    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }
    filters.purchasedBy = null

    const ads = await models.Ad.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      sort: '-createdAt',
      populate: ['author']
    })
    return res.json(ads)
  }
  async show(req, res) {
    const ad = await models.Ad.findById(req.params.id)
    return res.json(ad)
  }
  async store(req, res) {
    const ad = await models.Ad.create({ ...req.body,
      author: req.userId
    })
    return res.json(ad)
  }
  async update(req, res) {
    const ad = await models.Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    return res.json(ad)
  }
  async destroy(req, res) {
    await models.Ad.findByIdAndDelete(req.params.id)
    return res.send()
  }
}

module.exports = new Ad()
