import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true // 发送请求时携带 cookie
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，例如添加 token、设置请求头等
    return config
  },
  (error) => {
    // 请求出错时的处理
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 在响应接收之后做一些处理，例如解析数据、处理错误码等
    return response
  },
  (error) => {
    // 响应出错时的处理
    return Promise.reject(error)
  }
)

export default api
