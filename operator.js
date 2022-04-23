console.log(true + true); // 2
console.log(1 + true); // 2
// 加法运算符会将布尔值转换为数值, true=1， false=0
console.log(true + false); // 0

console.log(1 + "a"); // 1a

// 对象相加-先转化成原始类型的值，然后在想加
var obj = { p: 1 };
console.log(obj + 2);
// 对象 obj 转成原始类型的值是 [object Object]
//自动调用对象的 valueOf 方法，然后调用对象的 toString() 方法，转成字符串
console.log(obj.valueOf()); // {p:1}
console.log(obj.valueOf().toString()); // [object Object]
// 可以自定义 valueOf 或者 toString() 方法

var obj1 = {
  valueOf: function () {
    return 1;
  },
};
console.log(obj1 + 2); // 3

var obj2 = {
  toString: function () {
    return "hello";
  },
};
console.log(obj2 + 2); // hello2

var obj3 = new Date(); // Date 对象会优先执行 toString 方法
obj3.valueOf = function () {
  return 1;
};
obj3.toString = function () {
  return "hello";
};
console.log(obj3 + 2); // hello2

// 余数运算符的正负号取决于第一个数的正负值
console.log(1 % -2); // 1
console.log(-1 % 2); // -1

// 自增自减运算符 若符号在前，则先返回值再运算否则先运算再返回值
var x = 1;
var y = 1;
console.log(x++); // 1
console.log(++y); // 2

// 指数运算符是右结合
// 2 ** 3 ** 2 == 2 ** (3 ** 2);

// 非相等运算符：如果两个运算子都是原始类型的值，则是先转成数值再比较。
// 任何值（包括NaN本身）与NaN使用非相等运算符进行比较，返回的都是false。
console.log(5 > "4"); // true
// 等同于 5 > Number('4');

console.log(true > false); // true
// 等同于 Number(true) > Number(false)

console.log(NaN > NaN); // false
console.log(NaN < NaN); // false

// 非相等运算符：如果运算子是对象，会转为原始类型的值，再进行比较。
var x = [2];
console.log(x > "11"); // true
// 等同于 [2].valueOf().toString() > '11'
// 即 '2' > '11'

x.valueOf = function () {
  return "1";
};
console.log(x > "11"); // false
// 等同于 [2].valueOf().toString() > '11'
// 即 '1' > '11'

// (==) 比较两个值是否相等， (===)比较两个值是否是'同一个值'
// 如果两个值不是同一类型，严格相等运算符（===）直接返回false，
//而相等运算符（==）会将它们转换成同一个类型，再用严格相等运算符进行比较。

console.log(1 === "1"); // false
console.log(true === "true"); // false

// 同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回true，
// 值不同就返回false。
console.log(1 === 0x1); // true
// NaN与任何值都不相等（包括自身）
console.log(NaN === NaN); // false
// 正0等于负0
console.log(+0 === -0); // true

// 两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，
// 而是比较它们是否指向同一个地址。
console.log({} === {}); // false
console.log([] === []); // false
console.log(function () {} === function () {}); // false

var v1 = {};
var v2 = v1;
console.log(v1 === v2); // true
// 对于两个对象的比较，严格相等运算符比较的是地址，而大于或小于运算符比较的是值。
var obj1 = {};
var obj2 = {};

console.log(obj1 > obj2); // false
console.log(obj1 < obj2); // false
console.log(obj1 === obj2); // false

// undefined和null与自身严格相等。
console.log(undefined === undefined); // true
console.log(null === null); // true

// 由于变量声明后默认值是undefined，因此两个只声明未赋值的变量是相等的。
var x1, x2;
console.log(x1 === x2); // true

// 严格相等运算符有一个对应的“严格不相等运算符”（!==），
// 它的算法就是先求严格相等运算符的结果，然后返回相反值。
console.log(1 !== "1"); // true
console.log(!(1 === "1")); // true

// 相等运算符用来比较相同类型的数据时，与严格相等运算符完全一样
console.log(1 == 1.0); // true

