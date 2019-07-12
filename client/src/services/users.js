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

export default {
  getUserById,
  getUsers,
}
