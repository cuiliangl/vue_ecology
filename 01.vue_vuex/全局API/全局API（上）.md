## 全局API

### 一、全局API

何为全局API？ 通俗的说就是在构造器之外，Vue提供的一些API函数，可以使我们定义新的功能。

### 自定义指令 Vue.directive

通过例子来看：定义一个指令，让num的颜色变成红色。

```html
    <div id="app">
        <div v-cui="color">{{ num }}</div>
        <button @click = "add">增加</button>
    </div>
```
#### 传入一个函数

```js
    Vue.directive('cui', function(el, binding, vnode){
            //console.log(el)//绑定了自定义指令‘cui’的节点
            //console.log(binding)//是一个对象，包含指令的很多信息。
            //console.log(vnode)//编译生成的虚拟节点

            el.style.color = binding.value;
    })

    var app = new Vue({
        el: "#app",
         data: {
             num: 10,
             color: 'red'
         },
         methods: {
             add(){
                 this.num++
             }
         }
    })
```

#### 传入一个对象，分别是五个生命周期钩子函数
```html
 <div id="app" v-cloak>
        <div v-cui="color">{{ num }}</div>
        <button @click = "add">增加</button>
       
    </div>
    <button onclick = 'unbind()'>解绑</button>
```

```js
//五个生命周期钩子函数，我们可以在不同周期进行相应的操作
Vue.directive('cui', {
        bind: function () {
            console.log('第一次被绑定')
        },
        inserted: function(){
            console.log('被绑定元素插入到父节点')
        },
        update: function(){
            console.log('组件更新')
        },
        componentUpdated: function(){
            console.log('组件更新完成')
        },
        unbind: function(){
            console.log('组件解绑')
        }
    })
    //解绑函数需要定义在构造器之外
    function unbind(){
        app.$destroy()
    }

    var app = new Vue({
        el: "#app",
         data: {
             num: 10,
             color: 'red'
         },
         methods: {
             add(){
                 this.num++
                //  this.color = "green"
             }
         }
    })
```


1. bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个执行一次的初始化操作。
2. inserted:被绑定元素插入父节点时调用。

