var arr = ["a", "b", "c", "d", "e", "f"];
arr[6] = "g";
var arr1 = [
  { a: 1 },
  [1, 2, 3],
  function () {
    return true;
  },
];
console.log(arr1[0]);
console.log(arr1[1]);
console.log(arr1[2]);

console.log(Object.keys(arr));

// length-length属性的值就是最大的数字键+1
var a = [];
a["p"] = "abc";
console.log(a.length); // 0
a[2.1] = "abc";
console.log(a.length); // 0
// 上面的代码将数组的键分别设置为字符串和小数，结果不影响length属性，因为这个数组没有整数键

a[-1] = "a";
a[Math.pow(2, 32)] = "b";
console.log(a.length); // 0
console.log(a[-1]); // a
console.log(a[4294967296]); // b
// 上面代码，为数组添加了两个不合法的数字键，length属性没有变化。
// 但这些数字键都变成了字符串键名，所以可以取到值，数字键为默认转换为字符串

console.log("-1" in a); // true
console.log(-1 in a); // true
console.log(-2 in a); // false
// in 检查键名是否存在

for (const i in a) {
  console.log(a[i]);
  console.log(i);
}
// for...in 遍历循环数组，并且还会遍历不仅是数字键，也包含非数字键
// 所以不建议使用 for...in 遍历数组
var b = [1, 2, 3];
b[3.4] = 4;
b["a"] = 5;
for (var i = 0; i < b.length; i++) {
  console.log(b[i]);
}
var i = 0;
while (i < b.length) {
  console.log(b[i]);
  i++;
}
var l = b.length;
while (l--) {
  console.log(b[l]);
}
// 建议考虑使用 for 或者 while 遍历数组
var colors = ["red", "green", "blue"];
colors.forEach(function (color) {
  console.log(color);
});
// forEach 也可以用来遍历数组

var c = [1, , 1];
console.log(c.length); // 2
// 数组的空位不影响length，这个位置虽然没有值，但依旧是有效的
// 但最后一个元素的后面有逗号，并不认为是空位。
var d = [, , , 4];
console.log(d.length); // 4
console.log(d[1]); // undefined
console.log(d[3]); // 4
delete d[3];
console.log(d[3]); // undefined
// 删除数组元素会形成空位，但length属性不会变化，length属性不会过滤空位。
var e = [, , ,];
e.forEach(function (x, i) {
  console.log(i + ". " + x);
});
// 不产生任何输出
for (var i in e) {
  console.log(i);
}
// 不产生任何输出
Object.keys(e);
// []
// forEach, for, Object.keys 会过滤空位，但不会过滤undefined
var f = [undefined, undefined, undefined];
f.forEach(function (x, a) {
  console.log(a + ". " + x);
});
// 0. undefined
// 1. undefined
// 2. undefined

for (var i in f) {
  console.log(i);
}
// 0
// 1
// 2

console.log(Object.keys(f));
// ['0', '1', '2']

var obj = { 0: "a", 1: "b", 2: "c", length: 3 };
// obj 所有键名都是正整数或者零，并且有length属性， 这个对象就是'类似数组的对象'
// 但是它不是数组，并不具备数组的一些特有方法，如push

// arguments 对象
function args() {
  return arguments;
}
var arrayLike = args("a", "b");
console.log(arrayLike[0]); // a
console.log(arrayLike.length); // 2
console.log(arrayLike instanceof Array); // false

// DOM元素集
// var elts = document.getElementsByTagName("h3");
// console.log(elts.length);
// elts instanceof elts; // false

// 字符串
"abc"[1]; // b
"abc".length; // 3
"abc" instanceof Array; // false

// 数组的 slice 方法可以将类似数组的对象 变成真正的数组
var arr = Array.prototype.slice.call(arrayLike);
console.log(arr instanceof Array); // true

function print(value, index) {
  console.log(index + ". " + value);
}
Array.prototype.forEach.call(arrayLike, print);
// 可以通过call()把数组的方法放到类似数组的对象上面。

Array.prototype.forEach.call("abc", function (chr) {
  console.log(chr);
});
// 但此种方法比原生数组的forEach要慢，所以最好还是先将类似数组的对象转化为真正的数组
var arr = Array.prototype.slice.call("abc");
arr.forEach(function (chr) {
  console.log(chr);
});
