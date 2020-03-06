//实现一个算法，确定一个字符串 s 的所有字符是否全都不同。
//
// 示例 1：
//
// 输入: s = "leetcode"
// 输出: false
// 示例 2：
//
// 输入: s = "abc"
// 输出: true

const isStringUniq = str => {
  if (str.length <= 1) return true;
  let hash = {};
  const array = str.split("");
  for (let i = 0; i < array.length; i++) {
    if (hash[array[i]]) {
      return false;
    } else {
      hash[array[i]] = true;
    }
  }
  return true;
};
