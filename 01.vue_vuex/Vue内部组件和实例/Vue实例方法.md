### Vue实例方法之生命周期

#### 一、$mount()挂载方法

$mount是用来挂载扩张的。如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。

比如我们扩张了一个全局组件，通过$mount手动的挂载到DOM上，也就生成了一个Vue实例。

```html
<div id="#app"></div>
```

扩张一个全局组件，并且挂载到DOM上。

```js
//扩张全局的组件
var navBar = Vue.extend({
    template: `<div>{{ title }}</div>`,
    data(){
        return {
            title: 'Vue 扩展的全局组件'
        }
    },
    mounted(){
        console.log('挂载上了')
    }
})

//使用全局扩张的组件，挂载到id为#app的DOM上（会替换#app）
var vm = new navBar().$mount('#app');

//或者
var vm = new navBar({el: "#app"})
```

如果没有提供 elementOrSelector 参数，模板将被渲染为文档之外的的元素，并且必须使用原生DOM API把它插入文档中。

```js
//在文档之外渲染，并且挂载
var navbar = new navBar().$mount()
document.getElementById('app').appendChild(navbar.$el)
```


#### 二、$destroy()销毁方法

作用： 完全销毁一个实例。

Vue 实例销毁后调用。调用后，Vue 实例相关的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

```html
<div id="app">
        
</div>
<button onclick="destroy()">销毁</button>
```

在组件中挂载destroyed生命周期钩子

```js
var navBar = Vue.extend({
    template: `<div>
                    <div>{{ title }}</div>
                    <h2>{{ num }}</h2>
                    <button @click = 'add'>add</button>
                </div>`,
    data(){
        return {
            title: 'Vue 全局扩展组件',
            num: 10
        }
    }
    destroyed(){
        console.log('销毁了')
    },
    methods: {
        add(){
            this.num++
        }
    }
})

//使用全局扩张的组件，挂载到id为#app的元素上
var vm = new navBar().$mount('#app');

//销毁
function destroy(){
    //点击按钮，销毁vm实例，控制台会输出‘销毁了’，当再次点击的时候不会输出，而且点击add按钮，数量也不会改变，说明已经销毁了
    vm.$destroy()
}
```

![](https://ooo.0o0.ooo/2017/07/01/595757a0c6155.jpg)


#### 三、$forceUpdate()更新方法

该方法是迫使Vue实例重新渲染。注意：它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

看代码：

```html
<button onclick="reload()">刷新</button>
```

```js
//同样的，为了看到是否重新更新了数据，即是否执行了reload方法，我们在实例中添加updated选项
updated(){
    console.log('数据重新渲染了')
}

//三、更新数据方法
function reload(){
    vm.$forceUpdate()
}
```
点击更新按钮，控制台打印出updated钩子中的输出，说明Vue实例重新渲染了。

![](https://ooo.0o0.ooo/2017/07/01/595759833c9c8.jpg)

#### 四、$nextTick()数据修改方法

该方法是构造器data中的数据被修改后触发，相当于updated钩子函数，但还是有区别的：它是在updated钩子函数执行完之后执行其里边的回调函数。也就是将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

```js
methods: {
    add(){
        //更改数据
        this.num++
        this.$nextTick(function(){
            console.log('DOM现在更新了')
        })
    }
},
updated(){
    console.log('数据更新成：'+this.num)
}
```


![](https://ooo.0o0.ooo/2017/07/01/59575b91c537f.jpg)

通过控制台的打印结果，可以看到，当数据改变时，updated钩子早于$nextTick中的回调。