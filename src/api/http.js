import axios from 'axios'

const timeout = 15000
// const token = document.querySelector('meta[name=jwt-token]').content
const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZW1lbWJlciI6IjkyOGNiMjQwYjIwMWJkMzAwZDllNzE1Njc5ZDFlY2NiIiwic3ViIjoxLCJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjMwOTkvZG9vci9yZWZyZXNoIiwiaWF0IjoxNTQyNjM1Mjg5LCJleHAiOjE1NDUxMzgzMzMsIm5iZiI6MTU0MjcxOTEzMywianRpIjoiZVdhajh3VkV4QWhqUEY1eSJ9.lNzhJ5S2IpNQYYCv_bZw8-t015rojTNqA_681vCkDks'

export default (version = 'latest') => {
  const http = axios.create({
    baseURL: process.env.API_HOST,
    headers: { Accept: `application/x.api.${version}+json` },
    timeout: timeout
  })

  http.interceptors.request.use(config => {
    Object.assign(config.headers, {
      Authorization: `Bearer ${token}`
    })
    return config
  })

  http.interceptors.response.use(
    res => res.data.data,
    err => {
      if (err.message === `timeout of ${timeout}ms exceeded`) {
        return Promise.reject('网路请求超时，请稍候再试！') // eslint-disable-line prefer-promise-reject-errors
      }
      try {
        if (!err.response) {
          return Promise.reject('网络错误，请刷新网页重试！') // eslint-disable-line prefer-promise-reject-errors
        }
        let message = err.response.data.message
        if (typeof message === 'string') {
          return Promise.reject(message)
        }
        return Promise.reject(message[Object.keys(message)[0]][0])
      } catch (e) {
        // console.error(e);
      }
    }
  )

  return http
}
