## **React.createRef**

---

1、使用 createRef 获取 DOM 元素

```javascript
import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
class Child extends Component {
  constructor() {
    super();
    this.divRef = React.createRef();
  }
  componentDidMount() {
    console.log(this.divRef.current);
  }
  render() {
    return <div ref={this.divRef}>ref获取的dom元素</div>;
  }
}
```

this.divRef 是一个对象，里面有 current 这个 key， 保存了 div 这个 DOM 元素，我们可以获取元素原生的某些属性，比如获取元素宽高，增加事件等

2、使用 createRef 获取 React 组件

```javascript
import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
class Child extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return <div>子组件</div>;
  }
}
class Parent extends Component {
  constructor() {
    super();
    this.myChild = React.createRef();
  }
  componentDidMount() {
    console.log(this.myChild.current); //获取的是Child组件
  }
  render() {
    return <Child ref={this.myChild} />;
  }
}
```

this.divRef 是一个对象，里面有 current 这个 key， 保存了子组件 Child 的实例，获取到实例后可以调用实例的方法，这样我们方便有效的封装公共组件

3、如果想获取子组件的某个 DOM 元素可以更改一下 2 的例子,借用 props 属性

```javascript
import React, { Component } from "react";
import ReactDOM, { render } from "react-dom";
class Child extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}
  render() {
    return <div ref={this.props.myRef}>子组件</div>;
  }
}
class Parent extends Component {
  constructor() {
    super();
    this.myChild = React.createRef();
  }
  componentDidMount() {
    console.log(this.myChild.current); //获取的是Child组件
  }
  render() {
    return <Child myRef={this.myChild} />;
  }
}
```
