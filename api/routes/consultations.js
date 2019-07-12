const ConsultationsModel = require('../app/models')['Consultations']

const RouterConsultationsModel = {
  getAll: async (req, res) => {
    const consultations = await ConsultationsModel.findAll()
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
  }
}

module.exports = RouterConsultationsModel;