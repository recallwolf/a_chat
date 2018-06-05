import axios from 'axios'

export function login(username, password) {
  const url = '/api/login'

  return axios.post(url, {
    username: username,
    password: password
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function check(username, token) {
  const url = '/api/check'

  return axios.post(url, {
    username: username,
    token: token
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function register(username, email, password, repassword) {
  const url = '/api/register'

  return axios.post(url, {
    username: username,
		email: email,
		password: password,
	  repassword: repassword
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}