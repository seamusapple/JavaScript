// Object 对象本身的方法
Object.print = function (o) {
  console.log(o);
};

// Object 实例方法
Object.prototype.print = function () {
  console.log(this);
};

var obj = new Object();
obj.print(); // Object

// Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。
// 这个方法常用于保证某个值一定是对象。

// 如果参数为空（或者为undefined和null），Object()返回一个空对象。
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);

console.log(obj instanceof Object);

var obj = Object(1);
console.log(obj instanceof Object); // true
console.log(obj instanceof Number); // true

var obj = Object("foo");
console.log(obj instanceof Object); // true
console.log(obj instanceof String); // true

var obj = Object(true);
console.log(obj instanceof Object); // true
console.log(obj instanceof Boolean); // true

// 如果Object方法的参数是一个对象，它总是返回该对象，即不用转换
var arr = [];
var obj = Object(arr); // 返回愿数组
console.log(obj === arr); // true

var value = {};
var obj = Object(value); // 返回原对象
obj === value; // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn; // true

function isObject(value) {
  return value === Object(value);
}
isObject([]); // true
console.log(isObject(true)); // false

var obj = {
  p1: 123,
  p2: 456,
};
console.log(Object.keys(obj));
console.log(Object.getOwnPropertyNames(obj));
// 对于一般的对象来说，Object.keys()和Object.getOwnPropertyNames()返回的结果是一样的。
// 只有涉及不可枚举属性时，才会有不一样的结果。Object.keys方法只返回可枚举的属性，
// Object.getOwnPropertyNames方法还返回不可枚举的属性名。
var a = ["Hello", "World"];
console.log(Object.keys(a));
console.log(Object.getOwnPropertyNames(a));

var obj = new Object();
console.log(obj.valueOf() === obj); // true
console.log(obj.toString());

console.log(Object.prototype.toString.call(value));
/*
不同数据类型的Object.prototype.toString方法返回值如下。

数值：返回[object Number]。
字符串：返回[object String]。
布尔值：返回[object Boolean]。
undefined：返回[object Undefined]。
null：返回[object Null]。
数组：返回[object Array]。
arguments 对象：返回[object Arguments]。
函数：返回[object Function]。
Error 对象：返回[object Error]。
Date 对象：返回[object Date]。
RegExp 对象：返回[object RegExp]。
其他对象：返回[object Object]
*/
var type = function (o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

[
  "Null",
  "Undefined",
  "Object",
  "Array",
  "String",
  "Number",
  "Boolean",
  "Function",
  "RegExp",
].forEach(function (t) {
  type["is" + t] = function (o) {
    return type(o) === t.toLowerCase();
  };
});
console.log({});
console.log(type([]));
console.log(type(5));
console.log(type(null));
console.log(type());
console.log(type(/abcd/));
console.log(type(new Date()));

console.log(type.isObject({}));
console.log(type.isArray([]));
console.log(type.isString([]));

var obj = {
  p: 123,
};
console.log(obj.hasOwnProperty("p")); // true
console.log(obj.hasOwnProperty("toString")); // false
// 对象obj自身具有p属性，所以返回true。toString属性是继承的，所以返回false。
