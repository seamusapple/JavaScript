// 1.2 prototype 属性的作用
// JavaScript 继承机制的设计思想就是，原型对象的所有属性和方法，都能被实例对象共享。
// 也就是说，如果属性和方法定义在原型上，那么所有实例对象就能共享，不仅节省了内存，还体现了实例对象之间的联系。
// JavaScript 规定，每个函数都有一个prototype属性，指向一个对象
function f() {}
console.log(typeof f.prototype); // object

// 对于普通函数来说，prototype属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型
function Animal(name) {
  this.name = name;
}
Animal.prototype.color = "white";
var cat1 = new Animal("大猫");
var cat2 = new Animal("二猫");
console.log(cat1.name); // 大猫
console.log(cat2.name); // 二猫
console.log(cat1.color); // white
console.log(cat2.color); // white
// 原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上
Animal.prototype.color = "yellow";
console.log(cat1.color); // yellow
console.log(cat2.color); // yellow

// 如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法
cat1.color = "black";
console.log(cat1.color); // black
console.log(cat2.color); // yellow
console.log(Animal.prototype.color); // yellow

// 总结一下，原型对象的作用，就是定义所有实例对象共享的属性和方法。
// 这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象
Animal.prototype.walk = function () {
  console.log(this.name + " is walking");
};
cat1.walk(); // 大猫 is walking
cat2.walk(); // 二猫 is walking

// 1.3 原型链
// 所有对象的原型最终都可以上溯到Object.prototype, Object.prototype的原型是null
// null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null
console.log(Object.getPrototypeOf(Object.prototype)); // null

// 读取对象的某个属性时，JavaScript 引擎先寻找对象本身的属性，如果找不到，就到它的原型去找，如果还是找不到，就到原型的原型去找。
// 如果直到最顶层的Object.prototype还是找不到，则返回undefined
// 如果对象自身和它的原型，都定义了一个同名属性，那么优先读取对象自身的属性，这叫做“覆盖”（overriding）。

// 举例来说，如果让构造函数的prototype属性指向一个数组，就意味着实例对象可以调用数组方法
var MyArray = function () {};
MyArray.prototype = new Array();
MyArray.prototype.constructor = MyArray;

var mine = new MyArray();
mine.push(1, 2, 3, 4);
console.log(mine.length); // 4
console.log(mine instanceof Array); // true

// 1.4 constructor 属性
// prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数。
function P() {}
console.log(P.prototype.constructor === P); // true
// 由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承
var p = new P();
console.log(p.constructor === P); // true
console.log(p.constructor === P.prototype.constructor); // true
console.log(p.hasOwnProperty("constructor")); // false

// constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的
function F() {}
var f12 = new F();
console.log(f12.constructor === F); // true
console.log(f12.constructor === RegExp); // false

// 有了constructor属性，就可以从一个实例对象新建另一个实例
function Constr() {}
var x = new Constr();
var y = new x.constructor();
console.log(y instanceof Constr); // true
// x是构造函数Constr的实例，可以从x.constructor间接调用构造函数。这使得在实例方法中，调用自身的构造函数成为可能

Constr.prototype.createCopy = function () {
  return new this.constructor();
};
// createCopy方法调用构造函数，新建另一个实例

// constructor属性表示原型对象与构造函数之间的关联关系，
// 如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错
function Person(name) {
  this.name = name;
}
console.log(Person.prototype.constructor === Person); // true

Person.prototype = {
  method: function () {},
};
console.log(Person.prototype.constructor === Person); // false
console.log(Person.prototype.constructor === Object); // true
// 构造函数Person的原型对象改掉了，但是没有修改constructor属性，导致这个属性不再指向Person
// 由于Person的新原型是一个普通对象，而普通对象的constructor属性指向Object构造函数，
// 导致Person.prototype.constructor变成了Object。

// 要么将constructor属性重新指向原来的构造函数，要么只在原型对象上添加方法，这样可以保证instanceof运算符不会失真。
// // 好的写法
// C.prototype = {
//   constructor: C,
//   method1: function () {},
//   // ...
// };

