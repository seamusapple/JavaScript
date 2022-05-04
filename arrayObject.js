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

// map()方法将数组的所有成员依次传入参数函数， 然后把每一次的执行结果组成一个新数组返回。
var numbers = [1, 2, 3];
numbers.map(function (n) {
  return n + 1;
}); // [2, 3, 4]
console.log(numbers); // [1, 2, 3]

// map()方法接受一个函数作为参数。
// 该函数调用时，map()方法向它传入三个参数：当前成员、当前位置和数组本身
[1, 2, 3].map(function (elem, index, arr) {
  return elem * index;
}); // [0, 2, 6];

// map()方法还可以接受第二个参数，用来绑定回调函数内部的this变量
var arr = ["a", "b", "c"];
console.log(
  [1, 2].map(function (e) {
    return this[e];
  }, arr)
); // ['b', 'c']
// 上面代码通过map()方法的第二个参数，将回调函数内部的this对象，指向arr数组。

// 如果数组有空位，map()方法的回调函数在这个位置不会执行，会跳过数组的空位。
var f = function (n) {
  return "a";
};
console.log([1, undefined, 2].map(f)); // ['a', 'a', 'a'];
console.log([1, null, 2].map(f)); // ['a', 'a', 'a'];
console.log([1, , 2].map(f)); // ["a", "a"];
// 上面代码中，map()方法不会跳过undefined和null，但是会跳过空位

// forEach()方法与map()方法很相似，也是对数组的所有成员依次执行参数函数
// 但是，forEach()方法不返回值，只用来操作数据。
// 这就是说，如果数组遍历的目的是为了得到返回值，那么使用map()方法，否则使用forEach()方法。

// forEach()的用法与map()方法一致，参数是一个函数，
// 该函数同样接受三个参数：当前值、当前位置、整个数组。
function log(element, index, array) {
  console.log("[" + index + "] = " + element);
}
[2, 5, 9].forEach(log);

// forEach()方法也可以接受第二个参数，绑定参数函数的this变量
var out = [];
[1, 2, 3].forEach(function (elem) {
  this.push(elem * elem);
}, out);
console.log(out);
// 上面代码中，空数组out是forEach()方法的第二个参数，结果，回调函数内部的this关键字就指向out。

// 注意，forEach()方法无法中断执行，总是会将所有成员遍历完。
// 如果希望符合某种条件时，就中断遍历，要使用for循环
var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  if (arr[i] === 2) break;
  console.log(arr[i]);
} // 1

// forEach()方法也会跳过数组的空位
var log = function (n) {
  console.log(n + 1);
};
[1, undefined, 2].forEach(log);
// 2
// NaN
// 3

[1, null, 2].forEach(log);
// 2
// 1
// 3

[1, , 2].forEach(log);
// 2
// 3
// 上面代码中，forEach()方法不会跳过undefined和null，但会跳过空位

// filter()方法用于过滤数组成员，满足条件的成员组成一个新数组返回
// 它的参数是一个函数，所有数组成员依次执行该函数，
// 返回结果为true的成员组成一个新数组返回。该方法不会改变原数组
console.log(
  [1, 2, 3, 4, 5].filter(function (elem) {
    return elem > 3;
  })
);
// [4, 5]
// filter()方法的参数函数可以接受三个参数：当前成员，当前位置和整个数组
console.log(
  [1, 2, 3, 4, 5].filter(function (elem, index, arr) {
    return index % 2 === 0;
  })
);
// [1, 3, 5]
// filter()方法还可以接受第二个参数，用来绑定参数函数内部的this变量。
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};
var arr = [2, 8, 3, 4, 1, 3, 2, 9];
console.log(arr.filter(myFilter, obj)); // [8, 4, 9]

// some()，every()
// 这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。
// 它们接受一个函数作为参数，所有数组成员依次执行该函数。
// 该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值

// some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。
var arr = [1, 2, 3, 4, 5];
console.log(
  arr.some(function (elem, index, arr) {
    return elem >= 3;
  })
); // true

// every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false。
var arr = [1, 2, 3, 4, 5];
console.log(
  arr.every(function (elem, index, arr) {
    return elem >= 3;
  })
); // false

// 注意，对于空数组，some方法返回false，every方法返回true，回调函数都不会执行。
function isEven(x) {
  return x % 2 === 0;
}
[].some(isEven); // false
[].every(isEven); // true

// some和every方法还可以接受第二个参数，用来绑定参数函数内部的this变量

// reduce()，reduceRight()
// reduce()方法和reduceRight()方法依次处理数组的每个成员，最终累计为一个值。
// 它们的差别是，reduce()是从左到右处理（从第一个成员到最后一个成员），
// reduceRight()则是从右到左（从最后一个成员到第一个成员），其他完全一样。
console.log(
  [1, 2, 3, 4, 5].reduce(function (a, b) {
    console.log(a, b);
    return a + b;
  })
);
// 如果数组有 n 个成员，这个参数函数就会执行 n - 1 次。

/*
reduce()方法和reduceRight()方法的第一个参数都是一个函数。该函数接受以下四个参数。

累积变量。第一次执行时，默认为数组的第一个成员；以后每次执行时，都是上一轮的返回值。
当前变量。第一次执行时，默认为数组的第二个成员；以后每次执行时，都是下一个成员。
当前位置。一个整数，表示第二个参数（当前变量）的位置，默认为1。
原数组。

这四个参数之中，只有前两个是必须的，后两个则是可选的。
*/
// 如果要对累积变量指定初值，可以把它放在reduce()方法和reduceRight()方法的第二个参数。
console.log(
  [1, 2, 3, 4, 5].reduce(function (a, b) {
    return a + b;
  }, 10)
);
// 25
// 注意，这时b是从数组的第一个成员开始遍历，参数函数会执行5次

function add(prev, cur) {
  return prev + cur;
}
// console.log([].reduce(add));
// TypeError: Reduce of empty array with no initial value
console.log([].reduce(add, 1));
// 建议总是加上第二个参数，这样比较符合直觉，
// 每个数组成员都会依次执行reduce()方法的参数函数。另外，第二个参数可以防止空数组报错。

function subtract(prev, cur) {
  return prev - cur;
}
console.log([3, 2, 1].reduce(subtract)); // 0
console.log([3, 2, 1].reduceRight(subtract)); // -4

function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length > longest.length ? entry : longest;
  }, "");
}
console.log(findLongest(["aaa", "bb", "c"])); // aaa

// indexOf()，lastIndexOf()
// indexOf方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。
var a = ["a", "b", "c"];

console.log(a.indexOf("b")); // 1
console.log(a.indexOf("y")); // -1

// indexOf方法还可以接受第二个参数，表示搜索的开始位置。
console.log(["a", "b", "c"].indexOf("a", 1)); // -1

// lastIndexOf方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1
var a = [2, 5, 9, 2];
console.log(a.lastIndexOf(2)); //3
console.log(a.lastIndexOf(7)); //-1

// 注意，这两个方法不能用来搜索NaN的位置，即它们无法确定数组成员是否包含NaN。
console.log([NaN].indexOf(NaN)); // -1
console.log([NaN].lastIndexOf(NaN)); // -1
// 这是因为这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值

var users = [
  { name: "tom", email: "tom@example.com" },
  { name: "peter", email: "peter@example.com" },
];
console.log(users);
console.log(
  users
    .map(function (user) {
      return user.email;
    })
    .filter(function (email) {
      return /^t/.test(email);
    })
    .forEach(function (email) {
      console.log(email);
    })
);
