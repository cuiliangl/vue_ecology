## state访问状态对象

vuex使用单一的状态树，用一个对象包括了整个应用的所有状态，也就是整个应用只包含一个store实例。

## 在vue组件中获取vuex状态

在上一文中我们通过插值表达式来获取state中的状态，当获取多个状态的时候，且不说代码看起来冗余，而且很不专业。

那有没有别的方法改变这一状况呢？答案当然是有的，下面介绍三种方式。

由于Vuex的状态存储是响应式的，所以从store中读取状态最简单的方法就是通过computed计算属性。每当state中的状态发生变化时，就会重新计算获取计算属性从而映射到View。

### 一、通过computed的计算属性直接赋值


```html
<template>
  <div> 
        <h1>{{ msg }}</h1>
        <h2>{{ count }}</h2>
        <button @click = "$store.commit('add')">+</button>
        <button @click = "$store.commit('reduce')">-</button>
  </div>
</template>
<script>
import store from '@/vuex/store'
export default {
  data(){
      return {
          msg: '加减运算'
      }
  },
  store,
  //方法一：通过计算属性
   computed: {
         count(){
              return this.$store.state.count;
         }
   }
}
</script>
```
注意： `return this.$store.state.count` 这里的this必须写，因为在模板中引入store之后，它便成了vue实例中的一个属性。

这种方式好理解，但是当一个组件有多个状态的时候，会造成计算属性重复和代码冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性：

### 二、通过mapState函数的对象参数来赋值

```html
    <h2>{{ count }}</h2>
    <h2>{{ count1 }}</h2>
    <h2>{{ count2 }}</h2>
```

```js
//导入
import { mapState } from 'vuex'

expotr default {
    data(){
      return {
          msg: '加减运算',
          num: 33
      }
    },
    store,
    //方法二：通过mapState对象来赋值
    computed:mapState({

        //使用箭头函数
        count: state=>state.count,

        //传入字符串 ‘count’ 等同于 `state => state.count`
        count1: 'count',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        count2(state){
            return state.count + this.num
        }
    })
}

```

结果如下：

![](https://ooo.0o0.ooo/2017/06/20/5948a45d460da.png)

### 三、通过mapState函数的数组参数来赋值

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

```js
    // 映射 this.count 为 store.state.count
    computed:mapState(['count'])
```










