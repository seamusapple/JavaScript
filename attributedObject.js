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
