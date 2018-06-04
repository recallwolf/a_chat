import axios from 'axios'

export function getTicket(startStation, endStation, time) {
  const url = '/api/ticket'
  
  return axios.get('/api/ticket', {
    params: {
      startStation: startStation,
      endStation: endStation,
      time: time
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
