<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to='/tabar' >菜单</router-link>
    <h3>Hello Vue</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: 12
    }
  },
  created () {
    // console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
