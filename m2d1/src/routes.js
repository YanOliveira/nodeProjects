const express = require('express')
const routes = express.Router()
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const authMiddleware = require('./app/middlewares/auth')
const guestMiddleware = require('./app/middlewares/guest')

const userController = require('./app/controllers/UserController')
const sessionController = require('./app/controllers/SessionController')
const dashboardController = require('./app/controllers/DashboardController')
const fileController = require('./app/controllers/FileController')
const appointmentController = require('./app/controllers/AppointmentController')
const availableController = require('./app/controllers/AvailableController')
const clientsController = require('./app/controllers/ClientsController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})

routes.get('/', guestMiddleware, sessionController.create)
routes.post('/signin', sessionController.store)

routes.get('/signup', guestMiddleware, userController.create)
routes.post('/signup', upload.single('avatar'), userController.store)

routes.use('/app', authMiddleware)
routes.get('/app/dashboard', dashboardController.index)
routes.get('/app/logout', sessionController.destroy)

routes.get('/files/:file', fileController.show)

routes.get('/app/appointments/new/:provider', appointmentController.create)
routes.post('/app/appointments/new/:provider', appointmentController.store)

routes.get('/app/available/:provider', availableController.index)
routes.get('/app/clients/:provider', clientsController.index)

module.exports = routes
