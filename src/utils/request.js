import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from './auth'
import router from '@/router'

// create an axios instance 单例模式
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

const TIMEOUT = 2 * 60 * 60 * 1000
const isCheckTimeout = () => {
  return Date.now() - getTimeStamp() > TIMEOUT
}
// request interceptor
service.interceptors.request.use(config => {
  // 统一的去注入token,判断token是否存在
  if (store.getters.token) {
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    if (isCheckTimeout()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了,请重新登录'))
    }
    // 每次发起请求都要检查token是否过期
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
  // #region
  // 增加代码的稳定性
  // if (error.response && error.response.data && error.response.data.code === 10002) {
  //   store.dispatch('user/logout') // 登出操作
  //   // 跳转到登录页
  //   router.push('/login')
  // } else {
  //   Message.error(error.message)
  // }
  // #endregion
  // babel做处理   ? 判断之前的内容是否存在,存在才会执行下一步   template 不能写这种语法
  if (error.response?.data?.code === 10002) {
    store.dispatch('user/logout') // 登出操作
    // 跳转到登录页
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service
