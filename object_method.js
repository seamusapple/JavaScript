// 1. Object.getPrototypeOf()
// Object.getPrototypeOf方法返回参数对象的原型。这是获取原型对象的标准方法
var F = function () {};
var f = new F();
console.log(Object.getPrototypeOf(f) === F.prototype); // true
// 实例对象f的原型是F.prototype。

// 下面是几种特殊对象的原型。
// 空对象的原型是 Object.prototype
console.log(Object.getPrototypeOf({}) === Object.prototype); // true
// Object.prototype 的原型是 null
console.log(Object.getPrototypeOf(Object.prototype) === null); // true
// 函数的原型是 Function.prototype
function f1() {}
console.log(Object.getPrototypeOf(f1) === Function.prototype); // true

// 2. Object.setPrototypeOf()
// Object.setPrototypeOf方法为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象
var a = {};
var b = { x: 1 };
Object.setPrototypeOf(a, b);
console.log(Object.getPrototypeOf(a) === b); // true
console.log(a.x); // 1

// new命令可以使用Object.setPrototypeOf方法模拟。
var F1 = function () {
  this.foo = "bar";
};
var f = new F();
// 等同于
var f = Object.setPrototypeOf({}, F.prototype);
F.call(f);
// 上面代码中，new命令新建实例对象，其实可以分成两步。
// 第一步，将一个空对象的原型设为构造函数的prototype属性（上例是F.prototype）；
// 第二步，将构造函数内部的this绑定这个空对象，然后执行构造函数，
// 使得定义在this上面的方法和属性（上例是this.foo），都转移到这个空对象上

// 3. Object.create()
// 生成实例对象的常用方法是，使用new命令让构造函数返回一个实例。但是很多时候，只能拿到一个实例对象，它可能根本不是由构建函数生成的
// JavaScript 提供了Object.create()方法，用来满足这种需求。该方法接受一个对象作为参数，然后以它为原型，返回一个实例对象。该实例完全继承原型对象的属性
// 原型对象
var A = {
  print: function () {
    console.log("hello");
  },
};
// 实例对象
var B = Object.create(A);

console.log(Object.getPrototypeOf(B) === A); // true
B.print(); // hello
console.log(B.print === A.print); // true

// Object.create()方法可以用下面的代码代替
if (typeof Object.create !== "function") {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
// Object.create()方法的实质是新建一个空的构造函数F，然后让F.prototype属性指向参数对象obj，
// 最后返回一个F的实例，从而实现让该实例继承obj的属性

// 下面三种方式生成的新对象是等价的
var obj1 = Object.create({});
var obj2 = Object.create(Object.prototype);
var obj3 = new Object();

// 如果想要生成一个不继承任何属性（比如没有toString()和valueOf()方法）的对象，可以将Object.create()的参数设为null
var obj = Object.create(null);

// 使用Object.create()方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错
// Object.create(); // TypeError: Object prototype may only be an Object or null
// Object.create(123); // TypeError: Object prototype may only be an Object or null

// Object.create()方法生成的新对象，动态继承了原型。在原型上添加或修改任何方法，会立刻反映在新对象之上
var obj1 = { p: 1 };
var obj2 = Object.create(obj1);

obj1.p = 2;
console.log(obj2.p); // 2

// 除了对象的原型，Object.create()方法还可以接受第二个参数。
// 该参数是一个属性描述对象，它所描述的对象属性，会添加到实例对象，作为该对象自身的属性
var obj = Object.create(
  {},
  {
    p1: { value: 123, enumerable: true, configurable: true, writable: true },
    p2: { value: "abc", enumerable: true, configurable: true, writable: true },
  }
);
// 等同于
var obj = Object.create({});
obj.p1 = 123;
obj.p2 = "abc";

// Object.create()方法生成的对象，继承了它的原型对象的构造函数
function A1() {}
var a = new A1();
var b = Object.create(a);

console.log(b.constructor === A1); // true
console.log(b instanceof A1); // true

// 4.Object.prototype.isPrototypeOf()
// 实例对象的isPrototypeOf方法，用来判断该对象是否为参数对象的原型。
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

console.log(o2.isPrototypeOf(o3)); // true
console.log(o1.isPrototypeOf(o3)); // true
// 上面代码中，o1和o2都是o3的原型。这表明只要实例对象处在参数对象的原型链上，isPrototypeOf方法都返回true。
Object.prototype.isPrototypeOf({}); // true
Object.prototype.isPrototypeOf([]); // true
Object.prototype.isPrototypeOf(/xyz/); // true
Object.prototype.isPrototypeOf(Object.create(null)); // false
// 上面代码中，由于Object.prototype处于原型链的最顶端，所以对各种实例都返回true，只有直接继承自null的对象除外。

// 5. Object.prototype.__proto__
// 实例对象的__proto__属性（前后各两个下划线），返回该对象的原型。该属性可读写。
var obj = {};
var p = {};
obj.__proto__ = p;
console.log(Object.getPrototypeOf(obj) === p); // true
// 上面代码通过__proto__属性，将p对象设为obj对象的原型
// 它前后的两根下划线, 表明它本质是一个内部属性，不应该对使用者暴露。因此，应该尽量少用这个属性

// 原型链可以用__proto__很直观地表示
var A = {
  name: "zhangsan",
};
var B = {
  name: "lisi",
};

var proto = {
  print: function () {
    console.log(this.name);
  },
};

A.__proto__ = proto;
B.__proto__ = proto;

A.print(); // zhangsan
B.print(); // lisi

console.log(A.print === B.print); // true
console.log(A.print === proto.print); // true
console.log(B.print === proto.print); // true
// A对象和B对象的原型都是proto对象，它们都共享proto对象的print方法。
// 也就是说，A和B的print方法，都是在调用proto对象的print方法

// 6. 获取原型对象方法的比较
// 如前所述，__proto__属性指向当前对象的原型对象，即构造函数的prototype属性
var obj = new Object();
console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.__proto__ === obj.constructor.prototype); // true
// 上面代码首先新建了一个对象obj，它的__proto__属性，指向构造函数（Object或obj.constructor）的prototype属性
// 因此，获取实例对象obj的原型对象，有三种方法
// obj.__proto__
// obj.constructor.prototype
// Object.getPrototypeOf(obj)

