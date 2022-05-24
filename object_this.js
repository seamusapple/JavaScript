// this就是属性或方法“当前”所在的对象。
// 由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的
var A = {
  name: "zhangsan",
  describe: function () {
    return "xingming: " + this.name;
  },
};
var B = {
  name: "lisi",
};
B.describe = A.describe;
console.log(B.describe()); // xingming: lisi

function f() {
  return "xingming: " + this.name;
}
var A1 = {
  name: "zhangsan",
  describe: f,
};
var B1 = {
  name: "lisi",
  describe: f,
};
console.log(A1.describe()); // xingming: zhangsan
console.log(B1.describe()); // xingming: lisi
// 只要函数被赋给另一个变量，this的指向就会变

// 全局环境
// 不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window
// console.log(this === window); // true
// function f() {
//   console.log(this === window);
// }
// f(); // true

// 构造函数
// 构造函数中的this，指的是实例对象
var Obj = function (p) {
  this.p = p;
};
var o = new Obj("Hello World!");
console.log(o.p); // Hello World!

// 对象的方法
// 如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向。
var obj = {
  foo: function () {
    console.log(this);
  },
};
obj.foo(); // { foo: [Function: foo] }

// // 情况一
// (obj.foo = obj.foo)() // window
// // 情况二
// (false || obj.foo)() // window
// // 情况三
// (1, obj.foo)() // window

// 如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层
var a = {
  p: "Hello",
  b: {
    m: function () {
      console.log(this.p);
    },
  },
};
a.b.m(); // undefined
// 上面代码中，a.b.m方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b，因为实际执行的是下面的代码
var b = {
  m: function () {
    console.log(this.p);
  },
};
var a = {
  p: "Hello",
  b: b,
};
a.b.m(); // 等同于b.m()
// 如果要达到预期效果，只有写成下面这样
var a = {
  b: {
    m: function () {
      console.log(this.p);
    },
    p: "Hello",
  },
};
// 如果这时将嵌套对象内部的方法赋值给一个变量，this依然会指向全局对象
var a = {
  b: {
    m: function () {
      console.log(this.p);
    },
    p: "Hello",
  },
};
var hello = a.b.m;
hello(); // undefined
// 上面代码中，m是多层对象内部的一个方法。为求简便，将其赋值给hello变量，
// 结果调用时，this指向了顶层对象。为了避免这个问题，可以只将m所在的对象赋值给hello，这样调用时，this的指向就不会变
var hello = a.b;
hello.m(); // Hello

// 使用注意点
// 1. 避免多层this
// 一个解决方法是在第二层改用一个指向外层this的变量
var o = {
  f1: function () {
    console.log(this);
    var that = this;
    var f2 = function () {
      console.log(that);
    };
  },
};
o.f1(); // { f1: [Function: f1] }
// JavaScript 提供了严格模式，也可以硬性避免这种问题。严格模式下，如果函数内部的this指向顶层对象，就会报错
// var counter = {
//   count: 0,
// };
// counter.inc = function () {
//   "use strict";
//   this.count++;
// };
// var f = counter.inc;
// f(); // TypeError: Cannot read property 'count' of undefined
// // 上面代码中，inc方法通过'use strict'声明采用严格模式，这时内部的this一旦指向顶层对象，就会报错

// 2. 避免数组处理方法中的 this
// 数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this。
var o = {
  v: "hello",
  p: ["a1", "a2"],
  f: function () {
    this.p.forEach(function (item) {
      console.log(this.v + " " + item);
    });
  },
};
o.f();
// undefined a1
// undefined a2
// 上面代码中，foreach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值。
// 原因跟上一段的多层this是一样的，就是内层的this不指向外部，而指向顶层对象。

// 解决这个问题的一种方法，就是前面提到的，使用中间变量固定this
var o = {
  v: "hello",
  p: ["a1", "a2"],
  f: function () {
    var that = this;
    this.p.forEach(function (item) {
      console.log(that.v + " " + item);
    });
  },
};
o.f();
// hello a1
// hello a2

// 另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境
var o = {
  v: "hello",
  p: ["a1", "a2"],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + " " + item);
    }, this);
  },
};
o.f();
// hello a1
// hello a2

