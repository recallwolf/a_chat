import * as types from './mutation-types'

const mutations = {
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_START_STATION](state, startStation) {
    state.startStation = startStation
  },
  [types.SET_END_STATION](state, endStation) {
    state.endStation = endStation
  },
  [types.SET_TIME](state, time) {
    state.time = time
  }
}

export default mutations