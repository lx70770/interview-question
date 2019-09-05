## **React.createContext 16.3 版本引入**

---

`相较于之前的Context API，老的Context中，由上而下的’触发更新‘很有可能呗中间某个组件的shouldComponentUpdate打断，导致某个子组件不会更新`

#### 新版 React.createContext 如何解决旧版 API 的问题呢？

```javascript
const ThemeContext = React.createContext("light");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: "light" };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.setState(({ theme }) => ({
      theme: theme === "light" ? "dark" : "light"
    }));
  }

  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <AppBody onClick={this.toggleTheme} />
        </ThemeContext.Provider>
      </div>
    );
  }
}

class AppBody extends React.PureComponent {
  render() {
    console.log("AppBody rendered");
    const { onClick } = this.props;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <button style={styles[theme]} onClick={onClick}>
            {theme}
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}
```

#### 可见 ThemeContext 会有 Provider 和 Consumer 两部分。分别用来提供 value 和消费（获取并使用）value。（注意 Consumer 的 children 是一个 function，而不是一个 Element.）

#### 注意示例中的 AppBody 是一个 PureComponent，并且除了不会变的 onClick 外没有其他的 props，在 App 中每次 state 变化时 AppBody 的 shouldComponentUpdate 必定返回 false，但是 theme 却能正确更新。神奇不神奇？

#### 这里用到了发布订阅模式以及高阶函数的特性

```javascript
const emitter = {
  listeners: [],
  on: fn => {
    emitter.listeners.push(fn);
  },
  off: fn => {
    emitter.listeners.splice(emitter.listener.findIndex(fn), 1);
  },
  emit: value => {
    emitter.listeners.forEach(fn => fn(value));
  }
};

function createContext(defaultValue) {
  class Provider extends React.PureComponent {
    componentDidUpdate() {
      emitter.emit(this.props.value);
    }

    componentDidMount() {
      emitter.emit(this.props.value);
    }

    render() {
      return this.props.children;
    }
  }

  class Consumer extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { value: defaultValue };

      emitter.on(value => {
        console.log(value);
        this.setState({ value });
      });
    }

    render() {
      return this.props.children(this.state.value);
    }
  }

  return { Provider, Consumer };
}
```

#### 这里解释一下：

1. 创建了一个 emitter
2. 在 Provider 里的 componentDidUpdate 和 componentDidMount 中触发 emmiter.emit
3. 在 Consumer 里注册监听，一旦有 value 变化，便触发 this.setState，自然会触发 re-render

所以这里我们能看出来，只要 Provider 的 value 有变化，就一定会触发 Consumer 的 state 变化。在老的 Context 中被 shouldComponentUpdate 打断的“触发链”又被重新接上了。
