import jsonp from 'common/js/jsonp'
import axios from 'axios'

export function getImage() {
  const url = 'https://bing.ioliu.cn/v1'

  const data = {
    w: 1920,
    h: 1080,
    d: 0,
    type: 'json'
  }

  return jsonp(url, data)
}

export function getText() {
  const url = '/api/daily'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}