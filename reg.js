// 新建正则表达式有两种方法。一种是使用字面量，以斜杠表示开始和结束。
var regex = /xyz/;
// 另一种是使用RegExp构造函数。
var regex = new RegExp("xyz");
// 上面两种写法是等价的，都新建了一个内容为xyz的正则表达式对象。
// 它们的主要区别是，第一种方法在引擎编译代码时，就会新建正则表达式，第二种方法在运行时新建正则表达式，所以前者的效率较高。
// 而且，前者比较便利和直观，所以实际应用中，基本上都采用字面量定义正则表达式。

// RegExp构造函数还可以接受第二个参数，表示修饰符
var regex = new RegExp("xyz", "i");
// 等价于
var regex = /xyz/i;

// 正则对象的实例属性分成两类。
// 一类是修饰符相关，用于了解设置了什么修饰符
/*
RegExp.prototype.ignoreCase：返回一个布尔值，表示是否设置了i修饰符。
RegExp.prototype.global：返回一个布尔值，表示是否设置了g修饰符。
RegExp.prototype.multiline：返回一个布尔值，表示是否设置了m修饰符。
RegExp.prototype.flags：返回一个字符串，包含了已经设置的所有修饰符，按字母排序。
*/
// 上面四个属性都是只读的
var r = /abc/gim;
console.log(r.ignoreCase); // true
console.log(r.global); // true
console.log(r.multiline); // true
console.log(r.flags); // gim

// 另一类是与修饰符无关的属性，主要是下面两个
/*
RegExp.prototype.lastIndex：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义
RegExp.prototype.source：返回正则表达式的字符串形式（不包括反斜杠），该属性只读。
*/
console.log(r.lastIndex); // 0
console.log(r.source); // 'abc'

// 正则实例对象的test方法返回一个布尔值，表示当前模式是否能匹配参数字符串
console.log(/cat/.test("cats and dogs")); // true
// 如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配。
var r = /x/g;
var s = "_x_x";
console.log(r.lastIndex); // 0
console.log(r.test(s)); // true
console.log(r.lastIndex); // 2
console.log(r.test(s)); // true
console.log(r.lastIndex); // 4
console.log(r.test(s)); // false

// 带有g修饰符时，可以通过正则对象的lastIndex属性指定开始搜索的位置
r.lastIndex = 1;
console.log(r.test(s)); // true
r.lastIndex = 4;
console.log(r.test(s)); // false

// 注意，带有g修饰符时，正则表达式内部会记住上一次的lastIndex属性，
// 这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误
var r = /bb/g;
console.log(r.test("bb")); // true
console.log(r.test("-bb-")); // false

// lastIndex属性只对同一个正则表达式有效，所以下面这样写是错误的
var count = 0;
var t = "babaa";
var r = /a/g;
// while (/a/g.test("babaa")) count++;
console.log(count);
// 上面代码会导致无限循环，因为while循环的每次匹配条件都是一个新的正则表达式，导致lastIndex属性总是等于0
while (r.test(t)) count++;
console.log(count); // 3

// 如果正则模式是一个空字符串，则匹配所有字符串。
console.log(new RegExp("").test("bac")); // true

// 正则实例对象的exec()方法，用来返回匹配结果。
// 如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回null
var s = "_x_x";
var r1 = /x/;
var r2 = /y/;
console.log(r1.exec(s)); // [ 'x', index: 1, input: '_x_x', groups: undefined ]
console.log(r2.exec(s)); // null

// 如果正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，
// 后面的成员就是圆括号对应的匹配成功的组。
// 也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。
// 整个数组的length属性等于组匹配的数量再加1
var s = "_x_x";
var r = /_(x)/;
console.log(r.exec(s)); // [ '_x', 'x', index: 0, input: '_x_x', groups: undefined ]

// exec()方法的返回数组还包含以下两个属性：
/*
input：整个原字符串。
index：模式匹配成功的开始位置（从0开始计数）。
*/
var r = /a(b+)a/;
var arr = r.exec("_abbba_aba_");
console.log(arr); // [ 'abbba', 'bbb', index: 1, input: '_abbba_aba_', groups: undefined ]
console.log(arr.index);
console.log(arr.input);

// 如果正则表达式加上g修饰符，则可以使用多次exec()方法，下一次搜索的位置从上一次匹配成功结束的位置开始。
var reg = /a/g;
var str = "abc_abc_abc";
var r1 = reg.exec(str);
console.log(r1); // [ 'a', index: 0, input: 'abc_abc_abc', groups: undefined ]
console.log(r1.index); // 0
console.log(reg.lastIndex); // 1
var r2 = reg.exec(str);
console.log(r2); // [ 'a', index: 4, input: 'abc_abc_abc', groups: undefined ]
console.log(r2.index); // 4
console.log(reg.lastIndex); // 5
var r3 = reg.exec(str);
console.log(r3); // [ 'a', index: 8, input: 'abc_abc_abc', groups: undefined ]
console.log(r3.index); // 8
console.log(reg.lastIndex); // 9
var r4 = reg.exec(str);
console.log(r4); // null
console.log(reg.lastIndex); // 0

// 利用g修饰符允许多次匹配的特点，可以用一个循环完成全部匹配。
var reg = /a/g;
var str = "abc_abc_abc";

while (true) {
  var match = reg.exec(str);
  if (!match) break;
  console.log("#" + match.index + ":" + match[0]);
}
/*
#0:a
#4:a
#8:a
*/
// 上面代码中，只要exec()方法不返回null，就会一直循环下去，每次输出匹配的位置和匹配的文本。
// 正则实例对象的lastIndex属性不仅可读，还可写。
// 设置了g修饰符的时候，只要手动设置了lastIndex的值，就会从指定位置开始匹配
