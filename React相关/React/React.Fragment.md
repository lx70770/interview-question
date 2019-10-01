<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-01 21:28:53
 * @LastEditTime: 2019-10-01 21:28:53
 * @LastEditors: your name
 -->
## **React.Fragment**

---

React 中一个常见模式是为一个组件返回多个元素。 片段(fragments) 可以让你将子元素列表添加到一个分组中，并且不会在 DOM 中增加额外节点。

```javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

带 `key` 的 片段`(fragments)`
如果你需要一个带 key 的片段，你可以直接使用 `<React.Fragment />` 。 一个使用场景是映射一个集合为一个片段数组 — 例如：创建一个描述列表：

```javascript
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，将会触发一个key警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```
