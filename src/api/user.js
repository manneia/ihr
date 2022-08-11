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

export const getInfo = (token) => service({ })

export const logout = () => service({})
