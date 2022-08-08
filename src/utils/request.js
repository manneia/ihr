import axios from 'axios'

// create an axios instance 单例模式
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use()

// response interceptor
service.interceptors.response.use()

export default service
