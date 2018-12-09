// EXEMPLO DE CONTROLLER PARA CRIAÇÃO DE UM USUÁRIO

const models = require('../models')

class User {
  async store(req, res) {
    const {
      email
    } = req.body

    // retorna erro se o usuário já exixtir
    if (await models.User.findOne({
        email: email
      })) {
      return res.status(400).json({
        error: 'User already exists'
      })
    }

    // cadastra o usuário
    const user = await models.User.create(req.body)
    return res.json(user)
  }
}
module.exports = new User()
