import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_SOCKET](state, socket) {
    state.socket = socket
  },
  [types.SET_CHATS](state, chats) {
    state.chats = chats
  }
}

export default mutations