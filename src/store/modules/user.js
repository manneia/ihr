import { login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'
// vuex 不能持久化 token 绝大部分放在cookie中 实现持久化
const state = {
  token: getToken() || null // 最开始从cookie中取值 没有就是null
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    // 将最新的token存储到cookie中 实现持久化
    setToken(token)
  },
  REMOVE_TOKEN(state) {
    state.token = null
    // 清除cookie中的token 防止刷新时 cookie中的token依然存在
    removeToken()
  }
}

const actions = {
  // context 全局上下文
  // data 载荷
  async login(context, data) {
    // 调用接口
    const token = await login(data)
    context.commit('SET_TOKEN', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

