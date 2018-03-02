<template>
  <div>
    <hr>
    <h2>name 为slider的router-view</h2>
    <h3>
      这是slider组件
    </h3>
  </div>
</template>

<script>
  export default {
    created () {
      console.log(this.$store)
      // console.log(store.state.topicList.topicList)
    }
  }
</script>

<style scoped>

  h3 {
    color: red;
  }

</style>
