const UsersModel = require('../app/models')['Users']

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

    const user = await UsersModel.create({name, email, phone})
    res.json(user)
  }
}

module.exports = RouterUser;