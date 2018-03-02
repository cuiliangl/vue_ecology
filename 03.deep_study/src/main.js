// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'

Vue.use(Vuex)

import '../static/base.less'

import store from './vuex/store.js'

Vue.config.productionTip = false

/* eslint-disable no-new */

/* 为了避免在每一个组件中导入并引用store，可以将store添加到根组件中，
   store将会注入到每一个子组件 在子组件中通过this.$store访问。
*/

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
