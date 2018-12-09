const express = require('express')
const routes = express.Router()
const controllers = require('./app/controllers')
const middlewares = require('./app/middlewares')
const validate = require('express-validation')
const validators = require('./app/validators')
const handle = require('express-async-handler')

routes.post('/users', validate(validators.User), handle(controllers.User.store))
routes.post('/sessions', validate(validators.Session), handle(controllers.Session.store))

// MIDDLEWARE DE AUTENTICAÇÃO
routes.use(middlewares.Auth)

/*
  ADs
*/
routes.get('/ads', handle(controllers.Ad.index))
routes.get('/ads/:id', handle(controllers.Ad.show))
routes.post('/ads', validate(validators.Ad), handle(controllers.Ad.store))
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.Ad.update))
routes.delete('/ads/:id', handle(controllers.Ad.destroy))

/*
  PURCHASEs
*/
routes.post('/purchases', validate(validators.Purchase), handle(controllers.Purchase.store))
routes.put('/purchases/:id', handle(controllers.Approve.update))

module.exports = routes
