const UsersModel = require('../app/models')['Users']
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const RouterUser = {
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
  }
}

module.exports = RouterUser;