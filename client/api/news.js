import axios from 'axios'

export function getNews(category) {
  const url = '/api/news'
  
  return axios.get(url, {
    params: {
      category: category
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}