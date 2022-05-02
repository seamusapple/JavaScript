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

var a = [1, 2, 3, 4];
console.log(a.join(" ")); // '1 2 3 4'
console.log(a.join(" | ")); // "1 | 2 | 3 | 4"
console.log(a.join()); // "1,2,3,4"
// 如果数组成员是undefined或null或空位，会被转成空字符串
console.log([undefined, null].join("#")); //' #
console.log(["a", , "b"].join("-")); // a--b
console.log(Array.prototype.join.call("hello", "-")); // 'h-e-l-l-o'
var obj = { 0: "a", 1: "b", length: 2 };
console.log(Array.prototype.join.call(obj, "-"));

// concat方法用于多个数组的合并。
// 它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变
console.log(["hello"].concat(["world"])); // ['hello', 'world']
console.log(["hello"].concat(["world"], ["!"])); // ['hello', 'world', '!']
console.log([].concat({ a: 1 }, { b: 2 })); // [{a: 1}, {b: 2}]

// 除了数组作为参数，concat也接受其他类型的值作为参数，添加到目标数组尾部
console.log([1, 2, 3].concat(4, 5, 6)); // [1, 2, 3, 4, 5, 6]

// 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝。
// 所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。
var obj = { a: 1 };
var oldArray = [obj];
var newArray = oldArray.concat();
obj.a = 2;
console.log(newArray[0].a); // 2

// reverse方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。
var a = ["a", "b", "c"];
a.reverse();
console.log(a); // [c, b, a]

// slice()方法用于提取目标数组的一部分，返回一个新数组，原数组不变。
// 它的第一个参数为起始位置（从0开始，会包括在返回的新数组之中），
// 第二个参数为终止位置（但该位置的元素本身不包括在内）。
// 如果省略第二个参数，则一直返回到原数组的最后一个成员。
var a = ["a", "b", "c", "d"];
console.log(a.slice(0)); // ['a', 'b', 'c'];
console.log(a.slice(1)); // ['b', 'c']
console.log(a.slice(1, 2)); // ['b']
console.log(a.slice(2, 6)); // ['c']
console.log(a.slice()); // ['a', 'b', 'c']

// 如果slice()方法的参数是负数，则表示倒数计算的位置。
var a = ["a", "b", "c"];
console.log(a.slice(-2)); // ['b', 'c']
console.log(a.slice(-2, -1)); // ['b']

// 如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组。
console.log(a.slice(4)); // []
console.log(a.slice(2, 1)); // []

// slice()方法的一个重要应用，是将类似数组的对象转为真正的数组
console.log(Array.prototype.slice.call({ 0: "a", 1: "b", length: 2 })); // ['a', 'b']

// splice()方法用于删除原数组的一部分成员，
// 并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
var a = ["a", "b", "c", "d", "e", "f"];
console.log(a.splice(4, 2)); // ['e', 'f']
console.log(a); // ['a', 'b', 'c', 'd']
// 起始位置如果是负数，就表示从倒数位置开始删除。
var a = ["a", "b", "c", "d", "e", "f"];
console.log(a.splice(-4, 2)); // ["c", "d"];
// 如果只是单纯地插入元素，splice方法的第二个参数可以设为0
var a = [1, 1, 1];
console.log(a.splice(1, 0, 2)); // []
console.log(a); // [1, 2, 1, 1]

// 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组
var a = [1, 2, 3, 4];
console.log(a.splice(2)); // [3, 4]
console.log(a); // [1, 2]

// sort方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。
console.log(["d", "c", "b", "a"].sort()); // ['a', 'b', 'c', 'd']
console.log([4, 3, 2, 1].sort()); // [1, 2, 3, 4]
console.log([11, 101].sort());
console.log([10111, 1101, 111].sort()); // [10111, 1101, 111]
// sort()方法不是按照大小排序，而是按照字典顺序。
// 也就是说，数值会被先转成字符串，再按照字典顺序进行比较，所以101排在11的前面。
console.log(
  [10111, 1101, 111].sort(function (a, b) {
    return a - b;
  })
); // [111, 1101, 10111]
// 如果该函数的返回值大于0，表示第一个成员排在第二个成员后面；
// 其他情况下，都是第一个元素排在第二个元素前面。
console.log(
  [
    { name: "张三", age: 30 },
    { name: "李四", age: 24 },
    { name: "王五", age: 28 },
  ].sort(function (o1, o2) {
    return o1.age - o2.age;
  })
);
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
