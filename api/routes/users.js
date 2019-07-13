const UsersModel = require('../app/models')['Users']
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const RouterUser = {
  getAll: async (req, res) => {
    const users = await UsersModel.findAll()
    res.json(users)
  },

  getByName: async (req, res) => {
    const {name} = req.query

    const users = await UsersModel.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      }
    })

    res.json(users)
  },

  getById: async (req, res) => {
    const {id} = req.query

    const users = await UsersModel.findAll({
      where: {
        id
      }
    })

    res.json(users)
  },

  post: async (req, res) => {
    const {name, email, phone} = req.body

    if (!name) {
      return res.status(500).send('Invalid name!')
    }

    const user = await UsersModel.create({name, email, phone})
    res.json(user)
  },

  removeById: async (req, res) => {
    const {id} = req.body

    if (!id)
      return res.status(500).send('Invalid id!')

    const user = await UsersModel.findByPk(id)
    user && user.destroy()
    
    return res.status(200)
  }
}

module.exports = RouterUser;