// // 更好的写法
// C.prototype.method1 = function () {};

// 如果不能确定constructor属性是什么函数，还有一个办法：通过name属性，从实例得到构造函数的名称
function Foo() {}
var f = new Foo();
console.log(f.constructor.name); // Foo

// 2. instanceof 运算符
// instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例
function Vehicle() {}
var v = new Vehicle();
console.log(v instanceof Vehicle); // true

// instanceof运算符的左边是实例对象，右边是构造函数。
// 它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上。因此，下面两种写法是等价的
v instanceof Vehicle;
// 等同于
Vehicle.prototype.isPrototypeOf(v);

// 由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true。
var d = new Date();
console.log(d instanceof Date); // true
console.log(d instanceof Object); // true
// d同时是Date和Object的实例，因此对这两个构造函数都返回true。

// instanceof的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上。
// 有一种特殊情况，就是左边对象的原型链上，只有null对象。这时，instanceof判断会失真。
var obj = Object.create(null);
console.log(typeof obj); // object
console.log(obj instanceof Object); // false
// Object.create(null)返回一个新对象obj，它的原型是null
// 右边的构造函数Object的prototype属性，不在左边的原型链上，因此instanceof就认为obj不是Object的实例。
// 这是唯一的instanceof运算符判断会失真的情况（一个对象的原型是null）

// instanceof运算符的一个用处，是判断值的类型。
var x = [1, 2, 3];
var y = {};
console.log(x instanceof Array); // true
console.log(y instanceof Object); // true

// 注意，instanceof运算符只能用于对象，不适用原始类型的值
var s = "hello";
console.log(s instanceof String); // false
// 字符串不是String对象的实例（因为字符串不是对象），所以返回false
// 对于undefined和null，instanceof运算符总是返回false
console.log(undefined instanceof Object); // false
console.log(null instanceof Object); // false

