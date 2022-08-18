import service from '@/utils/request'

/**
 * @description {string} 获取公司信息
 * @param {number} id
 * @return {Object} companyInfo
 */
export const getCompanyInfo = id => service({
  url: `/company/${id}`
})

/**
 * @description {string} 获取角色列表
 * @param {Object} params
 * @return {Array} RoleList
 */
export const getRoleList = params => service({
  url: '/sys/role',
  params // query参数
})

/**
 * @description {string} 根据id删除角色
 * @param {number} id
 * @return
 */
export const delRole = id => service({
  url: `/sys/role/${id}`,
  method: 'DELETE'
})

/**
 * @description {string} 根据id更新角色
 * @param {number} id
 * @returns
 */
export const updateRole = data => service({
  url: `/sys/role/${data.id}`,
  method: 'PUT',
  data
})

/**
 * @description {string} 新增角色
 * @param {*} data
 * @returns
 */
export const addRole = data => service({
  url: `/sys/role`,
  method: 'POST',
  data
})

/**
 * @description {string} 根据id获取角色详情
 * @param {number} data
 * @returns
 */
export const getRoleDetail = data => service({
  url: `/sys/role/${data.id}`
})
