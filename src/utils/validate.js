/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * @description {string} 验证手机号 享元模式
 * @param {string} mobile
 * @return {boolean} true or false
 */
export function validMobile(mobile) {
  return /^1[3~9]\d{9}$/.test(mobile)
}
