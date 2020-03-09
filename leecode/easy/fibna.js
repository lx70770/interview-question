// 斐波那契数列

const fib = n => {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
};
