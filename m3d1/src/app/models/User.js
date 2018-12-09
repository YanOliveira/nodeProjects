// EXEMPLO DE MODEL PARA A CRIAÇÃO DE UM USUÁRIO

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// HOOK ANTES DE SALVAR NO DB, CRIPTOGRAFANDO SEHNA
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 8)
})

// CRIAÇÃO DE METODO PADRÃO DO MODEL PARA COMPARAÇÃO DE SENHAS CRIPTOGRAFADAS
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password)
  }
}

// CRIAÇÃO DE MÉTODO ESTÁTICO PARA RETORNAR UM TOKEN DE SESSÃO
UserSchema.statics = {
  generateToken({
    id
  }) {
    return jwt.sign({
      id
    }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

module.exports = mongoose.model('User', UserSchema)
