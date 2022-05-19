// JSON.stringify()方法用于将一个值转为 JSON 字符串。
// 该字符串符合 JSON 格式，并且可以被JSON.parse()方法还原
console.log(JSON.stringify("abc")); // ""abc""
console.log(JSON.stringify("1")); // "1"
console.log(JSON.stringify(false)); // "false"
console.log(JSON.stringify([])); // "[]"
console.log(JSON.stringify({})); // "{}"
console.log(JSON.stringify([1, "false", false])); // ('1[1, "false", false]');
console.log(JSON.stringify({ name: "张三" })); // {"name":"张三"}

// 注意，对于原始类型的字符串，转换结果会带双引号。
console.log(JSON.stringify("foo") === "foo"); // false
console.log(JSON.stringify("foo") === '"foo"'); // true

// 如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify()过滤。
var obj = { a: undefined, b: function () {} };
console.log(JSON.stringify(obj)); // "{}"

// 如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null
var arr = [undefined, function () {}];
console.log(JSON.stringify(arr)); // "[null, null]"

// 正则对象会被转成空对象。
console.log(JSON.stringify(/foo/)); // {}

// JSON.stringify()方法会忽略对象的不可遍历的属性
var obj = {};
Object.defineProperties(obj, {
  foo: { value: 1, enumerable: true },
  bar: {
    value: 2,
    enumerable: false,
  },
});
console.log(JSON.stringify(obj)); // {"foo": 1}

// JSON.stringify()方法还可以接受一个数组，作为第二个参数，指定参数对象的哪些属性需要转成字符串。
var obj = { prop1: "value1", prop2: "value2", prop3: "value3" };
var selectedProperties = ["prop1", "prop2"];
console.log(JSON.stringify(obj, selectedProperties)); // {"prop1": "value1", "prop2": "value2"}

// 这个类似白名单的数组，只对对象的属性有效，对数组无效
console.log(JSON.stringify(["a", "b"], ["0"])); // ["a", "b"]
console.log(JSON.stringify({ 0: "a", 1: "b" }, ["0"])); // {"0": "a"}
// 上面代码中，第二个参数指定 JSON 格式只转0号属性，实际上对数组是无效的，只对对象有效。

// 第二个参数还可以是一个函数，用来更改JSON.stringify()的返回值
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

console.log(JSON.stringify({ a: 1, b: 2 }, f)); // {"a":2,"b":4}
// 注意，这个处理函数是递归处理所有的键。

var obj2 = { a: { b: 1 } };
function f1(key, value) {
  console.log("[" + key + "]:" + value);
  return value;
}
console.log(JSON.stringify(obj2, f1));
/**
[]:[object Object]
[a]:[object Object]
[b]:1
{"a":{"b":1}}
*/
// 上面代码中，对象obj一共会被f函数处理三次，输出的最后那行是JSON.stringify()的默认输出。
// 第一次键名为空，键值是整个对象obj；
// 第二次键名为a，键值是{b: 1}；
// 第三次键名为b，键值为1。
// 递归处理中，每一次处理的对象，都是前一次返回的值
var obj10 = { a: 1 };
function f2(key, value) {
  console.log("[" + key + "]:" + value);
  if (typeof value == "object") {
    return { b: 2 };
  }
  return value * 2;
}
console.log(JSON.stringify(obj10, f2));
// []:[object Object]
// [b]:2
// {"b":4}

// 如果处理函数返回undefined或没有返回值，则该属性会被忽略。
function f4(key, value) {
  if (typeof value == "string") {
    return undefined;
  }
  return value;
}
console.log(JSON.stringify({ a: "abc", b: 123 }, f4));
// {"b":123}

// JSON.stringify()还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性
// 默认返回的是单行字符串，对于大型的 JSON 对象，可读性非常差。
// 第三个参数使得每个属性单独占据一行，并且将每个属性前面添加指定的前缀（不超过10个字符）
console.log(JSON.stringify({ p1: 1, p2: 2 })); // {"p1":1,"p2":2}
console.log(JSON.stringify({ p1: 1, p2: 2 }, null, "\t"));
/**
{
	"p1": 1,
	"p2": 2
}
*/
// 上面例子中，第三个属性\t在每个属性前面添加一个制表符，然后分行显示。
// 第三个属性如果是一个数字，则表示每个属性前面添加的空格（最多不超过10个）。
console.log(JSON.stringify({ p1: 1, p2: 2 }, null, 2));
/*
{
  "p1": 1,
  "p2": 2
}
*/

// 如果参数对象有自定义的toJSON()方法，那么JSON.stringify()会使用这个方法的返回值作为参数，
// 而忽略原对象的其他属性。
var user = {
  firstName: "san",
  lastName: "zhang",

  get fullName() {
    return this.lastName + this.firstName;
  },
};
console.log(JSON.stringify(user));
// {"firstName":"san","lastName":"zhang","fullName":"zhangsan"}

var user1 = {
  firstName: "san",
  lastName: "zhang",

  get fullName() {
    return this.lastName + this.firstName;
  },

  toJSON() {
    return { name: this.lastName + this.firstName };
  },
};
console.log(JSON.stringify(user1));
// {"name":"zhangsan"}

// toJSON()方法的一个应用是，将正则对象自动转为字符串。
// 因为JSON.stringify()默认不能转换正则对象，但是设置了toJSON()方法以后，就可以转换正则对象了。
var obj5 = { reg: /foo/ };
// 不设置 toJson 方法时
console.log(JSON.stringify(obj5)); // {"reg":{}}
// 设置 toJson 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
console.log(JSON.stringify(obj5)); // {"reg":"/foo/"}

// JSON.parse()方法用于将 JSON 字符串转换成对应的值。
console.log(JSON.parse("{}")); // {}
console.log(JSON.parse("true")); // true
console.log(JSON.parse('"foo"')); // foo
console.log(JSON.parse('[1, 5, "false"]')); // [1, 5, "false"]
console.log(JSON.parse("null")); // null
var o = JSON.parse('{"name": "zhangsan"}');
console.log(o.name); // zhangsan

// 如果传入的字符串不是有效的 JSON 格式，JSON.parse()方法将报错。
// 为了处理解析错误，可以将JSON.parse()方法放在try...catch代码块中
try {
  JSON.parse("'String'");
} catch (e) {
  console.log("parsing error");
}
// 双引号字符串中是一个单引号字符串，因为单引号字符串不符合 JSON 格式，所以报错。

// JSON.parse()方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify()方法类似
function f11(key, value) {
  if (key === "a") {
    return value + 10;
  }
  return value;
}
console.log(JSON.parse('{"a": 1, "b": 2}', f11));
// { a: 2, b: 4 }