// 避免回调函数中的 this
// 回调函数中的this往往会改变指向，最好避免使用。
var o = new Object();
o.f = function () {
  console.log(this === o);
};
// jQuery 的写法
// $("#button").on("click", o.f);
// 上面代码中，点击按钮以后，控制台会显示false。
// 原因是此时this不再指向o对象，而是指向按钮的 DOM 对象，因为f方法是在按钮对象的环境中被调用的。
// 这种细微的差别，很容易在编程中忽视，导致难以察觉的错误。
// 为了解决这个问题，可以采用下面的一些方法对this进行绑定，也就是使得this固定指向某个对象，减少不确定性

// 绑定 this 的方法
// JavaScript 提供了call、apply、bind这三个方法，来切换/固定this的指向。
// 1. Function.prototype.call()
// 函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数
var obj = {};
var f = function () {
  return this;
};
// f() === window; // false
console.log(f());
console.log(f.call(obj) === obj);

// call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象
var n1 = 123;
var obj = { n1: 456 };

function a1() {
  console.log(this.n1);
}
a1.call(); // 123
a1.call(null); // 123
a1.call(undefined); // 123
a1.call(obj); // 456

// 如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法
var f2 = function () {
  return this;
};
console.log(f2.call(5)); // [Number: 5]
// 上面代码中，call的参数为5，不是对象，会被自动转成包装对象（Number的实例），绑定f内部的this

// call方法还可以接受多个参数。
// call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。
function add(a, b) {
  return a + b;
}
console.log(add.call(this, 1, 2));

// call方法的一个应用是调用对象的原生方法
var obj = {};
console.log(obj.hasOwnProperty("toString")); // false
// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
console.log(obj.hasOwnProperty("toString")); // true
console.log(Object.prototype.hasOwnProperty.call(obj, "toString")); // false
// 上面代码中，hasOwnProperty是obj对象继承的方法，如果这个方法一旦被覆盖，就不会得到正确结果。call方法可以解决这个问题，
// 它将hasOwnProperty方法的原始定义放到obj对象上执行，这样无论obj上有没有同名方法，都不会影响结果

// 2. Function.prototype.apply()
// apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。
// 唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。
// func.apply(thisValue, [arg1, arg2, ...])
// apply方法的第一个参数也是this所要指向的那个对象，如果设为null或undefined，则等同于指定全局对象。
// 第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。
// 原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加。
function f(x, y) {
  console.log(x + y);
}
f.call(null, 1, 1); // 2
f.apply(null, [1, 1]); // 2
// 2.1 找出数组最大元素
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a); // 15

// 2.2 将数组的空元素变为undefined
console.log(Array.apply(null, ["a", , "b"])); // [ 'a', undefined, 'b' ]
// 空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined。
// 因此，遍历内部元素的时候，会得到不同的结果。
var a = ["a", , "b"];
function print(i) {
  console.log(i);
}
a.forEach(print);
// a
// b
Array.apply(null, a).forEach(print);
// a
// undefined
// b

// 2.3 转换类似数组的对象
// 利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组
console.log(Array.prototype.slice.apply({ 0: 1, length: 1 })); // [ 1 ]
console.log(Array.prototype.slice.apply({ 0: 1 })); // [];
console.log(Array.prototype.slice.apply({ 0: 1, length: 2 })); // [ 1, <1 empty item> ]
console.log(Array.prototype.slice.apply({ length: 1 })); // [ <1 empty item> ]
// 上面代码的apply方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。
// 从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键。

// 2.4 绑定回调函数的对象
var o = new Object();
o.f = function () {
  console.log(this === o);
};
var f = function () {
  o.f.apply(o);
  // 或者 o.f.call(o);
};
// jQuery 的写法
// $('#button').on('click', f); // true

// 3. Function.prototype.bind()
// bind()方法用于将函数体内的this绑定到某个对象，然后返回一个新函数
var d = new Date();
console.log(d.getTime()); // 1653374449213
var print = d.getTime;
// console.log(print()); // TypeError: this is not a Date object.
// 上面代码中，我们将d.getTime()方法赋给变量print，然后调用print()就报错了。
// 这是因为getTime()方法内部的this，绑定Date对象的实例，赋给变量print以后，内部的this已经不指向Date对象的实例了

