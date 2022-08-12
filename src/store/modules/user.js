import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, removeToken, setTimeStamp, setToken } from '@/utils/auth'

// vuex 不能持久化 token 绝大部分放在cookie中 实现持久化
const state = {
  token: getToken() || null, // 最开始从cookie中取值 没有就是null
  userInfo: {} // 初始化的值必须是对象
}

const mutations = {
  // 设置TOKEN
  SET_TOKEN(state, token) {
    state.token = token
    // 将最新的token存储到cookie中 实现持久化
    setToken(token)
  },
  // 移除TOKEN
  REMOVE_TOKEN(state) {
    state.token = null
    // 清除cookie中的token 防止刷新时 cookie中的token依然存在
    removeToken()
  },
  SET_USERINFO(state, data) {
    state.userInfo = data
  },
  REMOVE_USERINFO(state) {
    state.userInfo = {}
  }
}

const actions = {
  // context 全局上下文
  // data 载荷
  async login(context, data) {
    // 调用接口
    const token = await login(data)
    context.commit('SET_TOKEN', token)
    // 登录成功一瞬间,记录现在的时间戳
    setTimeStamp()
  },
  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    const detail = await getUserDetailById(userInfo.userId)
    const result = { ...userInfo, ...detail }
    context.commit('SET_USERINFO', result)
  },
  logout(context) {
    context.commit('REMOVE_TOKEN')
    context.commit('REMOVE_USERINFO')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

