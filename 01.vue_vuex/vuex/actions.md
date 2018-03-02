## actions异步修改状态

### actions和mutations是类似的，不同之处在于：

* Action提交的是Mutation，不能够直接修改state中的状态，而Mutations是可以直接修改state中状态的；
* Action是支持异步操作的，而Mutations只能是同步操作。

还是通过代码来理解吧

1、在store.js中定义一个常量actions，如下：

```js
const mutations = {
    //注册事件  type:add  回调第一个参数是state
    add(state,val){
        state.count++
    },
    reduce(state, val){
        state.count --
    }
}

const actions = {
    //这里的actionAdd是组件中和所触发的事件相对应的方法
    actionAdd(context){
        context.commit('add')//这里的add是mutations中的方法
    },
    //这里是通过参数结构来简化代码。
    actionReduce( { commit } ){
        commit('reduce')
    }
}
```

Actions接受一个context对象参数，该参数具有和store实例相同的属性和方法，所以我们可以通过context.commit()提交mutations中的方法，或者可以通过context.state和context.getters去获取state和getters。

* context作为上下文对象，可以简单的理解成store实例，有共享store实例的属性和方法的权利，但是切记：context并不是store实例本身。

* { commit } 这里直接把commit为属性的对象传过来，可以让代码简单明了。

2、同样的，我们需要将actions导出去

```js
export defualt new Vuex.Store({
    state, mutations, actions
})
```

3、分发action：在组件中可以通过this.$store.dispatch分发action，或者使用mapActions辅助函数将methods映射为store.dispatch调用。

### Action 通过 store.dispatch 方法触发

```js

    add(){
        this.$store.dispatch('actionAdd')
    },
    reduce(){
        this.$store.dispatch('actionReduce')
    }
        
```

Actions支持同样的载荷方式和对象进行分发：

```js
    add(){
        this.$store.dispatch('actionAdd', {
            num: 20
        })
    },
    reduce(){
        this.$store.dispatch(
            {type:'actionReduce', num : 10}
        )
    }
```

在actions里对应的方法中第二个参数接受分发是传递的值。

### 使用mapActions辅助函数

```html
<button @click = 'actionAdd'>+</button>
<button @click = 'actionReduce'>-</button>
```

```js

//同样需要导入mapActions辅助函数
import { mapState, mapMutations, mapActions } from 'vuex'

methods: {

    //如果名字不同，使用mapActions辅助函数的对象参数
    //...mapActions( { add: 'actionAdd', reduce: 'actionReduce'} )

    //当action中的函数名和组件节点的方法名相同的时候，使用mapActions辅助函数的数组参数
    ...mapActions( ['actionAdd', 'actionReduce'] )

}

```


如果觉得以上不好理解，看下面代码，哈哈，这是写笔记的过程中尝试出来的（纯属瞎玩，正真开发是不带这么干的）。

```js
//组件通过触发事件去调用actions中的方法，进而调用mutations中的方法
    add(){
            console.log(this.$store._actions)
            this.$store._actions.actionAdd[0]()
    },
    reduce(){
            this.$store._actions.actionReduce[0]()
    }
```

为什么要这样做，我们先把store打印出来看看里边究竟是什么鬼便一目了然：

![](https://ooo.0o0.ooo/2017/06/22/594b6a3f938e6.png)

然后我们_action展开：

![](https://ooo.0o0.ooo/2017/06/22/594b6ab0483c2.png)

发现_action对象的两个属性就是我们在store.js的actions里定义的两个函数，值是分别是一个长度为1的数组。所以我们可以通过下面的这种方法也可以触发action中的方法，进而触发mutations中的方法。

这种方式仅仅是为了理解它是怎么一回事，在真正的开发中是不能这样做的，且不说代码乱，更重要的显示不专业啊。^_^










