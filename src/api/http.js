import fly from 'flyio'

const timeout = 15000
// const token = document.querySelector('meta[name=jwt-token]').content
const token =
  document.querySelector('meta[name=jwt-token]').content ||
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZW1lbWJlciI6IjI4ZGUzZWQ3ZmUyNjgzMTAzZTg5NGI1YTBiOGMwNjFjIiwic3ViIjoyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjMwOTkvZG9vci9sb2dpbiIsImlhdCI6MTU0NDUyODEzOSwiZXhwIjoxNTQ2OTQ3MzM5LCJuYmYiOjE1NDQ1MjgxMzksImp0aSI6IklKNG1TSHAxa3dJc0VWWXYifQ.1wPpubQb9BadZ_6ITbULnjIYmETmsbErzHzcFkyjtMU'

export default (version = 'latest') => {
  fly.interceptors.request.use(request => {
    request.baseURL = process.env.API_HOST
    request.headers['Accept'] = `application/x.api.${version}+json`
    request.headers['Authorization'] = `Bearer ${token}`
    request.timeout = timeout
    return request
  })

  fly.interceptors.response.use(
    res => res.data.data,
    err => {
      if (!err.response) {
        return Promise.reject(`网路请求失败！${err.message}`)
      }
      const { status } = err.response
      if (status === 0) {
        return Promise.reject('网络错误，请刷新网页重试！')
      }
      if (status === 1) {
        return Promise.reject('网路请求超时，请稍候再试！')
      }
      const { message } = err.response.data
      if (typeof message === 'string') {
        return Promise.reject(message)
      }
      return Promise.reject(message[Object.keys(message)[0]][0])
    }
  )

  return fly
}
