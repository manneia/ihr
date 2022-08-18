import service from '@/utils/request'

/**
 * @description {string} 获取员工简单列表
 * @returns {object} List
 */
export const getEmployeeSimple = () => service({
  url: '/sys/user/simple'
})

/**
 * @description {string} 获取员工列表
 * @param {object} data
 * @return {object} List
 */
export const getEmployeeList = params => service({
  url: '/sys/user',
  params
})

/**
 * @description {string} 删除员工
 * @param {*} id
 * @returns
 */
export const delEmployee = id => service({
  url: `/sys/user/${id}`,
  method: 'DELETE'
})

/**
 * @description {string} 新增员工
 * @param {object} data
 * @returns
 */
export const addEmployee = data => service({
  url: '/sys/user',
  method: 'POST',
  data
})
