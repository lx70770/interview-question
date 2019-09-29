<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 14:33:53
 * @LastEditTime: 2019-09-29 14:33:53
 * @LastEditors: your name
 -->
## **React.lazy && React.Suspense**

---

1、函数能让你像渲染常规组件一样处理动态引入（的组件）

使用之前：

```javascript
import OtherComponent from "./OtherComponent";
```

使用之后：

```javascript
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```

此代码将会在组件首次渲染时，自动导入包含 `OtherComponent` 组件的包。

`React.lazy` 接受一个函数，这个函数需要动态调用 `import()`。它必须返回一个 Promise，该 Promise 需要 resolve 一个 `defalut export` 的 React 组件。

然后应在 `Suspense` 组件中渲染`lazy`组件，如此使得我们可以使用在等待加载 `lazy` 组件时做优雅降级（如 loading 指示器等）。

```javascript
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

`fallback` 属性接受任何在组件加载过程中你想展示的 `React` 元素。你可以将 `Suspense` 组件置于懒加载组件之上的任何位置。你甚至可以用一个 `Suspense` 组件包裹多个懒加载组件。
