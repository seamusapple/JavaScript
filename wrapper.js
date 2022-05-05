// 所谓“包装对象”，指的是与数值、字符串、布尔值分别相对应的Number、String、Boolean三个原生对象。
// 这三个原生对象可以把原始类型的值变成（包装成）对象。
var v1 = new Number(123);
var v2 = new String("abc");
var v3 = new Boolean(true);

console.log(typeof v1); // object
console.log(typeof v2); // object
console.log(typeof v3); // object

console.log(v1 === 123); // false
console.log(v2 === "abc"); // false
console.log(v3 === true); // false

// Number、String和Boolean这三个原生对象，如果不作为构造函数调用（即调用时不加new），
// 而是作为普通函数调用，常常用于将任意类型的值转为数值、字符串和布尔值。
// 字符串转为数值
Number("123"); // 123

// 数值转为字符串
String(123); // "123"

// 数值转为布尔值
Boolean(123); // true

// valueOf()方法返回包装对象实例对应的原始类型的值。
console.log(new Number(123).valueOf()); // 123
console.log(new String("abc").valueOf()); // abc
console.log(new Boolean(true).valueOf()); // true

// toString()方法返回对应的字符串形式。
new Number(123).toString(); // "123"
new String("abc").toString(); // "abc"
new Boolean(true).toString(); // "true"

// 某些场合，原始类型的值会自动当作包装对象调用，即调用包装对象的属性和方法。
// 这时，JavaScript 引擎会自动将原始类型的值转为包装对象实例，并在使用后立刻销毁实例

// 比如，字符串可以调用length属性，返回字符串的长度。
console.log("abc".length);
var str = "abc";
str.length;
// 等同于
var strObj = new String(str);
strObj.length;

// 自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。
var s = "hello world";
s.x = 123;
console.log(s.x); // undefined

// 我们可以新增一个double方法，使得字符串和数字翻倍
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};
console.log("abc".double()); // abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};
console.log((123).double()); // 246
// 注意，最后一行的123外面必须要加上圆括号，否则后面的点运算符（.）会被解释成小数点。