// 利用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题
function Fubar(foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
// 面代码使用instanceof运算符，在函数体内部判断this关键字是否为构造函数Fubar的实例。如果不是，就表明忘了加new命令。

// 3. 构造函数的继承
// 让一个构造函数继承另一个构造函数，是非常常见的需求。这可以分成两步实现。第一步是在子类的构造函数中，调用父类的构造函数
/*
function Sub(value) {
  Super.call(this);
  this.prop = value;
}
// 上面代码中，Sub是子类的构造函数，this是子类的实例。在实例上调用父类的构造函数Super，就会让子类实例具有父类实例的属性
// 第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
Sub.prototype.method = "...";
// 上面代码中，Sub.prototype是子类的原型，要将它赋值为Object.create(Super.prototype)，而不是直接等于Super.prototype。
// 否则后面两行对Sub.prototype的操作，会连父类的原型Super.prototype一起修改掉

// 另外一种写法是Sub.prototype等于一个父类实例
Sub.prototype = new Super();
// 上面这种写法也有继承的效果，但是子类会具有父类实例的方法。有时，这可能不是我们需要的，所以不推荐使用这种写法
*/
function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// 第一步，子类继承父类的实例
function Rectangle() {
  Shape.call(this); // 调用父类构造函数
}
// 另一种写法
/*
function Rectangle() {
  this.base = Shape;
  this.base();
}
*/
// 第二步，子类继承父类的原型
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
// 采用这样的写法以后，instanceof运算符会对子类和父类的构造函数，都返回true。
var rect = new Rectangle();
console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true
// 上面代码中，子类是整体继承父类。有时只需要单个方法的继承，这时可以采用下面的写法。
/*
ClassB.prototype.print = function() {
  ClassA.prototype.print.call(this);
  // some code
} 
*/
// 子类B的print方法先调用父类A的print方法，再部署自己的代码。这就等于继承了父类A的print方法

// 4. 多重继承
// JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能
function M1() {
  this.hello = "hello";
}
function M2() {
  this.world = "world";
}
function S() {
  M1.call(this);
  M2.call(this);
}
// 继承 M1
S.prototype = Object.create(M1.prototype);
// 继承链上加入 M2
Object.assign(S.prototype, M2.prototype);

// 指定构造函数
S.prototype.constructor = S;

var s = new S();
console.log(s.hello); // hello
console.log(s.world); // world
// 子类S同时继承了父类M1和M2。这种模式又称为 Mixin（混入）。

// 5. 模块
// 5.1 基本的实现方法
// 模块是实现特定功能的一组属性和方法的封装。
// 简单的做法是把模块写成一个对象，所有的模块成员都放到这个对象里面
var module1 = new Object({
  _count: 0,
  m1: function () {},
  m2: function () {},
});
// 上面的函数m1和m2，都封装在module1对象里。使用的时候，就是调用这个对象的属性
// 但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值

// 5.2 封装私有变量：构造函数的写法
// 我们可以利用构造函数，封装私有变量
function StringBuilder() {
  var buffer = [];
  this.add = function (str) {
    buffer.push(str);
  };
  this.toString = function () {
    return buffer.join("");
  };
}
// 上面代码中，buffer是模块的私有变量。一旦生成实例对象，外部是无法直接访问buffer的。
// 但是，这种方法将私有变量封装在构造函数中，导致构造函数与实例对象是一体的，总是存在于内存之中，无法在使用完成后清除。
// 这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，
// 违背了构造函数与实例对象在数据上相分离的原则（即实例对象的数据，不应该保存在实例对象以外
// 同时，非常耗费内存。
function StringBuilder() {
  this._buffer = [];
}
StringBuilder.prototype = {
  constructor: StringBuilder,
  add: function (str) {
    this._buffer.push(str);
  },
  toString: function () {
    return this._buffer.join("");
  },
};
// 这种方法将私有变量放入实例对象中，好处是看上去更自然，但是它的私有变量可以从外部读写，不是很安全

// 5.3 封装私有变量：立即执行函数的写法
// 另一种做法是使用“立即执行函数”（Immediately-Invoked Function Expression，IIFE），
// 将相关的属性和方法封装在一个函数作用域里面，可以达到不暴露私有成员的目的。
var module11 = (function () {
  var _count = 0;
  var m1 = function () {};
  var m2 = function () {};
  return { m1: m1, m2: m2 };
})();
// 使用上面的写法，外部代码无法读取内部的_count变量。
console.info(module11._count); // //undefined
// 上面的module1就是 JavaScript 模块的基本写法。下面，再对这种写法进行加工

// 5.4 模块的放大模式
// 如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用“放大模式”（augmentation）
var module11 = (function (mod) {
  mod.m3 = function () {};
  return mod;
})(module11);
// 上面的代码为module11模块添加了一个新方法m3()，然后返回新的module11模块。

// 在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上面的写法，
// 第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"（Loose augmentation）
// var module11 = (function (mod) {
//   //...
//   return mod;
// })(window.module11 || {});

// 与"放大模式"相比，“宽放大模式”就是“立即执行函数”的参数可以是空对象

// 5.5 输入全局变量
// 独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。
// 为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
/*
var module1 = (function ($, YAHOO) {
　//...
})(jQuery, YAHOO);
*/
// 上面的module1模块需要使用 jQuery 库和 YUI 库，就把这两个库（其实是两个模块）当作参数输入module1。
// 这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

// 立即执行函数还可以起到命名空间的作用
(function ($, window, document) {
  function go(num) {}

  function handleEvents() {}

  function initialize() {}

  function dieCarouselDie() {}

  // Attach to the global scope
  window.finalCarousel = {
    init: initialize,
    destroy: dieCarouselDie,
  };
})(jQuery, window, document);
// 上面代码中，finalCarousel对象输出到全局，对外暴露init和destroy接口，
// 内部方法go、handleEvents、initialize、dieCarouselDie都是外部无法调用的。
