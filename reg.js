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

// 字符串的实例方法之中，有4种与正则表达式有关
/*
String.prototype.match()：返回一个数组，成员是所有匹配的子字符串。
String.prototype.search()：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置。
String.prototype.replace()：按照给定的正则表达式进行替换，返回替换后的字符串。
String.prototype.split()：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员
*/
var s = "_x_x";
var r11 = /x/;
var r22 = /y/;
console.log(s.match(r11)); // [ 'x', index: 1, input: '_x_x', groups: undefined ]
console.log(s.match(r22)); // null
// 字符串的match方法与正则对象的exec方法非常类似：匹配成功返回一个数组，匹配失败返回null

// 如果正则表达式带有g修饰符，则该方法与正则对象的exec方法行为不同，会一次性返回所有匹配成功的结果。
var s = "abba";
var r33 = /a/g;
console.log(s.match(r33)); // [ 'a', 'a' ]
console.log(r33.exec(s)); // [ 'a', index: 0, input: 'abba', groups: undefined ]

// 设置正则表达式的lastIndex属性，对match方法无效，匹配总是从字符串的第一个字符开始。
var r44 = /a|b/g;
r44.lastIndex = 7;
console.log("xaxb".match(r44)); // [ 'a', 'b' ]
console.log(r.lastIndex); // 0

// 字符串对象的search方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回-1。
console.log("_x_x".search(/x/)); // 1

// 字符串对象的replace方法可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容。
// 正则表达式如果不加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值
console.log("aaa".replace("a", "b")); // baa
console.log("aaa".replace(/a/, "b")); // baa
console.log("aaa".replace(/a/g, "b")); // bbb

// replace方法的一个应用，就是消除字符串首尾两端的空格。
var str = "  #id div.class   ";
console.log(str.replace(/^\s+|\s+$/g, "")); // #id div.class

// replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容
/*
$&：匹配的子字符串。
$`：匹配结果前面的文本。
$'：匹配结果后面的文本。
$n：匹配成功的第n组内容，n是从1开始的自然数。
$$：指代美元符号$。
*/
console.log("hello world".replace(/(\w+)\s(\w+)/, "$2 $1")); // world hello
console.log("abc".replace("b", "[$`-$&-$']")); // a[a-b-c]c

// replace方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值
console.log(
  "3 and 5".replace(/[0-9]+/g, function (match) {
    return 2 * match;
  })
); // 6 and 10
var a = "The quick brown fox jumped over the lazy dog.";
var pattern = /quick|Brown|lazy/gi;
console.log(
  a.replace(pattern, function replacer(match) {
    return match.toUpperCase();
  })
); // The QUICK BROWN fox jumped over the LAZY dog.

// 作为replace方法第二个参数的替换函数，可以接受多个参数。
// 其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。
// 此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），
// 最后一个参数是原字符串
var prices = {
  p1: "$1.99",
  p2: "$9.99",
  p3: "$5.00",
};

var template =
  '<span id="p1"></span>' + '<span id="p2"></span>' + '<span id="p3"></span>';
console.log(
  template.replace(
    /(<span id=")(.*?)(">)(<\/span>)/g,
    function (match, $1, $2, $3, $4) {
      return $1 + $2 + $3 + prices[$2] + $4;
    }
  )
);
// <span id="p1">$1.99</span><span id="p2">$9.99</span><span id="p3">$5.00</span>
// 上面代码的捕捉模式中，有四个括号，所以会产生四个组匹配，在匹配函数中用$1到$4表示。匹配函数的作用是将价格插入模板中

// 字符串对象的split方法按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组。
// 该方法接受两个参数，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数。
// 非正则分割
console.log("a, b,c, d".split(",")); // [ 'a', ' b', 'c', ' d' ]
// 正则分割， 去掉多余的空格
console.log("a, b,c, d".split(/, */)); // [ 'a', 'b', 'c', 'd' ]
// 指定返回数组的最大成员
console.log("a, b,c, d".split(/, */, 2)); // [ 'a', 'b' ]

console.log("aaa*a*".split(/a*/)); // [ '', '*', '*' ]
console.log("aaa**a*".split(/a*/)); // [ '', '*', '*', '*' ]

// 如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回
console.log("aaa*a*".split(/(a*)/)); // [ '', 'aaa', '*', 'a', '*' ]
