import axios from 'axios'

const api = 'http://localhost:9001/api'

function getUserById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-user-id?id=${id}`)
      .then(res => {
        resolve(res)
      })
  })
}

function getUsers () {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-users`)
      .then(res => {
        resolve(res)
      })
  })
}

function postUser (params) {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/create-user`, params)
      .then(res => {
        resolve(res)
      })
  })
}

function deleteUser (id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${api}/delete-user`, {data: {id}})
      .then(res => {
        resolve(res)
      })
  })
}

export default {
  getUserById,
  getUsers,
  postUser,
  deleteUser,
}
