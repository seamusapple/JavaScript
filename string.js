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