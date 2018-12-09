// MIDDLEWARE PARA VALIDAR SESSÃO DE ACORDO COM O TOKEN

const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const {
  promisify
} = require('util')

module.exports = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')

  // erro se não existir token no cabeçalho
  if (!token) {
    return res.status(401).json({
      error: 'Token not provided'
    })
  }
  try {
    // decodifica o token para identificar o usuário
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)
    req.userId = decoded.id
    return next()
  } catch (err) {
    // erro se o token não representar nenhum usuário
    return res.status(401).json({
      error: 'Token invalid'
    })
  }
}