// 比较不同类型的数据时，相等运算符会先将数据进行类型转换，然后再用严格相等运算符比较。
// 1. 原始类型的值会转换成数值再进行比较。
console.log(1 == true); // true
// 等同于 1 === Number(true)
console.log(0 == false); // true
// 等同于 0 === Number(false)
console.log("\n  123  \t" == 123); // true
// 因为字符串转为数字时，省略前置和后置的空格

// 2. 对象与原始类型值比较, 对象转换成原始类型的值，再进行比较
// 具体来说，先调用对象的valueOf()方法，如果得到原始类型的值，就按照上一小节的规则，互相比较；
// 如果得到的还是对象，则再调用toString()方法，得到字符串形式，再进行比较
console.log([1] == 1); // true
console.log([1] == "1"); // true
console.log([1, 2] == "1,2"); // true
console.log([1, 2].valueOf().toString());
console.log([1] == true); // true
console.log([2] == true); // false
console.log([2].valueOf().toString());
console.log(Number([2].valueOf().toString()));
console.log(Number(true));

const obj12 = {
  valueOf: function () {
    console.log("执行 valueOf()");
    return obj12;
  },
  toString: function () {
    console.log("执行 toString()");
    return "foo";
  },
};

console.log(obj12 == "foo"); // true

// undefined和null只有与自身比较，或者互相比较时，才会返回true；
// 与其他类型的值比较时，结果都为false。
undefined == undefined; // true
null == null; // true
undefined == null; // true

false == null; // false
false == undefined; // false

0 == null; // false
0 == undefined; // false

console.log(Number(""));
console.log(0 == "");
console.log(Number(true));
console.log(Number("false"));

// 对于非布尔值，取反运算符会将其转为布尔值。
// 可以这样记忆，以下六个值取反后为true，其他值都为false
/* 
undefined
null
false
0
NaN
空字符串（''）
*/

// 对一个值连续做两次取反运算，等于将其转为对应的布尔值，
// 与Boolean函数的作用相同。这是一种常用的类型转换的写法
// 两次取反就是将一个值转为布尔值的简便写法
/*
!!x
等同于 Boolean(x);
*/

// &&
// 如果第一个运算子的布尔值为true，则返回第二个运算子的值（注意是值，不是布尔值）；
// 如果第一个运算子的布尔值为false，则直接返回第一个运算子的值，且不再对第二个运算子求值。
console.log("t" && ""); // ''
console.log("'t" && "f"); // f
console.log("'t" && 1 + 2); // 3
console.log("" && "f"); // ''
console.log("" && ""); // ""

var x = 1;
console.log(1 - 1 && (x += 1)); // 0
console.log(x); // 1

/*
if (i) {
  doSomething();
}
// 等价于
i && doSomething();
*/

// 且运算符可以多个连用，这时返回第一个布尔值为false的表达式的值。
// 如果所有表达式的布尔值都为true，则返回最后一个表达式的值。
console.log(true && "foo" && "" && 4 && "foo" && true); // ''
console.log(1 && 2 && 3); // 3

// ||
// 如果第一个运算子的布尔值为true，则返回第一个运算子的值，且不再对第二个运算子求值；
// 如果第一个运算子的布尔值为false，则返回第二个运算子的值。
console.log("t" || ""); // t
console.log("t" || "f"); // t
console.log("" || "f"); // f
console.log("" || ""); // ''
console.log(" " || "a"); // " "

var x = 1;
console.log(true || (x = 2)); // true
console.log(x); // 1

// 或运算符可以多个连用，这时返回第一个布尔值为true的表达式的值。
// 如果所有表达式都为false，则返回最后一个表达式的值。
console.log(false || 0 || "" || 4 || "foo" || true); // 4
console.log(false || 0 || ""); // ''

// 或运算符常用于为一个变量设置默认值.
function saveText(text) {
  text = text || "default";
  console.log(text);
}
saveText(); // default
saveText("this"); // this

// saveText(this.text || "");

// 如果第一个表达式的布尔值为true，
// 则返回第二个表达式的值，否则返回第三个表达式的值。
console.log("t" ? "hello" : "world"); // "hello"
console.log(0 ? "hello" : "world"); // "world"
