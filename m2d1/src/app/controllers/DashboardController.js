const {
  User,
  Appointment
} = require('../models')

class DashboardController {
  async index(req, res) {
    const providers = await User.findAll({
      where: {
        provider: true
      }
    })

    if (!req.session.user.provider) {
      return res.render('dashboard', {
        providers
      })
    } else {
      const appointments = await Appointment.findAll({
        where: {
          provider_id: req.session.user.id
        }
      })
      const user_id = req.session.user.id
      for (var client in appointments) {
        const user = await User.findAll
      }
      return res.render('dashboard', {
        providers,
        appointments,
        user_id
      })
    }
  }
}

module.exports = new DashboardController()
