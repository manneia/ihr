import service from '@/utils/request'

/**
 * @description {string} 查询企业的部门列表
 * @returns {Object} Departments
 */
export const getDepartments = () => service({
  url: '/company/department'
})

/**
 * @description {string} 删除企业部门
 * @param {number} id
 */
export const delDepartment = id => service({
  url: `/company/department/${id}`,
  method: 'DELETE'
})

/**
 * @description {string} 修改部门信息
 * @param {number} id
 */
export const updateDepartment = data => service({
  url: `/company/department/${data.id}`,
  method: 'PUT',
  data
})

/**
 * @description {string} 新增部门
 * @param {object} data
 */
export const addDepartment = data => service({
  url: '/company/department',
  method: 'POST',
  data
})

/**
 *  @description {string} 根据id获取部门详情
 * @param {number} id
 * @returns
 */
export const getDepartDetail = id => service({
  url: `/company/department/${id}`
})
