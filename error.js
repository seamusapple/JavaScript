var error = new Error("some error");
console.log(error.message); // some error

function throwit() {
  throw new Error("");
}

function catchit() {
  try {
    throwit();
  } catch (e) {
    console.log(e.stack);
  }
}

// catchit();
// 1. SyntaxError: SyntaxError对象是解析代码时发生的语法错误。
/*
var 1a;
console.log 'hello');
*/

// 2. ReferenceError: 引用一个不存在的变量时发生的错误。
/*
unknownVariable;
console.log() = 1
*/

// 3. RangeError: 一个值超出有效范围时发生的错误
/*
new Array(-1);
*/

// 4. TypeError: 变量或参数不是预期类型时发生的错误
/*
var obj = {};

obj.unknownMethod();
new 123();
*/

// 5. URIError: URI 相关函数的参数不正确时抛出的错误，
// 主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数。
/*
decodeURI("%2");
*/

// 6. EvalError: eval函数没有被正确执行时，会抛出EvalError错误。
// 该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留

// 自定义错误
class UserError {
  constructor(message) {
    this.message = message || "默认信息";
    this.name = "UserError";
  }
}

UserError.prototype = new Error();

new UserError("这是自定义错误！");

// throw 语句
// throw语句的作用是手动中断程序执行，抛出一个错误。
/*
var x = -1;
if (x <= 0) {
  throw new UserError("x必须为正数");
}
*/

// try...catch
try {
  throw new Error("出错了!");
} catch (e) {
  console.log(e.name + ":" + e.message);
  console.log(e.stack);
}

try {
  throw "出错了";
} catch (e) {
  console.log(111);
}
console.log(222);

try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}

/*
function cleanUp() {
  try {
    throw new Error("出错了");
    console.log("此行不会执行");
  } finally {
    console.log("完成清理工作");
  }
}

cleanUp();
*/

function idel(x) {
  try {
    console.log(x);
    return "result";
  } finally {
    console.log("FINALLY");
  }
}

idel("hello");

// return语句的执行是排在finally代码之前，只是等finally代码执行完毕后才返回。
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}
console.log(countUp()); // 0
console.log(count); // 1

function f() {
  try {
    console.log(0);
    throw "bug";
  } catch (e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行
    console.log(2); // 不会执行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句 return
    console.log(4); // 不会执行
  }

  console.log(5); // 不会执行
}

var result = f();
console.log(result);

// catch代码块之中，触发转入finally代码块的标志，不仅有return语句，还有throw语句。
function f() {
  try {
    throw "出错了！";
  } catch (e) {
    console.log("捕捉到内部错误");
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch (e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误

try {
  try {
    consle.log("Hello world!"); // 报错
  } finally {
    console.log("Finally");
  }
  console.log("Will I run?"); // No
} catch (error) {
  console.error(error.message);
}

// 上面代码中，try里面还有一个try。内层的try报错（console拼错了），
// 这时会执行内层的finally代码块，然后抛出错误，被外层的catch捕获。
