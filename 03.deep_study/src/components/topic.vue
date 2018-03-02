<template>

  <div>
    <h1>study getters</h1>
    <!--<h2>通过computes计算属性获取到的gettters中的值： {{getInfo}}</h2>-->
    <h2>通过computes计算属性获取到的gettters中的值： {{userInfo}}</h2>
    <hr>
    <h1>study mutations</h1>
    <h2>通过提交mutations改变state中的状态</h2>
    <h3>age的值是： {{topic.age}}</h3>

    <!-- 载荷在 commit 给mutations的时候设置 -->
    <!--<button @click="changeAge">改变age的值</button>-->

    <h3>载荷在方法中设置</h3>

    <!-- 载荷在方法中设置，mapMutations方法传递的是一个数组，mutations 的类型必须和事件名相同 -->
    <!--<button @click="CHANGE_AGE({newAge: 3})">改变age的值</button>-->
    <br>
    <!-- 载荷在方法中设置， mutations方法传递一个对象，键--事件名，值---mutations类型  -->
    <button @click="changeAge({newAge: 3})">改变age的值</button>
    <br>

    <hr>
    <h1>actions study</h1>
    <h2>在methods中通过diapatch 派发 actions获取数据</h2>
    <button @click="getTopicList">获取list</button>
    <!--<button @click="getTopicList({payload: list})">辅助函数获取list</button>-->
    <ul>
      <li v-for="(item, index) in topic.topicList" v-bind:key="index">{{index}}----{{item}}</li>
    </ul>

  </div>

</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
    data () {
      return {
        list: ['Mike', 'Jack', 'Rose']
      }
    },
    // 一、通过计算属性的返回值获取
    // computed: {
    //   getInfo () {
    //     return this.$store.getters.getInfo
    //   }
    // }

    // 二、 通过mapGetters辅助函数获取
    //   computed: mapGetters([
    //     'getInfo'
    //   ])
    // 三、如果要指定新的变量名则需要在mapGetters中传递对象
    // computed: mapGetters({
    //   'userInfo': 'getInfo'
    // }),
    computed: {
      ...mapGetters({
        'userInfo': 'getInfo'
      }),
      // 切记： 在使用辅助函数时一定要清楚数组中的值是state中的直接值还是module对象
      ...mapState([
        'topic'
      ])
    },
    // methods: {
    // 载荷在commit中设置
    //   changeAge () {
    //     this.$store.commit({
    //       type: 'CHANGE_AGE',
    //       newAge: 12
    //     })
    //   }
    // }

    // 在组件methods中使用mapMutations，载荷的传递在方法中设置
    methods: {
      // 事件名和mutations类型名相同
      // ...mapMutations([
      //   'CHANGE_AGE'
      // ])
      // mapMutations() 的返回值也是一个对象，键为changeAge,值为 mutations中的CHANGE_AGE方法
      ...mapMutations({
        changeAge: 'CHANGE_AGE'
      }),
      // 派发action
      getTopicList () {
        // console.log(this.$store.dispatch)
        console.log(this.$store)
        // this.$store.dispatch('getTopicList')

        // 传递载荷  dispatch执行完后默认返回Promise对象
        const promise = this.$store.dispatch({
          type: 'getTopicList',
          payload: ['Mike', 'Jack', 'Rose']
        })
          .then(res => {
            console.log('异步执行完毕，返回Promise对象，此次action执行完毕')
            console.log(promise)
          })

        // 这种方式一般用来触发多个有先后顺序的action
        console.log(promise)
      }

      // 使用mapActions辅助函数
      // ...mapActions([
      //   'getTopicList'
      // ])
    }
}
</script>

<style scoped>

</style>
