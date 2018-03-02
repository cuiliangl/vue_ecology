import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tabar from '@/components/tabar'
import List from '@/components/list'

import CallMe from '@/components/callme'
import Home from '@/components/home'
import Nav from '@/components/nav'
import Slider from '@/components/slider'
import Topic from '@/components/topic'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HelloWorld
  },
  {
    path: '/topic',
    name: 'topic',
    component: Topic
  },
  {
    path: '/home',
    // 重定向
    // redirect: '/'
    // 也可以是一个命名的路由
    // redirect: { name: 'home' }

    // 甚至是一个方法，动态返回重定向的目标
    redirect: to => {
      // 字符串路径
      // return '/'

      // 或者路径对象
      return {
        name: 'home'
      }
    }
  },
  {
    path: '/tabar',
    component: Tabar,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: 'callme',
        component: CallMe
      }
    ]
  },
  {
    path: '/list',
    // 注意：是components
    components: {
      default: List,
      nav: Nav,
      slider: Slider
    },
    name: 'List'
  }
]

export default new Router({
  // vue-router默认采用hash模式，如果不想要hash模式，采用history模式url就像正常url一样，不过这种方式需要服务端支持
  mode: 'history',
  // 在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写（基路径）
  // base: '/',
  routes,
  // 这个方法是在操作浏览器的后退前进按钮时savedPosition才有值
  scrollBehavior (to, from, savedPosition) {
    // console.log(to)
    // console.log(from)
    // console.log(savedPosition)
    if (savedPosition) {
      // console.log(savedPosition.y)
      return savedPosition
    }
  },
  // 激活当前link时的样式
  linkExactActiveClass: 'click_active'
})
