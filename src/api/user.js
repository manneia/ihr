import service from '@/utils/request'
/**
 * @description {string} 登录
 * @param {object} data
 * @return {object} response object
 */
export const login = (data) => service({
  url: '/sys/login',
  method: 'post',
  data
})
/**
 * @description {string} 获取用户信息对象
 * @param {*} token
 * @returns {object} userInfo
 */
export const getUserInfo = (token) => service({
  url: '/sys/profile',
  method: 'POST'
})
/**
 * @description {string} 员工基本信息
 * @param {number} id
 * @returns {object} userInfo
 */
export const getUserDetailById = (id) => service({
  url: `/sys/user/${id}`
})
export const logout = () => service({})
