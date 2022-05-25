// 2. 启用方法
// "use strict";
// 2.1  整个脚本文件
// use strict放在脚本文件的第一行，整个脚本都将以严格模式运行。如果这行语句不在第一行就无效，整个脚本会以正常模式运行
// {
/* <script>'use strict'; console.log('这是严格模式');</script>;

<script>console.log('这是正常模式');</script>; */
// }
// 如果use strict写成下面这样，则不起作用，严格模式必须从代码一开始就生效。
// {
/* <script>console.log('这是正常模式'); 'use strict';</script>; */
// }

// 2.2 单个函数
// use strict放在函数体的第一行，则整个函数以严格模式运行
// function strict() {
//   "use strict";
//   return "这是严格模式";
// }

// function strict2() {
//   "use strict";
//   function f() {
//     return "这也是严格模式";
//   }
//   return f();
// }
// function notStrict() {
//   return "这是正常模式";
// }

// 有时，需要把不同的脚本合并在一个文件里面。如果一个脚本是严格模式，另一个脚本不是，它们的合并就可能出错。
// 严格模式的脚本在前，则合并后的脚本都是严格模式；如果正常模式的脚本在前，则合并后的脚本都是正常模式。
// 这两种情况下，合并后的结果都是不正确的。这时可以考虑把整个脚本文件放在一个立即执行的匿名函数之中。
// (function () {
//   "use strict";
//   // some code here
// })();

// 3. 显式报错
// 3.1 只读属性不可写
// ("use strict");
// "abc".length = 5;
// TypeError: Cannot assign to read only property 'length' of string 'abc'

// 严格模式下，对只读属性赋值，或者删除不可配置（non-configurable）属性都会报错。

// 对只读属性赋值会报错
// ("use strict");
// Object.defineProperty({}, "a", {
//   value: 37,
//   writable: false,
// });
// obj.a = 123;
// TypeError: Cannot assign to read only property 'a' of object #<Object>

// 删除不可配置的属性会报错
// ("use strict");
// var obj = Object.defineProperty({}, "p", {
//   value: 1,
//   configurable: false,
// });
// delete obj.p;
// TypeError: Cannot delete property 'p' of #<Object>

// 3.2 只设置了取值器的属性不可写
// 严格模式下，对一个只有取值器（getter）、没有存值器（setter）的属性赋值，会报错
// ("use strict");
// var obj = {
//   get v() {
//     return 1;
//   },
// };
// obj.v = 2;
// TypeError: Cannot set property v of #<Object> which has only a getter
// 上面代码中，obj.v只有取值器，没有存值器，对它进行赋值就会报错

// 3.3 禁止扩展的对象不可扩展
// 严格模式下，对禁止扩展的对象添加新属性，会报错
// ("use strict");
// var obj = {};
// Object.preventExtensions(obj);
// obj.v = 1;
// TypeError: Cannot add property v, object is not extensible

// 3.4 eval、arguments 不可用作标识名
// ("use strict");
// var eval = 17;
// var arguments = 17;
// var obj = { set p(arguments) {} };
// try {
// } catch (arguments) {}
// function x(eval) {}
// function arguments() {}
// var y = function eval() {};
// var f = new Function("arguments", "'use strict'; return 17;");
// SyntaxError: Unexpected eval or arguments in strict mode

// 3.5 函数不能有重名的参数
// 正常模式下，如果函数有多个重名的参数，可以用arguments[i]读取。严格模式下，这属于语法错误
// function f(a, a, b) {
//   "use strict";
//   return a + b;
// }
// SyntaxError: Duplicate parameter name not allowed in this context

// 3.6 禁止八进制的前缀0表示法
// 正常模式下，整数的第一位如果是0，表示这是八进制数，比如0100等于十进制的64。
// 严格模式禁止这种表示法，整数第一位为0，将报错。
// ("use strict");
// var n = 0100;
// SyntaxError: Octal literals are not allowed in strict mode.

// 4. 增强的安全措施
// 严格模式增强了安全保护，从语法上防止了一些不小心会出现的错误
// 4.1 全局变量显式声明
// 正常模式中，如果一个变量没有声明就赋值，默认是全局变量。
// 严格模式禁止这种用法，全局变量必须显式声明。
// ("use strict");
// v = 1; // 报错，v未声明
// for (i = 0; i < 2; i++) {
//   // 报错，i 未声明
// }
// function f() {
//   x = 123;
// }
// f(); // 报错，未声明就创建一个全局变量
// 因此，严格模式下，变量都必须先声明，然后再使用

