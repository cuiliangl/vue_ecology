<template>
  <div>
    <h1>{{mess}}</h1>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  // props: [
  //   'mess'
  // ],
  // 或者
  props: {
    mess: {
      type: String,
      default: 'Hee'
    },
    title: {
      type: String
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="less">
  h1 {
    color: aqua;
  }
</style>
