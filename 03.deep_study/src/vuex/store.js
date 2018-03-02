
import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

import topic from './modules/topic.js'
import hotTopic from './modules/hot_topic.js'

export default new Vuex.Store({
  modules: {
    topic,
    hotTopic
  }
})
