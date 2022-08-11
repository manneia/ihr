import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance 单例模式
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // 统一的去注入token
  if (store.getters.token) {
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// response interceptor
// 两个参数都写上
// 失败 处理逻辑 消息提示 返回 Promise.reject()
// 成功 直接返回
service.interceptors.response.use(response => {
  const { data, success, message } = response.data
  // success true表示成功  false表示失败
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
