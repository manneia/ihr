// 快捷访问
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  userInfo: state => state.user.userInfo,
  username: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto
}

export default getters
