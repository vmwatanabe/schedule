const express = require('express')
const app = express()
const router = express.Router()

const bodyParser = require('body-parser')
const models = require('../app/models')
const Op = models.Sequelize.Op

const RouterUsers = require('../routes/users')
const RouterMedics = require('../routes/medics')
const RouterConsultations = require('../routes/consultations')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

router.get('/', (req, res) => {
  models.Users.Op
  models.Users.findAll().then(pr => console.log(pr))
  res.json({message: 'Node BFF'})
})

router.route('/create-user').post(RouterUsers.post)
router.route('/create-medic').post(RouterMedics.post)
router.route('/create-consultation').post(RouterConsultations.post)

app.use('/api', router)

app.listen(9001, () => {
  console.log('servidor on!')
})

