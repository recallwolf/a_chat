import axios from 'axios'

export function getExpress(number, code) {
  const url = '/api/express'

  return axios.get(url, {
    params: {
      type: code,
      postid: number
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}