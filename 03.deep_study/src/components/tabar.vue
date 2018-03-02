<template>

  <div>
    <ul>
      <li>
        <router-link to="/tabar">首页</router-link>
      </li>
      <li>
        <router-link :to="{name: 'List'}">关于我</router-link>
      </li>
      <li>

        <router-link to="/tabar/callme">联系我</router-link>
      </li>
      <li>

        <router-link to="/topic">话题页</router-link>
      </li>
    </ul>
    <div></div>
    <!--<About mess="Vue父组件通过props属性传递给子组件传递数据" :title="title"/>-->
    <router-view></router-view>
    <hr>
    <div>
      <h3>一、通过计算属性获取vuex中的状态</h3>
      <h2>这是store中的状态：{{num}}</h2>
      <hr>
      <h3>二、通过mapState({})获取vuex中的状态</h3>
      <!--<h2>这是store中的状态count：{{count}}</h2>-->
      <!--<h2>这是store中的状态userName：{{topic.userName}}</h2>-->
      <!--<h2>这是store中的状态address：{{address}}</h2>-->

      <hr>
      <h3>三、通过mapState([])获取vuex中的状态</h3>
      <!--<h2>这是store中的状态count：{{topic.count}}</h2>-->
      <!--<h2>这是store中的状态userName：{{topic.userName}}</h2>-->
      <!--<h2>这是store中的状态address：{{topic.address}}</h2>-->

      <hr>
      <h3>四、通过展开运算符获取vuex中的状态和当前实例中的状态</h3>
      <h2>这是当前组件中定义的计算属性： {{age}}</h2>
      <h2>这是store中的状态count：{{topic.count}}</h2>
      <h2>这是store中的状态userName：{{topic.userName}}</h2>
      <h2>这是store中的状态address：{{topic.address}}</h2>


    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        title: 'this is title',
        route: this.$route,
        num: 10
      }
    },
    created () {
      // console.log(this.$store)
      // console.log(this.$route.params.id)
    },
    // 一、vuex中的state在组件计算属性中的使用方式
    // computed: {
    //   num () {
    //     return this.$store.state.topic.count
    //   }
    // }

    // 二、如果一个组件中需要引用多个store中的状态，如果都通过计算属性获取就会使得代码冗余和重复。使用mapState辅助函数帮助生成计算属性
    // computed: mapState({
    //   count: state => {
    //     // console.log(state)
    //     return state.topic.count
    //   },
    //
    //   // 传递字符串参数 ‘topic’ 等同于 state.topic
    //   topic: 'topic',
    //   // 如果要使用this，则需要使用常规函数
    //   address (state) {
    //     return `${this.topic.userName} 的住址是： ${state.topic.address}`
    //   }
    // }),

    // 三、当计算属性的名称和state的子节点相同时，给mapState传递一个数组
    // computed: mapState([
    //   'topic'
    // ])

    /* 四、因为computed属性的值是一个对象，从方法二、三中可以得出mapState的返回值是一个对象
       如果我们组件中还要使用别的计算属性，可以通过对象展开运算符
    */
    computed: {
      age () {
        return this.num + 10
      },
      ...mapState([
        'topic'
      ])
    }

    // 在watch中检测$route，需要在父容器中，也就是说该组件中有子路由
    // watch: {
    //   $route (to, from) {
    //     console.log(to)
    //     console.log(from)
    //   }
    // }
  }
</script>

<style scoped lang="less">

  div {
    width: 100%;
    height: 50px;
  }

  ul {
    list-style: none;
    li {
      width: 100px;
      height: 100%;
      margin: 20px;
      float: left;
    }
  }
</style>
