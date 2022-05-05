var b = new Boolean(true);
console.log(typeof b); // object
console.log(b.valueOf()); // true

// 注意，false对应的包装对象实例，布尔运算结果也是true
if (new Boolean(false)) {
  console.log(true);
}

if (new Boolean(false).valueOf()) {
  console.log("true");
} // 无输出
// 上面代码的第一个例子之所以得到true，是因为false对应的包装对象实例是一个对象，
// 进行逻辑运算时，被自动转化成布尔值true（因为所有对象对应的布尔值都是true）。
// 而实例的valueOf方法，则返回实例对应的原始值，本例为false。

// Boolean对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值。
// 这时Boolean就是一个单纯的工具方法
Boolean(undefined); // false
Boolean(null); // false
Boolean(0); // false
Boolean(""); // false
Boolean(NaN); // false

Boolean(1); // true
Boolean("false"); // true
Boolean([]); // true
Boolean({}); // true
Boolean(function () {}); // true
Boolean(/foo/); // true
// 上面代码中几种得到true的情况，都值得认真记住。

// 使用双重的否运算符（!）也可以将任意值转为对应的布尔值。
console.log(!!undefined); // false
console.log(!!null); // false
console.log(!!0); // false
console.log(!!""); // false
console.log(!!NaN); // false

console.log(!!1); // true
console.log(!!"false"); // true
console.log(!![]); // true
console.log(!!{}); // true
console.log(!!function () {}); // true
console.log(!!/foo/); // true

// 对于一些特殊值，Boolean对象前面加不加new，会得到完全相反的结果，必须小心。

if (Boolean(false)) {
  console.log("true");
} // 无输出

if (new Boolean(false)) {
  console.log("true");
} // true

if (Boolean(null)) {
  console.log("true");
} // 无输出

if (new Boolean(null)) {
  console.log("true");
} // true
