// this就是属性或方法“当前”所在的对象。
// 由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的
var A = {
  name: "zhangsan",
  describe: function () {
    return "xingming: " + this.name;
  },
};
var B = {
  name: "lisi",
};
B.describe = A.describe;
console.log(B.describe()); // xingming: lisi

function f() {
  return "xingming: " + this.name;
}
var A1 = {
  name: "zhangsan",
  describe: f,
};
var B1 = {
  name: "lisi",
  describe: f,
};
console.log(A1.describe()); // xingming: zhangsan
console.log(B1.describe()); // xingming: lisi
// 只要函数被赋给另一个变量，this的指向就会变
