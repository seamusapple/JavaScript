// 1.1 函数的声明
function print(s) {
  console.log("print: " + s);
}

var print2 = function (s) {
  console.log("print2: " + s);
};

var print3 = function x(s) {
  // x can only be accessed in this function, and refer to function self.
  console.log("print3: " + typeof x + s);
};

var f = function f(x) {};

/* This two functions are equal */
var add = new Function("x", "y", "return x + y");
function add(x, y) {
  return x + y;
}
/* This two functions are equal */

print("print");
print2("print");
print3("print");

// 1.2 函数的重复声明
function z() {
  console.log(1);
}

z(); // 2

function z() {
  console.log(2);
}

z(); // 2

function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

console.log(fib(6));

// 1.4 一等公民
// 将函数赋值给一个变量
var operator = add;
// 将函数作为参数和返回值
function a(op) {
  return op;
}
console.log(a(add)(1, 1));

// 2.1 name 属性-函数名字，若是函数表达式，且是具名的，则返回函数表达式的名称。
function f1() {}
console.log(f1.name);
var f2 = function () {};
console.log(f2.name);
var f3 = function functionName() {};
console.log(f3.name);

// 2.2 length 属性-函数定义时参数的个数
function f10(a, b) {}
console.log(f10.length);

// 2.3 toString()-返回函数源码的字符串
function f11() {
  a();
  b();
  c();
}
console.log(f11.toString());

var multiline = function (fn) {
  var arr = fn.toString().split("\n");
  return arr.slice(2, arr.length - 2).join("\n");
};

function f13() {
  /*
  这是一个
  多行注释
*/
}

console.log(multiline(f13));

// 3.1 函数作用域-对于var命令来说，局部变量只能在函数内部声明，在其他区块中声明，一律都是全局变量。
var v = 1;
function f15() {
  var w = 3;
  var v = 2;
  console.log(v); // 2
}
f15();
console.log(v); // 1
console.log(typeof w); // undefined

var v = 1;
function f15() {
  var w = 3;
  console.log(v); // 1
  var v = 2; // 变量声明提升至函数内部顶部，但赋值并未提升
}

// 3.2 函数本身的作用域-函数本身的作用域与变量一样，就是其声明时所在的作用域，与运行时所在作用域无关。
var a12 = 1;
var x12 = function () {
  console.log(a12);
};

function f16() {
  var a12 = 2;
  x12();
}

f16();

// 函数体内部声明的函数，作用域绑定函数体内部。
function foo() {
  var x20 = 1;
  function bar() {
    console.log(x20);
  }
  return bar;
}
var x20 = 2;
var f = foo();
f();
