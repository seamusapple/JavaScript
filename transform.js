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

// Number方法的参数是对象时，将返回NaN，除非是包含单个数值的数组
console.log(Number({ a: 1 })); // NaN
console.log(Number([1, 2, 3])); // NaN
console.log(Number([5])); // 5
// 第一步，调用对象自身的valueOf方法。如果返回原始类型的值，
// 则直接对该值使用Number函数，不再进行后续步骤。

// 第二步，如果valueOf方法返回的还是对象，则改为调用对象自身的toString方法。
// 如果toString方法返回原始类型的值，则对该值使用Number函数，不再进行后续步骤。

// 第三步，如果toString方法返回的是对象，就报错。

var obj = { x: 1 };
console.log(Number(obj)); // NaN
// 等同于
if (typeof obj.valueOf() === "object") {
  Number(obj.toString());
} else {
  Number(obj.valueOf());
}

/*
var obj = {
  valueOf: function () {
    return {};
  },
  toString: function () {
    return {};
  },
};

console.log(Number(obj));
// // TypeError: Cannot convert object to primitive value
*/

console.log(
  Number({
    valueOf: function () {
      return 2;
    },
  })
); // 2

console.log(
  Number({
    toString: function () {
      return 3;
    },
  })
); // 3

console.log(
  Number({
    valueOf: function () {
      return 2;
    },

    toString: function () {
      return 3;
    },
  })
); // 2

String();
// 原始类型值
/*
1. 数值： 转为相应的字符串
2. 字符串：转换后还是原来的值
3. 布尔值：true转为字符串'true'，false转化为字符串'false'
4. undefin: 转化字符串'undefined'
5. null: 转化为字符串'null'
*/
console.log(String(123)); // 123
console.log(String("abc")); // abc
console.log(String(true)); // true
console.log(String(undefined)); // undefined
console.log(String(null)); // null

// 对象
// String方法的参数如果是对象，返回一个类型字符串；
// 如果是数组，返回该数组的字符串形式
console.log(String({ a: 1 })); // '[object Object]'
console.log(String([1, 2, 3])); // 1,2,3

/*
先调用对象自身的toString方法。如果返回原始类型的值，
则对该值使用String函数，不再进行以下步骤。

如果toString方法返回的是对象，再调用原对象的valueOf方法。
如果valueOf方法返回原始类型的值，则对该值使用String函数，不再进行以下步骤。

如果valueOf方法返回的是对象，就报错。
*/

Boolean();
/*
除了以下五个值的转换结果为false，其他的值全部为true。

undefined
null
0（包含-0和+0）
NaN
''（空字符串）
*/
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean("")); // false

// 所有对象的转换结果都是true,
// 甚至连false对应的布尔对象new Boolean(false)也是true
console.log(Boolean({})); // true
console.log(Boolean([])); // true
console.log(Boolean(new Boolean(false))); // true
