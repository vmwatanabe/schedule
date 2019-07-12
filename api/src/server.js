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
  res.json({message: 'Schedule API'})
})

// USERS ROUTES
router.route('/get-users').get(RouterUsers.getAll)
router.route('/get-user-id').get(RouterUsers.getById)
router.route('/get-users-by-name').get(RouterUsers.getByName)
router.route('/create-user').post(RouterUsers.post)

// MEDICS ROUTES
router.route('/get-medics').get(RouterMedics.getAll)
router.route('/get-medic-id').get(RouterMedics.getById)
router.route('/get-medics-by-name').get(RouterMedics.getByName)
router.route('/create-medic').post(RouterMedics.post)

// CONSULTATIONS ROUTES
router.route('/get-consultations').post(RouterConsultations.getAll)
router.route('/create-consultation').post(RouterConsultations.post)

app.use('/api', router)

app.listen(9001, () => {
  console.log('servidor on!')
})

