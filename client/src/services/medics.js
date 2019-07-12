import axios from 'axios'

const api = 'http://localhost:9001/api'

function getMedicsById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-medics-id?id=${id}`)
      .then(res => {
        resolve(res)
      })
  })
}

function getMedics () {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-medics`)
      .then(res => {
        resolve(res)
      })
  })
}

function postMedic (params) {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/create-medic`, params)
      .then(res => {
        resolve(res)
      })
  })
}

export default {
  getMedicsById,
  getMedics,
  postMedic
}
