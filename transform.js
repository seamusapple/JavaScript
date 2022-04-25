// Number
console.log(Number("423")); // 423
console.log(Number("424abd")); // NaN
console.log(Number("")); // 0
console.log(Number(undefined)); //NaN
console.log(Number(null)); // 0
// Number函数将字符串转为数值，要比parseInt函数严格很多。
// 基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN。
console.log(parseInt("42 car")); // 42
console.log(Number("42 car")); // NaN
// parseInt和Number函数都会自动过滤一个字符串前导和后缀的空格
console.log(parseInt("\t\v\r12.34\n")); // 12
console.log(Number("\t\v\r12.34\n")); // 12.34