![](https://ooo.0o0.ooo/2017/06/26/5950b8bc341a1.jpg)

3. update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
4. componentUpdated:被绑定元素所在模板完成一次更新周期时调用。

![](https://ooo.0o0.ooo/2017/06/26/5950baba07766.jpg)

5. unbind:只调用一次，指令与元素解绑时调用。

![](https://ooo.0o0.ooo/2017/06/26/5950bbdd0d4b8.jpg)


### 二、extend扩张实例构造器

```html
<div id="app">
        <nav-bar id="nav"></nav-bar>
</div>
```

```js
    //扩张构造器
    var NavBar = Vue.extend({
        template: "<div><ul><a :href='url'><li>{{msg1}}</li></a><li>{{msg2}}</li></ul></div>",
        data(){
            return {
                msg1: '首页',
                url: 'https://baidu.com',
                msg2: '关于我'
            }
        }
    })

    //创建自定义构造器实例，并挂载
    new NavBar().$mount('#nav')//这里可以是id，类名，标签名
```

效果：

![](https://ooo.0o0.ooo/2017/06/26/5950c383c67f9.jpg)


### 三、Vue.set

Vue.set的作用是在构造器外部操作构造器内部的数据、属性或方法。比如，在Vue构造器内部定义一个数num为10，在外部定义一个方法改变num的值。

```html
<div>{{ num }}</div>
```

```js
    //引用构造器外部数据
    var datas = {
        num: 10,
        stars: ['柳岩', '刘亦菲', '刘诗诗']
    }

    //三种方式改变num的值
    function add() {
        //1、 直接操作外部数据
        datas.num ++ 

        //2、 用Vue对象的方式添加
        app.num ++ 

        //3、 用Vue.set的方式改变
        Vue.set(datas, 'num', 20)
    }
    var app = new Vue({
        el: "#app",
        data: datas,
        methods: {
            add(){
                console.log(this.stars)
                this.stars[1] = '高圆圆'
            }
        }
    })
```

这时候你可能会产生疑问，为什么要用这么复杂的方式去改变num的值，当然了，单纯的去改变数的值，自然是没必要这么做的，不妨看下面的例子，我们通过问题来引入：

假设我们通过一个事件去改变数组中的某个元素，你会发现，值改变了，但是并没有更新视图。

```html
<div id="#app">
    <ul>
        <li v-for = "star in stars">{{ star }}</li>
    </ul>
    <button @click = 'add()'>add</button>
</div>
```
通过点击事件，将‘刘亦菲’改成‘高圆圆’

```js
//引用构造器外部数据
    var app = new Vue({
        el: "#app",
        data: {
            stars: ['柳岩', '刘亦菲', '刘诗诗']
        },
        methods: {
            add(){
                console.log(this.stars)
                this.stars[1] = '高圆圆'
                
            }
        }
    })
```   
结果是数组的值变了，但是并没有更新视图。

![](https://ooo.0o0.ooo/2017/06/26/5950d0ab7fca8.jpg) 

这种问题是由于Javascript的限制，Vue不能自动检测以下变动的数组。

* 当你利用索引直接设置一个项时，vue不会为我们自动更新。

但是，当我们在一个事件中同时改变一个数的值，那么此时要改变的数组中的值也会相应的改变。原因是虚拟DOM，当我们通过事件改变num的值时，会改变虚拟DOM，触发视图的更新。如下：

```js
    data: {
        num: 10,
        stars: ['柳岩', '刘亦菲', '刘诗诗']
    },
    methods: {
        add(){
            this.num ++ 
            this.stars[1] = '高圆圆'
            console.log(this.stars)
            //this.stars.push('赵丽颖')
        }
    }
```
![](https://ooo.0o0.ooo/2017/06/26/5950d5b789035.jpg)

但是我们在实际项目开发中，只需要改变数组中的某个元素，那么久需要Vue.set()了。

```js
var datas = {
    stars: ['柳岩', '刘亦菲', '刘诗诗']
}

function add() {
        //改变数组中的元素
        Vue.set(app.stars, 1, '高圆圆')
}

var app = new Vue({
    el: "#app",
    data: datas
})
```

![](https://ooo.0o0.ooo/2017/06/26/5950d7ade8a68.jpg)

#### 也可以在构造器实例中通过Vue.set()去改变，效果也是一样的。

```html
<ul>
   <li v-for = "star in stars">{{ star }}</li>
</ul>
<button @click = 'add()'>add</button>
```

```js
var app = new Vue({
    el: "#app",
    // data: datas,
    data: {
        stars: ['柳岩', '刘亦菲', '刘诗诗']
    },
    methods: {
    add(){
        // this.stars[1] = '高圆圆'
        // console.log(this.stars)
        Vue.set(app.stars, 1, "高圆圆")
        }
    }
})
```

### 四、生命周期

何为生命周期？对一个生物来说，生命周期便是从出生到死亡的过程，那中间一定还有很多的时间点，比如，少年、青年、中年、老年等，不同阶段可以做不同的事情。Vue中的生命周期也是如此，它包括从Vue实例的创建到销毁，以及中间经历的不同时间点。

Vue所有的生命周期钩子自动绑定在this上下文到实例中，因此可以访问数据，并对属性和方法进行运算。同时意味着不能使用箭头函数来定义一个生命周期方法。因为箭头函数绑定了父上下文，因此this与你期待的Vue实例不同。

![](https://ooo.0o0.ooo/2017/06/26/5950dfcc4972e.png)

还是通过代码来看吧：

```html
<div id="app">
    <div>{{ num }}</div>
    <button @click = "add">add</button>
    <button onclick="app.$destroy()">销毁</button>
</div>
```

```js
var app = new Vue({
    el: "#app",
    data: {
        num : 10
    },
    methods: {
        add(){
            this.num ++
        }
    },
    // 实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
    beforeCreate:function(){
        console.log('1-beforeCreate 实例初始化之后');
    },
    created:function(){
        console.log('2-created 创建完成');
    },
    beforeMount:function(){
        console.log('3-beforeMount 挂载之前');
    },
    mounted:function(){
        console.log('4-mounted 被创建');
    },
    beforeUpdate:function(){
        console.log('5-beforeUpdate 数据更新前');
    },
    updated:function(){
        console.log('6-updated 被更新后');
    },
    activated:function(){
        console.log('7-activated');
    },
    deactivated:function(){
        console.log('8-deactivated');
    },
    beforeDestroy:function(){
        console.log('9-beforeDestroy 销毁之前');
    },
    destroyed:function(){
        console.log('10-destroyed 销毁之后')
    }

})
```

#### 初次打开页面

![](https://ooo.0o0.ooo/2017/06/26/5950e1b4bdde9.jpg)

#### 点击按钮，更新组件

![](https://ooo.0o0.ooo/2017/06/26/5950e1f287ebd.jpg)

#### 点击销毁按钮

![](https://ooo.0o0.ooo/2017/06/26/5950e26c7fa8c.jpg)

[Vue组件的生命周期](http://www.cnblogs.com/webbest/p/6722780.html)这篇文章对生命周期钩子的解释还是比较通俗的。

1、beforeCreate

　　在实例初始化之后，数据观测和event/watcher时间配置之前被调用。

2、created

　　实例已经创建完成之后被调用。在这一步，实例已经完成以下的配置：数据观测，属性和方法的运算，watch/event事件回调。然而，挂载阶段还没开始，$el属性目前不可见。

3、beforeMount

　　在挂载开始之前被调用：相关的render函数首次被调用。

　　该钩子在服务器端渲染期间不被调用。

4、mounted

　　el被新创建的vm.$el替换，并挂在到实例上去之后调用该钩子函数。如果root实例挂载了一个文档内元素，当mounted被调用时vm.$el也在文档内。

　　该钩子在服务端渲染期间不被调用。

5、beforeUpdate

　　数据更新时调用，发生在虚拟DOM重新渲染和打补丁之前。

　　你可以在这个钩子中进一步第更改状态，这不会触发附加的重渲染过程。

　　该钩子在服务端渲染期间不被调用。

6、updated

　　由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子。

　　当这个钩子被调用时，组件DOM已经更新，所以你现在可以执行依赖于DOM的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。

　　该钩子在服务端渲染期间不被调用。

7、activated

　　keep-alive组件激活时调用。

　　该钩子在服务器端渲染期间不被调用。

8、deactivated

　　keep-alive组件停用时调用。

　　该钩子在服务端渲染期间不被调用。

9、beforeDestroy 【类似于React生命周期的componentWillUnmount】

　　实例销毁之间调用。在这一步，实例仍然完全可用。

　　该钩子在服务端渲染期间不被调用。

10、destroyed

　　Vue实例销毁后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

　　该钩子在服务端渲染不会被调用。

