// 构造函数
var Vehicle = function () {
  this.price = 1000;
};
// 构造函数的特点有两个。
/*
1. 函数体内部使用了this关键字，代表了所要生成的对象实例。
2. 生成对象的时候，必须使用new命令
*/

// new命令执行构造函数，返回一个实例对象
var v = new Vehicle();
console.log(v.price); // 1000
// new命令执行时，构造函数内部的this，就代表了新生成的实例对象

// 使用new命令时，根据需要，构造函数也可以接受参数
var Vehicle2 = function (p) {
  this.price = p;
};
var v2 = new Vehicle2(120);
console.log(v2.price); // 120

// 如果不适用new命令，构造函数就变成了普通函数，并不会生成实例对象。
// 而且this这时代表全局对象，将造成一些意想不到的结果。
var Vehicle3 = function () {
  this.price = 1500;
};
var v = Vehicle3();
console.log(v); // undefined
console.log(price); // 1500
// 此时，price变成了全局变量

function Fubar(foo, bar) {
  "use strict"; // 使用 use strict 严格模式，一旦忘记使用new命令，直接使用构造函数会报错。
  this._foo = foo;
  this._bar = bar;
}
/* Fubar(); // TypeError: Cannot set property '_foo' of undefined */

function Fubar1(foo, bar) {
  if (!(this instanceof Fubar)) {
    return new Fubar(foo, bar);
  }
  this._foo = foo;
  this._bar = bar;
}
console.log(Fubar1(1, 2)._foo); // 1
console.log(new Fubar1(1, 2)._foo); // 1

// 使用new命令时，它后面的函数依次执行下面的步骤
/**
创建一个空对象，作为将要返回的对象实例。
将这个空对象的原型，指向构造函数的prototype属性。
将这个空对象赋值给函数内部的this关键字。
开始执行构造函数内部的代码。 
*/

// 如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；
// 否则，就会不管return语句，返回this对象。
var Vehicle3 = function () {
  this.price = 1000;
  return 1000;
};
console.log(new Vehicle3() === 1000); // false

// 但是，如果return语句返回的是一个跟this无关的新对象，new命令会返回这个新对象，而不是this对象。
var Vehicle4 = function () {
  this.price = 1000;
  return { price: 2000 };
};
console.log(new Vehicle4().price); // 2000

// 如果对普通函数（内部没有this关键字的函数）使用new命令，则会返回一个空对象。
function getMessage() {
  return "this is a message";
}
var msg = new getMessage();
console.log(msg); // {}
console.log(typeof msg); // object

// new.target
// 函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。
function f() {
  console.log(new.target === f);
}
f(); // false
new f(); // true

// Object.create() 创建实例对象
// 构造函数作为模板，可以生成实例对象。但是，有时拿不到构造函数，只能拿到一个现有的对象。
// 我们希望以这个现有的对象作为模板，生成新的实例对象，这时就可以使用Object.create()方法
var person1 = {
  name: "zhangsan",
  age: 38,
  greeting: function () {
    console.log("Hi! I'm " + this.name + ".");
  },
};
var person2 = Object.create(person1);
console.log(person2.name); // zhangsan
person2.greeting(); // Hi! I'm zhangsan
