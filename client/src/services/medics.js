import axios from 'axios'

const api = 'http://localhost:9001/api'

function getMedicsById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-medics-id?id=${id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getMedics () {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-medics`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getMedicsByName (name) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-medics-by-name`, {params: {name}})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function postMedic (params) {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/create-medic`, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function deleteMedic (id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${api}/delete-medic`, {data: {id}})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function editMedic (params) {
  return new Promise((resolve, reject) => {
    axios.put(`${api}/edit-medic`, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  getMedicsById,
  getMedics,
  getMedicsByName,
  postMedic,
  deleteMedic,
  editMedic
}
