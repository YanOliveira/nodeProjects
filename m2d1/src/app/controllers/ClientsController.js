const moment = require('moment')
const {
  Op
} = require('sequelize')
const {
  User,
  Appointment
} = require('../models')

class ClientsController {
  async index(req, res) {
    const date = moment(parseInt(req.query.date))
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      },
      order: [
        ['date', 'ASC']
      ]

    })
    const appointmentsArray = []
    var appointment
    for (appointment in appointments) {
      const provider = await User.findOne({
        where: {
          id: appointments[appointment].user_id
        }
      })

      if (appointments[appointment].date >= moment()) {
        const appointmentsObj = {
          name: provider.name,
          avatar: provider.avatar,
          hour: moment(appointments[appointment].date).format('HH:mm')
        }

        appointmentsArray.push(appointmentsObj)
      }
    }
    return res.render('client/index', {
      appointments,
      appointmentsArray
    })
  }
}

module.exports = new ClientsController()
