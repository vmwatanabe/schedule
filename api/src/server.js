const express = require('express')
const app = express()
const router = express.Router()

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

router.get('/', (req, res) => {
  res.json({message: 'Node BFF'})
})

app.use('/api', router);

app.listen(9001, () => {
  console.log('servidor on!')
})
