## getters 过滤计算属性

在项目开发中，有时候希望对state中的某个属性派生出新的状态，比如对state中的count属性加100：

```js
computed: {
  count () {
    return this.$store.state.count +=100
  }
}
```
但是，如果我们有多个组件，每个组件需要派生出相同的状态，这时候常规的做法要么把相同的代码复制粘贴多次，要么抽取出来放在新的文件中，然后导入，再调用。但是这样做都不是最佳的。

在vuex中可以定义一个属性getters，对state中的状态进行过滤操作，并且getters接受第一个参数state。

可以把getters理解成store.js的计算属性，看代码吧：

1、在store.js中定义常量getters，添加一个属性count1

```js
const getters = {
    count1: function(state){
        return state.count += 100;
    }
}
```

2、同样作为store的属性暴露出去。

```js
export defualt new Vuex.Store({
    state,
    getters
})
```

3、在组件的计算属性中获取
```js
methods: {
    count1: function(){
        return this.store.getters.count1;
    }
}
```

需要注意的是：每次count发生变化的时候，都会进行加10操作，即执行getters中的计算属性。state中的状态（属性）输出（映射到视图）之前，先去getters中执行相关的过滤操作，然后将操作后的新的状态映射到视图。所以getters是在state输出之前进行的操作。

### Getters 也可以接受其他 getters 作为第二个参数，比如：

```js
const getters = {
    count1: function(state){
        return state.count += 100;
    },
    num: function(state, getters){
        return getters.count1 - 50
    }
}
```

在组件中一样可以获取相应的值：

```html
computed: {
    // ...
    count3:function(){
            return this.$store.getters.num;
    }
}
```

### mapGetters 辅助函数

state和mutations都有相应的map引用方法对模板中的编码进行简化，getters也有，看代码。

1、首先引入mapGetters

```js
import { mapGetters } from 'vuex'
```

2、使用对象展开运算符将 getters 混入 computed 对象中

当getters中的属性和组件节点的属性相同时可以通过mapGetters辅助函数的数组参数来赋值。如下：

```js
computed: {
    ...mapGetters(['count1'])
}

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
computed: {
    ...mapGetters({
        count3: 'count1'
    })
}
```



