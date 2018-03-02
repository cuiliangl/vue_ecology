
// 导入mutations-types
import { GET_TOPIC_LIST, CHANGE_AGE } from '../mutation-types'
import * as types from '../mutation-types'

// 定义初始状态

const state = {
  topicList: [],
  count: 100,
  userName: 'Jack',
  address: 'BeiJing',
  age: 12
}

// actions中可同步可异步
const actions = {
  getTopicList ({ state, commit, rootState }, params) {
    console.log(state)  // 模块的局部状态(当前模块的状态)
    console.log(rootState) // 所有模块组成的对象 eg: {topic, hotTopic}
    console.log(params) // 载荷
    let newList = []
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        newList = params.payload.map(item => {
          return 'name is: ' + item
        })
        commit(types.GET_TOPIC_LIST, newList)
        resolve()
      }, 3000)
    })
  }
}

// 相关的mutations  mutations必须是同步函数
const mutations = {
  [GET_TOPIC_LIST] (state, topiclist) {
    state.topicList = topiclist
  },
  [CHANGE_AGE] (state, payload) {
    state.age = payload.newAge + state.age
  }
}

const getters = {
  getInfo (state) {
    return state.userName + ' from ' + state.address
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}

// 模块内部的 mutations 和 getters 的第一个参数是模块的局部状态 state

// 模块内部 action 的第一个参数是一个对象conetxt，包括 state（局部状态） dispatch， commit， rootState(根状态，由所有模块组成的对象)

// 模块内部getters 的第一个参数是state（局部状态） 参数二是getters， 参数三是根状态
