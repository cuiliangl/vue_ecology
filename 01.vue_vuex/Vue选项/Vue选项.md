### Mixins混入

![](https://ooo.0o0.ooo/2017/06/30/5956388b6c164.jpg)

在项目开发中有两种情况会用到混入：

1、组件中已经写好了构造器，突然需要增加方法或者暂时用到的方法，这时用混入会减少源代码的污染。

2、很多组件都会用到公用方法，用混入的方法可以减少代码量，实现代码重用，提高代码的可维护性。

### 一、基础

```html
<div id="app">
    <h2>{{ num }}</h2>
    <button @click="add">点击增加</button>
</div>
```

```js
//定义一个混入对象
var myMixin = {
        updated: function () {
            console.log('这是混入的， 更新后的值是：'+this.num)
        }
    }

//定义一个使用混入对象的组件
new Vue({
    el: "#app",
    data: {
        num: 10
    },
    methods: {
        add() {
            this.num++
        }
    },
    //可以接收多个对象参数。对象中可以包含任意的组件选项，混入后，对象中的全部选项将混入到组件中。
    mixins: [myMixin]
})
```

![](https://ooo.0o0.ooo/2017/06/30/59560364b0ea8.jpg)

### 二、选型合并，Mixins的调用顺序

当组件和混合对象含有同名选项时，这些选项将以恰当的方式混合。比如，同名钩子函数将混合为一个数组，并且都将被调用。另外，混合对象的钩子将在组件自身钩子 之前 调用：

```js
//在构造器中同时加上updated选项
updated: function () {
    console.log('这是原生的updated')
}
```

![](https://ooo.0o0.ooo/2017/06/30/595609146697c.jpg)

我们会发现，执行的先后顺序是，混入的先执行，构造器里的后执行，所以，不并不是谁把谁覆盖，而是都执行。

值为对象的选项，例如 methods, components 和 directives，被混合为同一个对象。 如果两个对象键名冲突，取组件对象的键值对。

```html
<div id="app">
    <button @click="add">add</button>
    <button @click="reduce">reduce</button>
    <button @click="sub">sub</button>
</div>
```

```js
var myMethods = {
        methods: {
            reduce(){
                console.log('reduce')
            },
            sub(){
                console.log('sub, from mixin')
            }

        }
    }

    new Vue({
        el: "#app",
        data: {
            num: 10
        },
        methods: {
            add(){
                console.log('add')
            },
            sub(){
                console.log('sub, from self')
            }
        },
        mixins: [myMethods]
    })
```

![](https://ooo.0o0.ooo/2017/06/30/5956283c9614a.jpg)


### 三、全局混入

全局混入在项目中用的极少，而且尽量不要用。因为 一旦使用全局混合对象，将会影响到所有之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。

```js
//混入对象
var myMixin = {
    updated: function () {

        // this.num1 = this.num
        console.log('这是混入对象的，更新后的值是：'+this.num)
    }
}
//全局混入
Vue.mixin({
    updated:function(){
        console.log('这是全局混入')
    }
})
new Vue({
    el: "#app",
    data: {
        num: 10,
        // num1: 10
    },
    methods: {
        add() {
            this.num++
        }
    },
    //可以接收多个对象参数。对象中可以包含任意的组件选项，混入后，对象中的全部选项将混入到组件中。
    mixins: [myMixin],
    updated: function () {
        console.log('这是构造器里的：'+this.num)
    }
})
```


![](https://ooo.0o0.ooo/2017/06/30/595637444c56c.jpg)

从图中可以看出，全局混入的执行顺序要早于混入和构造器里的方法。

#### 谨慎使用全局混合对象，因为会影响到每个单独创建的 Vue 实例（包括第三方模板）。
