## Mutations修改状态的值

Vue的视图是由数据驱动的，也就是说state里面的数据是动态变化的，那么怎么改变呢，切记在Vuex中store数据改变的唯一方法就是mutation！什么意思？也就算说我们不能够直接通过一个事件或方法去修改state中的状态，必须将事件提交（commit）给mutation，并且事件接收state作为第一个参数。

通俗的理解，mutations里面装着一些改变数据方法的集合，这是Veux设计很重要的一点，就是把处理数据逻辑方法全部放在mutations里面，使得数据和视图分离。

每个 mutation 都有一个字符串的事件类型 (type) 和 一个回调函数 (handler)。事件类型就是通过$store.commit()提交的事件，比如：$store.commit('add')，回调函数就是我们实际进行状态更改的地方，它作为store中的mutations对象里的一个属性而存在。

下面通过例子来一看究竟：

### 通过$store.commit()的方式提交

1、在组件中
```html
<div>
      <h1>{{ msg }}</h1>
      <div>{{ count }}</div>
      <!--调用type 触发回调-->
      <button @click = "$store.commit('add')">+</button>
      <button @click = "$store.commit('reduce')">-</button>
  </div>
```

2、在store.js中定义一个常量mutations对象。

```js
const mutations = {
    add(state){ //注册事件  type:add  回调第一个参数是state
        state.count++
    },
    reduce(state){
        state.count--
    }
}
```

然后将mutations和state导出去

```js
export default new Vuex.Store({
    state,
    mutations
})
```

3、组件中引入store 
```js
import store from '@/vuex/store'

export default {
     data(){
        return {
            msg: "加减运算"
        }
    },
    store,
    computed:mapState([
        'count'
    ])
}
```


### 传值（ 提交载荷（Payload））

刚才只是一个简单的修改state中的属性，而在实际项目中往往会有值传递。

$store.commit()接收额外的参数，称之为mutations的载荷。

1、比如我们在加减时分别传入不同的参数

```html
<button @click = "$store.commit('add', 20)">+</button>
<button @click = "$store.commit('reduce', 10)">-</button>
```

2、在mutations中接收参数

```js
const mutations = {
    add(state, val){
        state.count += val
    },
    reduce(state, val){
        state.count -= val
    }
}
```

### 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读。

```html
<!--需要注意的是，对象中的属性一定要加引号-->
<button @click = "$store.commit('add', { 'amount': 20 } )">+</button>
<button @click = "$store.commit('reduce', { 'amount': 10 } )">-</button>
```

```js
const mutations = {
    add(state, val){
        state.count += val.amount
    },
    reduce(state, val){
        state.count -= val.amount
    }
}
```

### 对象风格的提交方式

还有一种提交方式是对象风格的提交，也就是提交mutation的时候直接使用type属性的对象。

上代码吧：

```html
<button @click = "$store.commit({type: 'add', 'num': 20})">+</button>
<button @click = "$store.commit({type: 'reduce', 'num': 10})">-</button>
```

同理，在实际开发中，如果一个组件有多个事件，在模板中通过$store.commit()这种方式来提交mutation和传值，肯定会造成代码冗余且不利于维护。可以通过mapMutations辅助函数将组件中的 methods 映射为 store.commit 调用。

### 在组件中提交Mutations

1、首先引入mapMutations

```js
import { mapState, mapMutations } from 'vuex'
```

2、添加methods属性，并加入mapMutations
```js
export default {
    data() {
        return {
            msg: "加减运算"
        }
    },
    store,
    computed: mapState([
        'count'
    ]),
    // methods: mapMutations([
    //     'add', 'reduce'
    // ]),

    //或者
    methods: {
        //如果组件中事件的名称和mutations中方法的名称相同，可以传一个字符串数组
        ...mapMutations([
            'add'  //映射 this.add() 为 this.$store.commit('add')
        ]),
        //组件中的事件名和mutations中的方法名不一样，传入对象
        ...mapMutations({
            reduces: 'reduce' //映射 $this.reduces 为 this.store.commit('reduce')
        })
    }
}
```

### Mutations必须是同步函数

一条重要的原则是Mutations必须是同步函数。

```js
store.commit('add')
//任何由add事件改变的状态都应该在此刻完成。
```









