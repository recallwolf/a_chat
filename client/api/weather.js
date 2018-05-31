import axios from 'axios'

export function getWeather() {
  const url = '/api/weather'
  
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}