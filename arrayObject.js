var arr = new Array(2);
console.log(arr.length); // 2
console.log(arr); // [ <2 empty items> ]

// 无参数时，返回一个空数组
new Array(); // []
// 单个正整数参数，表示返回的新数组的长度
new Array(1); // 【 empty 】
new Array(2); // [ empty empty ]
// 非正整数的数值作为参数，会报错
// new Array(3.2); // RangeError: Invalid array length
// new Array(-3); // RangeError: Invalid array length

// 单个非数值（比如字符串、布尔值、对象等）作为参数，
// 则该参数是返回的新数组的成员
new Array("abc"); // ['abc']
new Array([1]); // [Array[1]]

// 多参数时，所有参数都是返回的新数组的成员
new Array(1, 2); // [1, 2]
new Array("a", "b", "c"); // ['a, 'b, 'c]
// 可以看到，Array()作为构造函数，行为很不一致。
// 因此，不建议使用它生成新数组，直接使用数组字面量是更好的做法。

// 如果参数是一个正整数，返回数组的成员都是空位。虽然读取的时候返回undefined，
//但实际上该位置没有任何值。虽然这时可以读取到length属性，但是取不到键名。
var a = new Array(3);
var b = [undefined, undefined, undefined];
console.log(a.length); // 3
console.log(b.length); // 3
console.log(a[0]); // undefined
console.log(b[0]); // undefined
console.log(0 in a); // false;
console.log(0 in b); // true;
// a的键名（成员的序号）都是空的，b的键名是有值的。

var arr = [1, 2, 3];
typeof arr; // Object
Array.isArray(arr); // true

var arr = [];
arr.push(1); // 1
arr.push("a"); // 2
arr.push(true, {}); // 4
console.log(arr);

var arr = ["a", "b", "c"];
arr.pop();
console.log(arr); // ['a', 'b']

[].pop(); // undefined

var a = ["a", "b", "c"];
console.log(a.shift()); // a
console.log(a); // ['b', 'c']

var list = [1, 2, 3, 4];
var item;
while ((item = list.shift())) {
  console.log(item);
}

// push和pop结合使用，就构成了“后进先出”的栈结构（stack）
// push()和shift()结合使用，就构成了“先进先出”的队列结构（queue）

// unshift()方法用于在数组的第一个位置添加元素，并返回添加新元素后的数组长度。
// 注意，该方法会改变原数组。
var a = ["a", "b", "c", "d", "e", "f"];
a.unshift("x");
console.log(a); // [x, a, b, c, d, e, f]

var a = ["c", "d"];
a.unshift("a", "b");
console.log(a); // [a, b, c, d]