// 4.2 禁止 this 关键字指向全局对象
// 正常模式
// function f() {
//   console.log(this === window);
// }
// f(); // true
// 严格模式
// function f() {
//   "use strict";
//   console.log(this === undefined);
// }
// f(); // true
// 上面代码中，严格模式的函数体内部this是undefined。
// 正常模式
/*
function fun() {
  return this;
}

fun(); // window
fun.call(2); // Number {2}
fun.call(true); // Boolean {true}
fun.call(null); // window
fun.call(undefined); // window
*/
// 严格模式
/*
("use strict");
function fun() {
  return this;
}

fun(); //undefined
fun.call(2); // 2
fun.call(true); // true
fun.call(null); // null
fun.call(undefined); // undefined
*/
// 4.3 禁止使用 fn.callee、fn.caller
// 函数内部不得使用fn.caller、fn.arguments，否则会报错。
// 这意味着不能在函数内部得到调用栈了。
// function f1() {
//   "use strict";
//   f1.caller; // 报错
//   f1.arguments; // 报错
// }

// f1();

// 4.4 禁止使用 arguments.callee、arguments.caller
// arguments.callee和arguments.caller是两个历史遗留的变量，从来没有标准化过，现在已经取消了。正常模式下调用它们没有什么作用，但是不会报错。
// 严格模式明确规定，函数内部使用arguments.callee、arguments.caller将会报错

// 4.5 禁止删除变量
// 严格模式下无法删除变量，如果使用delete命令删除一个变量，会报错。
// 只有对象的属性，且属性的描述对象的configurable属性设置为true，才能被delete命令删除
("use strict");
var x;
delete x; // 语法错误

var obj = Object.create(null, {
  x: {
    value: 1,
    configurable: true,
  },
});
delete obj.x; // 删除成功

// 5. 静态绑定
// JavaScript 语言的一个特点，就是允许“动态绑定”，
// 即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时（runtime）确定的

// 严格模式对动态绑定做了一些限制。某些情况下，只允许静态绑定。
// 也就是说，属性和方法到底归属哪个对象，必须在编译阶段就确定。
// 这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外。

// 5.1 禁止使用 with 语句
// 严格模式下，使用with语句将报错。因为with语句无法在编译时就确定，
// 某个属性到底归属哪个对象，从而影响了编译效果
// ("use strict");
// var v = 1;
// var obj = {};
// with (obj) {
//   v = 2;
// }

// 5.2 创设 eval 作用域
// 正常模式下，JavaScript 语言有两种变量作用域（scope）：全局作用域和函数作用域。
// 严格模式创设了第三种作用域：eval作用域

// 正常模式下，eval语句的作用域，取决于它处于全局作用域，还是函数作用域。
// 严格模式下，eval语句本身就是一个作用域，不再能够在其所运行的作用域创设新的变量了，
// 也就是说，eval所生成的变量只能用于eval内部
(function () {
  "use strict";
  var x = 2;
  console.log(eval("var x = 5; x")); // 5
  console.log(x); // 2
})();
// 上面代码中，由于eval语句内部是一个独立作用域，所以内部的变量x不会泄露到外部。

// 注意，如果希望eval语句也使用严格模式，有两种方式
// 方式一
function f1(str) {
  "use strict";
  return eval(str);
}
// f1("undeclared_variable = 1"); // 报错

// 方式二
function f2(str) {
  return eval(str);
}
// f2('"use strict";undeclared_variable = 1'); // 报错

// 5.3 arguments 不再追踪参数的变化
// 变量arguments代表函数的参数。严格模式下，函数内部改变参数与arguments的联系被切断了，
// 两者不再存在联动关系。
function f(a) {
  a = 2;
  return [a, arguments[0]];
}
f(1); // 正常模式为[2, 2]

function f(a) {
  "use strict";
  a = 2;
  return [a, arguments[0]];
}
f(1); // 严格模式为[2, 1]
// 上面代码中，改变函数的参数，不会反应到arguments对象上来。

// 6. 向下一个版本的 JavaScript 过渡
// 6.1 非函数代码块不得声明函数
// ES6 会引入块级作用域。为了与新版本接轨，E
// S5 的严格模式只允许在全局作用域或函数作用域声明函数。
// 也就是说，不允许在非函数的代码块内声明函数
("use strict");
if (true) {
  function f1() {} // 语法错误
}

for (var i = 0; i < 5; i++) {
  function f2() {} // 语法错误
}

// 6.2 保留字
// implements、interface、let、package、private、protected、public、static、yield等
