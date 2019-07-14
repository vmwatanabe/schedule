import axios from 'axios'

const api = 'http://localhost:9001/api'

function getUserById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-user-id?id=${id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getUsers () {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-users`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function getUsersByName (name) {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/get-users-by-name`, {params: {name}})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function postUser (params) {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/create-user`, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function deleteUser (id) {
  return new Promise((resolve, reject) => {
    axios.delete(`${api}/delete-user`, {data: {id}})
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function editUser (params) {
  return new Promise((resolve, reject) => {
    axios.put(`${api}/edit-user`, params)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  getUserById,
  getUsers,
  postUser,
  deleteUser,
  editUser,
  getUsersByName
}
