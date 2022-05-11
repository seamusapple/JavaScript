// String 作为工具方法，将任意类型转换为字符串
console.log(String(true)); // 'true'
console.log(String(5)); // '5'

// String对象提供的静态方法（即定义在对象本身，而不是定义在对象实例的方法），
// 主要是String.fromCharCode()。
// 该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。
console.log(String.fromCharCode()); // ''
console.log(String.fromCharCode(97)); // 'a'
console.log(String.fromCharCode(104, 101, 108, 108, 111)); // 'hello'
// String.fromCharCode方法的参数为空，就返回空字符串；否则，返回参数对应的 Unicode 字符串
// 该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）

console.log(String.fromCharCode(0x20bb7)); // ஷ
console.log(String.fromCharCode(0x20bb7) === String.fromCharCode(0x0bb7)); // true
// 上面代码中，String.fromCharCode参数0x20BB7大于0xFFFF，导致返回结果出错。0x20BB7对应的字符是汉字𠮷，
// 但是返回结果却是另一个字符（码点0x0BB7）。这是因为String.fromCharCode发现参数值大于0xFFFF，
// 就会忽略多出的位（即忽略0x20BB7里面的2

/*
这种现象的根本原因在于，码点大于0xFFFF的字符占用四个字节，
而 JavaScript 默认支持两个字节的字符。这种情况下，必须把0x20BB7拆成两个字符表示。
*/
console.log(String.fromCharCode(0xd842, 0xdf87)); // 吉

// 字符串实例的length属性返回字符串的长度
console.log("abc".length); // 3

// charAt方法返回指定位置的字符，参数是从0开始编号的位置
var s = new String("abc");
console.log(s.charAt(1)); // b
console.log(s.charAt(s.length - 1)); // c

console.log("abc".charAt(1)); // b
console.log("abc"[1]); // b

// 如果参数为负数，或大于等于字符串的长度，charAt返回空字符串。
console.log("abc".charAt(-1)); // ''
console.log("abc".charAt(3)); // ''

// charCodeAt()方法返回字符串指定位置的 Unicode 码点（十进制表示），
// 相当于String.fromCharCode()的逆操作
console.log("abc".charCodeAt(1)); // 98

// 如果参数为负数，或大于等于字符串的长度，charCodeAt返回NaN。
console.log("abc".charCodeAt(-1)); // NaN

// concat方法用于连接两个字符串，返回一个新字符串，不改变原字符串
var s1 = "abc";
var s2 = "def";
console.log(s1.concat(s2)); // abcdef
console.log("a".concat("b", "c")); // abc

// 如果参数不是字符串，concat方法会将其先转为字符串，然后再连接
var one = 1;
var two = 2;
var three = "3";
console.log("".concat(one, two, three)); // 123
console.log(one + two + three); // 33

// slice()方法用于从原字符串取出子字符串并返回，不改变原字符串。
// 它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）
console.log("JavaScript".slice(0, 4)); // Java
// 如果省略第二个参数，则表示子字符串一直到原字符串结束
console.log("JavaScript".slice(4)); // Script
// 如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度
console.log("JavaScript".slice(-6)); // Script
console.log("JavaScript".slice(0, -6)); // Java
console.log("JavaScript".slice(-2, -1)); // p

// 如果第一个参数大于第二个参数（正数情况下），slice()方法返回一个空字符串
console.log("JavaScript".slice(2, 1)); // ''

// substring方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice方法很相像。
// 它的第一个参数表示子字符串的开始位置，第二个位置表示结束位置（返回结果不含该位置）
console.log("JavaScript".substring(0, 4)); // Java
// 如果省略第二个参数，则表示子字符串一直到原字符串的结束。
console.log("JavaScript".substring(4)); // Script

// 如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置
console.log("JavaScript".substring(10, 4)); // Script
// 等同于
console.log("JavaScript".substring(4, 10)); // Script

// 如果参数是负数，substring方法会自动将负数转为0
console.log("JavaScript".substring(-3)); // JavaScript
console.log("JavaScript".substring(4, -3)); // Java
// 参数-3会自动变成0，等同于'JavaScript'.substring(4, 0)。
// 由于第二个参数小于第一个参数，会自动互换位置，所以返回Java

// substr方法用于从原字符串取出子字符串并返回，不改变原字符串，跟slice和substring方法的作用相同。
// substr方法的第一个参数是子字符串的开始位置（从0开始计算），第二个参数是子字符串的长度
console.log("JavaScript".substr(4, 6)); // Script
// 如果省略第二个参数，则表示子字符串一直到原字符串的结束
console.log("JavaScript".substr(4)); // Script
// 如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串
console.log("JavaScript".substr(-6)); // Script
console.log("JavaScript".substr(4, -1)); // ''
// 参数-1自动转为0，表示子字符串长度为0，所以返回空字符串。
