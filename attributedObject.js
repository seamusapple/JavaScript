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
