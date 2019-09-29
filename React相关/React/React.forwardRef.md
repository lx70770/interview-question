## **React.forwardRef**

---

1、Ref forwarding 是一种将 ref 钩子自动传递给组件的子孙组件的技术。对于应用的大部分组件，这种技术并不是那么的必要。然而，它对于个别的组件还是特别地有用的，尤其是那些可复用组件的类库。下面的文档讲述的是这种技术的最常见的应用场景。

```javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 假如你没有通过 React.createRef的赋能，在function component上你是不可以直接挂载ref属性的。
// 而现在你可以这么做了，并能访问到原生的DOM元素:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
1、我们通过调用`React.createRef`来生成了一个`React ref`，并且把它赋值给了`ref`变量。

2、我们通过手动赋值给`<FancyButton>`的`ref`属性进一步将这个`React ref`传递下去。

3、接着，React又将`ref`传递给`React.forwardRef()`调用时传递进来的函数`(props, ref) => ...`。届时，`ref`将作为这个函数的第二个参数。

4、在`(props, ref) => ...`组件的内部，我们又将这个`ref`
传递给了作为UI输出一部分的组件。

5、当`<button ref={ref}>`组件被真正地挂载到页面的时候，，我们就可以在使用`ref.current`来访问真正的DOM元素`button`了。
