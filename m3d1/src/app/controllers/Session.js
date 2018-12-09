// EXEMPLO DE CONTROLLER PARA AS SESSÕES USANDO JWT(JSON WEB TOKEN)

const models = require('../models')


class Session {
  async store(req, res) {
    const {
      email,
      password
    } = req.body

    // retorna erro se o usuário não existir
    const user = await models.User.findOne({
      email: email
    })
    if (!user) {
      return res.status(400).json({
        error: 'User not found!'
      })
    }

    // retorna erro se a senha estiver incorreta
    if (!await user.compareHash(password)) {
      return res.status(400).json({
        error: 'Invalid password!'
      })
    }

    // tudo certo
    return res.json({
      user,
      token: models.User.generateToken(user)
    })
  }
}

module.exports = new Session()