// 上面三种方法之中，前两种都不是很可靠。__proto__属性只有浏览器才需要部署，其他环境可以不部署。
// 而obj.constructor.prototype在手动改变原型对象时，可能会失效。
var P = function () {};
var p = new P();

var C = function () {};
C.prototype = p;
var c = new C();
console.log(c.constructor.prototype === p); // false
// 上面代码中，构造函数C的原型对象被改成了p，但是实例对象的c.constructor.prototype却没有指向p。
// 所以，在改变原型对象时，一般要同时设置constructor属性。
C.prototype = p;
C.prototype.constructor = C;
var c1 = new C();
console.log(c1.constructor.prototype === p); // true
// 因此，推荐使用第三种Object.getPrototypeOf方法，获取原型对象。

// 7. Object.getOwnPropertyNames()
// Object.getOwnPropertyNames方法返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性键名
console.log(Object.getOwnPropertyNames(Date));
// [ 'length', 'name', 'prototype', 'now', 'parse', 'UTC' ]
// 对象本身的属性之中，有的是可以遍历的（enumerable），有的是不可以遍历的。Object.getOwnPropertyNames方法返回所有键名，
// 不管是否可以遍历。只获取那些可以遍历的属性，使用Object.keys方法。
console.log(Object.keys(Date)); // []

// 8. Object.prototype.hasOwnProperty()
// 对象实例的hasOwnProperty方法返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。
console.log(Date.hasOwnProperty("length")); // true
console.log(Date.hasOwnProperty("toString")); // false
// 上面代码表明，Date.length（构造函数Date可以接受多少个参数）是Date自身的属性，Date.toString是继承的属性
// 另外，hasOwnProperty方法是 JavaScript 之中唯一一个处理对象属性时，不会遍历原型链的方法。

// 9. in 运算符和 for...in 循环
// in运算符返回一个布尔值，表示一个对象是否具有某个属性。它不区分该属性是对象自身的属性，还是继承的属性。
console.log("length" in Date); // true
console.log("toString" in Date); // true
// in运算符常用于检查一个属性是否存在

// 获得对象的所有可遍历属性（不管是自身的还是继承的），可以使用for...in循环
var o1 = { p1: 123 };
var o2 = Object.create(o1, {
  p2: { value: "abc", enumerable: true },
});
for (p in o2) {
  console.info(p);
}
// p2
// p1
// 上面代码中，对象o2的p2属性是自身的，p1属性是继承的。这两个属性都会被for...in循环遍历。

// 为了在for...in循环中获得对象自身的属性，可以采用hasOwnProperty方法判断一下。
// for (var name1 in object) {
//   if (object.hasOwnProperty(name1)) {
//     /* loop code */
//   }
// }

// 获得对象的所有属性（不管是自身的还是继承的，也不管是否可枚举），可以使用下面的函数
function inheritedPropertyNames(obj) {
  var props = {};
  while (obj) {
    Object.getOwnPropertyNames(obj).forEach(function (p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}
// 上面代码依次获取obj对象的每一级原型对象“自身”的属性，从而获取obj对象的“所有”属性，不管是否可遍历
console.log(inheritedPropertyNames(Date));
/**
 [
  'length',           'name',
  'prototype',        'now',
  'parse',            'UTC',
  'arguments',        'caller',
  'constructor',      'apply',
  'bind',             'call',
  'toString',         '__defineGetter__',
  '__defineSetter__', 'hasOwnProperty',
  '__lookupGetter__', '__lookupSetter__',
  'isPrototypeOf',    'propertyIsEnumerable',
  'valueOf',          'toLocaleString'
]
 */

// 10. 对象的拷贝
// 如果要拷贝一个对象，需要做到下面两件事情
// 确保拷贝后的对象，与原对象具有同样的原型。
// 确保拷贝后的对象，与原对象具有同样的实例属性
function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}
function copyOwnPropertiesFrom(target, source) {
  Object.getOwnPropertyNames(source).forEach(function (propKey) {
    var desc = Object.getOwnPropertyDescriptor(source, propKey);
    Object.defineProperty(target, propKey, desc);
  });
  return target;
}

// 另一种更简单的写法，是利用 ES2017 才引入标准的Object.getOwnPropertyDescriptors方法
function copyObject(orig) {
  return Object.create(
    Object.getPrototypeOf(orig),
    Object.getOwnPropertyDescriptors(orig)
  );
}
