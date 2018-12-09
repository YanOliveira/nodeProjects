const joi = require('joi')

module.exports = {
  params: {
    purchase: joi.string().required()
  }
}
