import axios from 'axios'

const api = 'http://localhost:9001/api'

function getConsultationById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-consultation-id?id=${id}`)
      .then(res => {
        resolve(res)
      })
  })
}

function getConsultations () {

  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-consultations`)
      .then(res => {
        resolve(res)
      })
  })
}

function postConsultation (params) {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/create-consultation`, params)
      .then(res => {
        resolve(res)
      })
  })
}

function deleteConsultation (id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${api}/delete-consultation`, {data: {id}})
      .then(res => {
        resolve(res)
      })
  })
}

export default {
  getConsultationById,
  getConsultations,
  postConsultation,
  deleteConsultation,
}
