import axios from 'axios'

export function robot(data) {
  const url = '/api/robot'
  
  return axios.get(url, {
    params: {
      data: data
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
