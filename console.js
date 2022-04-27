console.log("hello world");
console.log("a", "b", "c");
console.log(" %s + %s = %s", 1, 1, 2);
console.log(
  "%cThis text is styled!",
  "color: red; background: yellow; font-size: 24px;"
);
// 使用%c占位符时，对应的参数必须是 CSS 代码，用来对输出内容进行 CSS 渲染。
console.log(" %s + %s ", 1, 1, "= 2");
console.log({ foo: "bar" });
console.log(Date);
console.info("hello world");
// console.info是console.log方法的别名，用法完全一样。
// 只不过console.info方法会在输出信息的前面，加上一个蓝色图标

// console.debug方法与console.log方法类似，会在控制台输出调试信息。
// 但是，默认情况下，console.debug输出的信息不会显示，只有在打开显示级别在verbose的情况下，才会显示
// ["log", "info", "warn", "error"].forEach(function (method) {
//   console[method] = console[method].bind(console, new Date().toISOString());
// });

console.log("出错了！");

// warn方法和error方法也是在控制台输出信息，它们与log方法的不同之处在于，
// warn方法输出信息时，在最前面加一个黄色三角，表示警告；error方法输出信息时，
// 在最前面加一个红色的叉，表示出错。
// 同时，还会高亮显示输出文字和错误发生的堆栈。其他方面都一样。
console.error("Error: %s (%i)", "Server is not response", 500);
// console.warn("Warning! Too few nodes (%d)", document.childNodes.length);

// 对于某些复合类型的数据，console.table方法可以将其转为表格显示。
var languages = [
  { name: "Javascript", fileExtension: ".js" },
  { name: "TypeScript", fileExtension: ".ts" },
  { name: "CoffeeScript", fileExtension: ".coffee" },
];
console.table(languages);

var languages = {
  csharp: { name: "C#", paradigm: "object-oriented" },
  fsharp: { name: "F#", paradigm: "functional" },
};
console.table(languages);

// count方法用于计数，输出它被调用了多少次
// 该方法可以接受一个字符串作为参数，作为标签，对执行次数进行分类
function greet(user) {
  console.count(user);
  return "hi " + user;
}

greet("bob");
greet("alice");
greet("bob");

// dir方法用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示
console.log({ f1: "foo", f2: "bar" });
console.dir({ f1: "boo", f2: "bar" });

// 该方法对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性。
// console.dir(document.body);
// Node 环境之中，还可以指定以代码高亮的形式输出。
console.dir(languages, { colors: true });

// dirxml方法主要用于以目录树的形式，显示 DOM 节点。
// console.dirxml(document.body)
// 如果参数不是 DOM 节点，而是普通的 JavaScript 对象，
// console.dirxml等同于console.dir。

// console.assert方法主要用于程序运行过程中，进行条件判断，
// 如果不满足条件，就显示一个错误，但不会中断程序执行。
// 这样就相当于提示用户，内部状态不正确。
console.assert(false, "判断条件不成立");
// 相当于
// try {
//   if (!false) {
//     throw new Error("条件判断不成立");
//   }
// } catch (e) {
//   console.error(e);
// }

// 这两个方法用于计时，可以算出一个操作所花费的准确时间。
console.time("Array initialize");
var array = new Array(1000000);
for (let i = 0; i < array.length; i++) {
  array[i] = new Object();
}
console.timeEnd("Array initialize");

// console.group和console.groupEnd这两个方法用于将显示的信息分组。
// 它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开。
console.group("一级分组");
console.log("一级分组内容");

console.group("二级分组");
console.log("二级分组内容");

console.groupEnd(); // 二级分组结束
console.groupEnd(); // 一级分组结束

// console.groupCollapsed方法与console.group方法很类似，
// 唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。
console.groupCollapsed("Fetching Data");

console.log("Request Sent");
console.error("Error: Server not responding (500)");

console.groupEnd();

// console.trace方法显示当前执行的代码在堆栈中的调用路径。
console.trace();

console.clear();
// console.clear方法用于清除当前控制台的所有输出，将光标回置到第一行。
// 如果用户选中了控制台的“Preserve log”选项，console.clear方法将不起作用。

// $_属性返回上一个表达式的值。

// $0 - $4
// 控制台保存了最近5个在 Elements 面板选中的 DOM 元素，
// $0代表倒数第一个（最近一个），$1代表倒数第二个，以此类推直到$4。

// $(selector)
// $(selector)返回第一个匹配的元素，等同于document.querySelector()。
// 注意，如果页面脚本对$有定义，则会覆盖原始的定义。
// 比如，页面里面有 jQuery，控制台执行$(selector)就会采用 jQuery 的实现，返回一个数组。

// $$(selector)
// $$(selector)返回选中的 DOM 对象，等同于document.querySelectorAll。

// $x(path)
// $x(path)方法返回一个数组，包含匹配特定 XPath 表达式的所有 DOM 元素。

// inspect(object)
// inspect(object)方法打开相关面板，并选中相应的元素，显示它的细节

// getEventListeners(object)
// getEventListeners(object)方法返回一个对象，
// 该对象的成员为object登记了回调函数的各种事件（比如click或keydown），
// 每个事件对应一个数组，数组的成员为该事件的回调函数。

// keys(object)方法返回一个数组，包含object的所有键名。

// values(object)方法返回一个数组，包含object的所有键值。
// var o = { p1: "a", p2: "b" };
// keys(o);
// values(o);

// monitorEvents(object[, events])方法监听特定对象上发生的特定事件。
// 事件发生时，会返回一个Event对象，包含该事件的相关信息。unmonitorEvents方法用于停止监听。

/* 
clear()：清除控制台的历史。
copy(object)：复制特定 DOM 元素到剪贴板。
dir(object)：显示特定对象的所有属性，是console.dir方法的别名。
dirxml(object)：显示特定对象的 XML 形式，是console.dirxml方法的别名。
*/

for (var i = 0; i < 5; i++) {
  console.log(i);
  if (i === 2) debugger;
}
