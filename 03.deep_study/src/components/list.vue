<template>
  <transition name="slide-right">
    <div>
      <h1>Hello My Name Is Vue!</h1>
      <h3>采用编程式导航回到首页</h3>
      <a @click="gohome">回到首页</a>
      <br>
      <a @click="back">后退一步</a>
      <br>
      <router-link to="home">home</router-link>

    </div>
  </transition>
</template>

<script>
export default {
  created () {
    console.log(this.$store)
  },
  methods: {
    gohome () {
      // 字符串
      // this.$router.push('/')
      // 对象
      this.$router.push({ path: '/' })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">

  div {
    h1 {
      color: red;
    }
    a {
      cursor: pointer;
    }

  }

</style>
