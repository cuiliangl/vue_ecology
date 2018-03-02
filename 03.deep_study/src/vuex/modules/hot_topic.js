
import { GET_HOT_LIST } from '../mutation-types'

const state = {
  num: 10
}

const actions = {
  getHotLists ({ commit }) {
  }
}

const mutations = {
  [GET_HOT_LIST] (state, newNum) {
    state.num = newNum
  }
}

export default {
  state,
  actions,
  mutations
}
