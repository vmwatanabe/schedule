const MedicsModel = require('../app/models')['Medics']
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const RouterUser = {
  getAll: async (req, res) => {
    const medics = await MedicsModel.findAll()
    res.json(medics)
  },

  getByName: async (req, res) => {
    const {name} = req.query

    const medics = await MedicsModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })

    res.json(medics)
  },

  getById: async (req, res) => {
    const {id} = req.query

    const medics = await MedicsModel.findAll({
      where: {
        id
      }
    })

    res.json(medics)
  },

  post: async (req, res) => {
    const {name, email, phone} = req.body
    if (!name) {
      return res.status(500).send('Invalid name!')
    }
    const medic = await MedicsModel.create({name, email, phone})
    res.json(medic);
  },

  removeById: async (req, res) => {
    const {id} = req.body

    if (!id)
      return res.status(500).send('Invalid id!')

    const medic = await MedicsModel.findByPk(id)
    medic && medic.destroy()
    
    return res.status(200)
  }
}

module.exports = RouterUser;