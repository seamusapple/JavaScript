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