// bind()方法可以解决这个问题
var print1 = d.getTime.bind(d);
console.log(print1()); // 1653374660737

var counter = {
  count: 0,
  inc: function () {
    this.count++;
  },
};

var func = counter.inc.bind(counter);
func();
console.log(counter.count); // 1

var obj = { count: 100 };
var func2 = counter.inc.bind(obj);
func2();
console.log(obj.count); // 101

// bind()还可以接受更多的参数，将这些参数绑定原函数的参数。
var add = function (x, y) {
  return x * this.m + y * this.n;
};
var obj = { m: 2, n: 2 };
var newAdd = add.bind(obj, 5);
console.log(newAdd(5)); // 20
// 上面代码中，bind()方法除了绑定this对象，还将add()函数的第一个参数x绑定成5，然后返回一个新函数newAdd()，
// 这个函数只要再接受一个参数y就能运行了
// 如果bind()方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）

// 5.1 每一次返回一个新函数
// bind()方法每运行一次，就返回一个新函数，这会产生一些问题。比如，监听事件的时候，不能写成下面这样
/* element.addEventListener('click', o.m.bind(o)); */
// 上面代码中，click事件绑定bind()方法生成的一个匿名函数。这样会导致无法取消绑定，所以下面的代码是无效的
/* element.removeEventListener('click', o.m.bind(o)); */
// 正确的方法是写成下面这样：
/* 
var listener = o.m.bind(o);
element.addEventListener("click", listener);
element.removeEventListener("click", listener);
*/

// 5.2 结合回调函数使用
var counter = {
  count: 0,
  inc: function () {
    "use strict";
    this.count++;
  },
};
function callIt(callback) {
  callback();
}
callIt(counter.inc.bind(counter));
console.log(counter.count); // 1
// 上面代码中，callIt()方法会调用回调函数。这时如果直接把counter.inc传入，
// 调用时counter.inc()内部的this就会指向全局对象。使用bind()方法将counter.inc绑定counter以后，
// 就不会有这个问题，this总是指向counter。

// 还有一种情况比较隐蔽，就是某些数组方法可以接受一个函数当作参数。这些函数内部的this指向，很可能也会出错
var obj = {
  name: "zhangsan",
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    });
  },
};
obj.print(); // 无输出

var obj2 = {
  name: "zhangsan",
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(
      function (n) {
        console.log(this.name);
      }.bind(this)
    );
  },
};
obj2.print();
// zhangsan
// zhangsan
// zhangsan

// 5.3 结合call()方法使用
// 利用bind()方法，可以改写一些 JavaScript 原生方法的使用形式，以数组的slice()方法为例。
[1, 2, 3].slice(0, 1); // [1]
// 等同于
Array.prototype.slice.call([1, 2, 3], 0, 1);
// 上面的代码中，数组的slice方法从[1, 2, 3]里面，按照指定的开始位置和结束位置，切分出另一个数组。
// 这样做的本质是在[1, 2, 3]上面调用Array.prototype.slice()方法，
// 因此可以用call方法表达这个过程，得到同样的结果

// call()方法实质上是调用Function.prototype.call()方法，因此上面的表达式可以用bind()方法改写
var slice = Function.prototype.call.bind(Array.prototype.slice);
console.log(slice([1, 2, 3], 0, 1)); //[ 1 ]
// 上面代码的含义就是，将Array.prototype.slice变成Function.prototype.call方法所在的对象，调用时就变成了Array.prototype.slice.call。
// 类似的写法还可以用于其他数组方法
var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);
var a = [1, 2, 3];
push(a, 4);
console.log(a); // [ 1, 2, 3, 4 ]
pop(a);
console.log(a); // [ 1, 2, 3 ]

// 如果再进一步，将Function.prototype.call方法绑定到Function.prototype.bind对象，就意味着bind的调用形式也可以被改写
// function f() {
//   console.log(this.v);
// }
// var o = { v: 123 };
// var bind = Function.prototype.call.bind(Function.prototype.bind);
// bind(f, o)(); // 123
