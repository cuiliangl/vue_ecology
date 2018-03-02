## 全局API（下）

## 组件

什么是组件？我所理解的组件，是和视图相关的，比如一个页面，可以分成多个模块，那么每一个模块就可以看成是一个组件，当然了，每个组件中有各自的功能。

### 组件分为全局组件和局部组件。

#### 全局组件是在构造器外部定义的 

```html
<div id="app">
    <nav-bar></nav-bar>
</div>
```

```js
//定义全局组件
Vue.component('nav-bar', {
    template: "<div>我是子组件</div>"
})

new Vue({
    el: "#app",
    data: {
        title: "全局组件"
    }
})
```

#### 局部组件

局部注册的组件，只能在局部作用域中注册使用，其他作用域没用。

```html
<div id="app">
    <h2>{{ title }}</h2>
    <nav-bar></nav-bar>
</div>
```

```js
new Vue({
    el: "#app",
    data: {
        title: "局部组件"
    },//注册局部组件components是加‘s’的
    components: {
        'nav-bar':{
            template: "<div>这是局部组件</div>"
        } 
    }
})
```

## 父子组件之间的传值

### 父传子通过props属性

组件的作用域是独立的，我们不能够在子组建中直接使用父组件中的值。要使用父组件的值，需要通过props属性传递数据。

在父组件中自定义一个属性，并将要传递的值赋值给该属性（相当于一个载体），在子组件中通过props接受，数组中就是相应的‘载体’

```html
<div id="app">
    <h1>{{ title }}</h1>
    <nav-bar address="China"></nav-bar>
</div>
```

```js
//定义组件
var navBar = {
    template: "<div>我来自{{ address }}</div>",
    //接受父组件传递过来的值
    props: ['address']
}

new Vue({
    el: "#app",
    data: {
        title: '父组件向子组件传值'
    },
    components: {
        navBar
    }
})
```

### 属性中带‘-’的情况

比如：
```html
<div id="app">
    <nav-bar my-name="cuiliang"></nav-bar>
</div>
```

在子组件中通过props接受的时候，需要转换成驼峰式命名。

```js
var navBar = {
    template: "<div>我叫{{ myName }}</div>",
    props: ['myName']
}

new Vue({
    el: "#app",
    components: {
        navBar
    }
})
```

有坑，尽量少用或不用！

### 动态的props

在子组件中接收父组件动态的数据，需要用v-bind绑定，当父组件的值变化时，子组件相应的跟着变化。

在父组件中绑定message属性

```html
<div id="app">
    <input v-model = 'message'>
    <nav-bar v-bind:message = 'message'></nav-bar>
</div>
```

```js
var navBar = {
    template: "<div>你好啊怎么说：{{message}}</div>",
    props:['message']
}

new Vue({
    el: "#app",
    data: {
        message: '雷猴啊'
    },
    components: {
        navBar
    }
})
```
![](https://ooo.0o0.ooo/2017/06/27/59521fa8ee0d5.jpg)

### 字面量

```html
<!-- 传递了一个字符串 "1" -->
<nav-bar count="1"></nav-bar>
```
因为它是一个字面 prop ，值是字符串 "1" 而不是number。如果想传递一个实际的number，需要使用 v-bind ，从而让它的值被当作 JavaScript 表达式计算：

```html
<!-- 传递了一个字符串 "1" -->
<nav-bar :count="1"></nav-bar>
```

### 子传父

父组件通过props传值，那子组件怎么传给父，使用自定义事件。

父组件中通过v-on接收

```html
<div id="app">
    <h2>{{ title }}</h2>
    <div>{{ count }}</div>
    <hr>
    <!--count自定义事件接收-->
    <nav-bar v-on:getnum='result'></nav-bar>
</div>
```

子组件中通过$emit发射事件

```js
//定义子组件
var navBar = {
        template: "<div>我是子组件<div>{{ num }}</div><button @click = 'add'>add</button></div>",
        //这里是data函数
        data(){
            return{
                num: 0
            }  
        },
        methods: {
            add(){
                this.num ++
                this.$emit('getnum', this.num)//参数2是传递的值
            }
        }
    }

    new Vue({
        el: "#app", 
        data: {
            title: "子组件向父组件传值",
            count: 0
        },
        components: {
            navBar
        },
        methods: {
            //参数是传递过来的值
            result(val){
                this.count = val
            }
        }
    })
```


![](https://ooo.0o0.ooo/2017/06/27/59522e22a8cff.jpg)


### component标签

<component></component>是vue框架自定义的标签，作用就是让我们可以根据不同的状态选择不同的组件。

1、在模板中的component标签中绑定一个‘is’属性，通过点击按钮改变select属性的值，进而选择不同的组件。

```html
<div id ="#app">
    <component :is = 'select'></component>
    <button @click = 'changeComponent'>点击改变组件</button> 
</div>
```

2、定义三个组件
```js
var componentA = {
    template: "<div>这是组件A</div>"
}
var componentB = {
    template: "<div>这是组件B</div>"
}
var componentC = {
    template: "<div>这是组件C</div>"
}

new Vue({
    el: "#app",
    data: {
        select: componentA
    },
    methods: {
        changeComponent(){
            let select = this.select;
            if(select==componentA){
                select = componentB
            } else if (select == componentB){
                select = componentC
            } else {
                select = componentA
            }
        }
    },//注册组件
    components: {
        componentA, 
        componentB,
        componentC
    }
})

```