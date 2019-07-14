import axios from 'axios'

const api = 'http://localhost:9001/api'

function getConsultationById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-consultation-id?id=${id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getConsultations (params) {

  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-consultations`, {params})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function postConsultation (params) {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/create-consultation`, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function deleteConsultation (id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${api}/delete-consultation`, {data: {id}})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function editConsultation (params) {
  return new Promise((resolve, reject) => {
    axios.put(`${api}/edit-consultation`, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  getConsultationById,
  getConsultations,
  postConsultation,
  deleteConsultation,
  editConsultation
}
