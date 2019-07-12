const MedicsModel = require('../app/models')['Medics']

const RouterUser = {
  getByName: (req, res) => {
    
  },

  getById: (req, res) => {
    
  },

  post: async (req, res) => {
    const {name, email, phone} = req.body
    if (!name) {
      return res.status(500).send('Invalid name!')
    }
    const medic = await MedicsModel.create({name, email, phone})
    res.json(medic);
  }
}

module.exports = RouterUser;