const http = require("http");
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // 中间件列表
    this.routes = {
      all: [],
      get: [],
      post: [],
    };
  }

  register(path) {
    const info = {};
    if (typeof path === "string") {
      info.path = path;
      info.stack = slice.call(arguments, 1); // 保存中间件为数组
    } else {
      // 第一个参数不是字符串默认是跟路由
      info.path = "/";
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  match(url, method) {
    let stack = [];
    if (url === "/favico.ico") return stack;
    // 获取routes
    let currRoutes = [];
    currRoutes = currRoutes.concat(this.routes.all);
    currRoutes = currRoutes.concat(this.routes[method]);

    currRoutes.forEach((middleware) => {
      if (url.indexOf(middleware.path) === 0) {
        stack = stack.concat(middleware.stack);
      }
    });
    return stack;
  }

  handle(req, res, stack) {
    const next = () => {
      const middleware = stack.shift();
      middleware && middleware(req, res, next);
    };
    next();
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(data));
      };
      const url = req.url;
      const method = req.method.toLowerCase();
      const resultList = this.match(url, method);
      this.handle(req, res, resultList);
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = () => {
  return new LikeExpress();
};
