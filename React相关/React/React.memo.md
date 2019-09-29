<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 14:55:04
 * @LastEditTime: 2019-09-29 16:53:30
 * @LastEditors: Please set LastEditors
 -->

## **React.memo**

---

1、在 React 中，为了避免 React 组件的无用渲染，我们可以实现自己的 shouldComponentUpdate 生命周期函数。
当 React 想要渲染一个组件的时候，它将会调用这个组件的 shouldComponentUpdate 函数, 这个函数会告诉它是不是真的要渲染这个组件。

```javascript
shouldComponentUpdate(nextProps, nextState) {
    if (this.state.count === nextState.count) {
        return false
    }
    return true
}
```

2、除此之外，我们可以使用`React v15.5`提供的 API `React.PureComponent`来浅比较。`React`在进行组件更新时，如果发现这个组件是一个`PureComponent`，它会将组件现在的`state`和`props`和其下一个`state`和`props`进行浅比较，如果它们的值没有变化，就不会进行更新。要想让你的组件成为`Pure Component`，只需要`extends React.PureComponent`即可。

3、对于函数组件，它们没有诸如`state`的东西去保存它们本地的状态(虽然在`React Hooks`中函数组件可以使用`useState`去使用状态), 所以我们不能像在类组件中使用`shouldComponentUpdate`等生命函数去控制函数组件的重渲染。当然，我们也不能使用`extends React.PureComponent`了，因为它压根就不是一个类。所以，我们可以使用`React v16.6`引入的新方法: `React.memo`.它的作用和`React.PureComponent`类似，是用来控制函数组件的重新渲染的。`React.memo(...)` 其实就是函数组件的`React.PureComponent`。

```javascript
const Funcomponent = () => {
  return <div>Hiya!! I am a Funtional component</div>;
};
const MemodFuncComponent = React.memo(FunComponent);
```

- React.PureComponent 是银
- React.memo(...)是金
- React.PureComponent 是给 ES6 的类组件使用的
- React.memo(...)是给函数组件使用的
- React.PureComponent 减少 ES6 的类组件的无用渲染
- React.memo(...)减少函数组件的无用渲染
  为函数组件提供优化是一个巨大的进步
