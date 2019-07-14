const ConsultationsModel = require('../app/models')['Consultations']
const UsersModel = require('../app/models')['Users']
const MedicsModel = require('../app/models')['Medics']

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const RouterConsultationsModel = {
  getAll: async (req, res) => {
    const {medicId, userId} = req.query

    const whereClause = {}
    if (medicId) whereClause.medicId = medicId
    if (userId) whereClause.userId = userId

    const consultations = await ConsultationsModel.findAll({
      where: whereClause,
      include: [
        {
          model: UsersModel
        },
        {
          model: MedicsModel
        },
      ]
    })
    res.json(consultations)
  },

  getById: (req, res) => {
    
  },

  getByDate: (req, res) => {

  },

  post: async (req, res) => {
    const {userId, medicId, scheduledTo} = req.body

    if (!(userId && medicId && scheduledTo)) 
      return res.status(500).send('Missing information')

    const medic = await ConsultationsModel.create({userId, medicId, scheduledTo: new Date(scheduledTo).toISOString()})
    res.json(medic);
  },

  put: async (req, res) => {
    const {id, userId, medicId, scheduledTo} = req.body
    if (!(id && userId && medicId && scheduledTo)) {
      return res.status(500).send('Invalid data!')
    }
    const consultation = await ConsultationsModel.findByPk(id)

    consultation && consultation.update({userId, medicId, scheduledTo}).then(() => res.json(consultation))
  },

  removeById: async (req, res) => {
    const {id} = req.body

    if (!id)
      return res.status(500).send('Invalid id!')

    const consultation = await ConsultationsModel.findByPk(id)
    consultation && consultation.destroy()

    return res.status(200).send('Sucessfully deleted!')
  }
}

module.exports = RouterConsultationsModel;