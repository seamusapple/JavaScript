// Object.getOwnPropertyDescriptor()方法可以获取属性描述对象。
// 它的第一个参数是目标对象，第二个参数是一个字符串，对应目标对象的某个属性名
var obj = { p: "a" };
console.log(Object.getOwnPropertyDescriptors(obj, "p"));
// 注意，Object.getOwnPropertyDescriptor()方法只能用于对象自身的属性，
// 不能用于继承的属性。

// Object.getOwnPropertyNames方法返回一个数组，
// 成员是参数对象自身的全部属性的属性名，不管该属性是否可遍历。
var obj = Object.defineProperties(
  {},
  {
    p1: { value: 1, enumerabl: true },
    p2: { value: 2, enumerabl: false },
  }
);
console.log(Object.getOwnPropertyNames(obj));

console.log(Object.keys([])); // []
console.log(Object.getOwnPropertyNames([])); // [ 'length' ]

console.log(Object.keys(Object.prototype));
console.log(Object.getOwnPropertyNames(Object.prototype));
// 这跟Object.keys的行为不同，Object.keys只返回对象自身的可遍历属性的全部属性名

// Object.defineProperty()方法允许通过属性描述对象，定义或修改一个属性，然后返回修改后的对象
/*
Object.defineProperty方法接受三个参数，依次如下。

object：属性所在的对象
propertyName：字符串，表示属性名
attributesObject：属性描述对象
*/
var obj = Object.defineProperty({}, "p", {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
});
console.log(obj.p); // 123
obj.p = 246;
console.log(obj.p); // 123

var obj = Object.defineProperties(
  {},
  {
    p1: { value: 123, enumerable: true },
    p2: { value: "abc", enumerable: true },
    p3: {
      get: function () {
        return this.p1 + this.p2;
      },
      enumerable: true,
      configurable: true,
    },
  }
);
console.log(obj.p1); // 123
console.log(obj.p2); // abc
console.log(obj.p3); // 123abc

// 实例对象的propertyIsEnumerable()方法返回一个布尔值，用来判断某个属性是否可遍历。
// 注意，这个方法只能用于判断对象自身的属性，对于继承的属性一律返回false
var obj = {};
obj.p = 123;
console.log(obj.propertyIsEnumerable("p")); // true
console.log(obj.propertyIsEnumerable("toString")); // false

// 元属性
var obj = {};
obj.p = 123;
console.log(Object.getOwnPropertyDescriptor(obj, "p").value); // 123
Object.defineProperty(obj, "p", { value: 246 });
console.log(obj.p); // 246

var obj = {};
Object.defineProperty(obj, "a", { value: 37, writable: false });
console.log(obj.a); // 37
obj.a = 25;
console.log(obj.a); // 37

// 如果原型对象的某个属性的writable为false，那么子对象将无法自定义这个属性。
var proto = Object.defineProperty({}, "foo", {
  value: "a",
  writable: false,
});
var obj = Object.create(proto);
console.log(obj.foo); // a

// 有一个规避方法，就是通过覆盖属性描述对象，绕过这个限制。
// 原因是这种情况下，原型链会被完全忽视。
Object.defineProperty(obj, "foo", {
  value: "b",
});
console.log(obj.foo); // b

// 如果一个属性的enumerable为false，下面三个操作不会取到该属性。
/*
for..in循环
Object.keys方法
JSON.stringify方法
*/
// 因此，enumerable可以用来设置“秘密”属性
var obj = {};
Object.defineProperty(obj, "x", {
  value: 123,
  enumerable: false,
});
console.log(obj.x); // 123
for (const key in obj) {
  console.log(key); // nothing
}
console.log(Object.keys(obj)); // []
console.log(JSON.stringify(obj)); // {}

// 注意，for...in循环包括继承的属性，Object.keys方法不包括继承的属性。
// 如果需要获取对象自身的所有属性，不管是否可遍历，可以使用Object.getOwnPropertyNames方法。

// 另外，JSON.stringify方法会排除enumerable为false的属性，有时可以利用这一点。
// 如果对象的 JSON 格式输出要排除某些属性，就可以把这些属性的enumerable设为false。

// configurable为false时，writable、enumerable和configurable都不能被修改了。
var obj = Object.defineProperty({}, "p", {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false,
});
/*
Object.defineProperty(obj, "p", { writable: true }); // TypeError: Cannot redefine property: p
Object.defineProperty(obj, "p", { enumerable: true }); // TypeError: Cannot redefine property: p
Object.defineProperty(obj, "p", { configurable: true }); // TypeError: Cannot redefine property: p
Object.defineProperty(obj, "p", { value: 2 }); // TypeError: Cannot redefine property: p
*/

// writable属性只有在false改为true时会报错，true改为false是允许的。
var obj = Object.defineProperty({}, "p", {
  writable: true,
  configurable: false,
});

Object.defineProperty(obj, "p", {
  writable: false,
}); // OK

// value属性的情况比较特殊。只要writable和configurable有一个为true，就允许改动value
var o1 = Object.defineProperty({}, "p", {
  value: 1,
  writable: true,
  configurable: false,
});
Object.defineProperty(o1, "p", { value: 2 }); // 成功

var o2 = Object.defineProperty({}, "p", {
  value: 1,
  writable: false,
  configurable: true,
});
Object.defineProperty(o2, "p", { value: 2 }); // 成功

// writable为false时，直接对目标属性赋值，不报错，但不会成功。
var obj = Object.defineProperty({}, "p", {
  value: 1,
  writable: false,
  configurable: false,
});
obj.p = 2; // No ERROR
console.log(obj.p); // 1
// 如果是严格模式，还会报错。

// 可配置性决定了目标属性是否可以被删除（delete）。
var obj = Object.defineProperties(
  {},
  {
    p1: { value: 1, configurable: true },
    p2: { value: 2, configurable: false },
  }
);
delete obj.p1; // true
delete obj.p2; // false
console.log(obj.p1); // undefined
console.log(obj.p2); // 2
