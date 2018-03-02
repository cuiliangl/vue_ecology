# vuex

## 什么是vuex？
vuex是专门为vue.js设计的集中式状态管理架构。 那么什么是状态？状态可以理解为不同组件中共用的data属性。

## 为什么要使用vuex？
做项目的时，难免会有组件之间的传值。我们都知道，对于父子组件之间的传值，父传子通过props，子传父通过事件机制，也就是子通过$emit发射参数，父通过$on接受。非父子组件通过创建一个公共的的Vue实例，其实也是利用了父子组件传值的方法。

但是如果组件之间的通信很多，而且多个组件嵌套，这样不仅增加了传值的难度，把业务逻辑搞复杂，而且会对数据的管理特别混乱。而vuex很好的解决了这一问题。

## 初体验
### 引入vuex
1、安装vuex

```bash
 npm install vuex --save
```
一定要加--save，因为这个包我们是要在生产环境中使用的。

2、新建一个vuex文件夹（非必须的），并创建store.js文件，文件中引入vue和vuex并使用。
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

接下来就可以愉快的玩耍了。

首先我们先做一个加减运算的demo体验一下。

1、在store.js中引入常量const

```js
const state = {
    count: 3
}
```
   通过export default 将Store的实例暴露出去。
```js
export default new Vuex.Store ({
    state
})
```

2、新建vue模板，在模板中导入store.js文件。

```js
import store from '@/vuex/store'
```

```html
<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.count}}</h3>
    </div>
</template>
<script>
    import store from '@/vuex/store'
    export default{
        data(){
            return{
                msg:'加减运算'
            }
        },
        store
        
    }
</script>
```
此时我们在页面上就可以看到

![](https://ooo.0o0.ooo/2017/06/20/594880b9990c9.png)

### 下面添加两个加减按钮，通过点击按钮来改变值。

1、在模板中添加两个button按钮。

```html
<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.count}}</h3>
        <button @click = "$store.commit('add')">+</button>
        <button @click = "$store.commit('reduce')">-</button>
    </div>
</template>
<script>
    import store from '@/vuex/store'
    export default{
        data(){
            return{
                msg:'加减运算'
            }
        },
        store
        
    }
</script>
```


2、在store.js中加入两个改变state的方法。（这里的mutations是固定写法。
）
```js
const mutations={
    add(state){
        state.count++;
    },
    reduce(state){
        state.count--;
    }
}
```
然后我们就可以在页面点击按钮来实现数值的加减。

![](http://upload-images.jianshu.io/upload_images/5256541-44d56ce4a3f934d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

