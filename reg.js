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

// 字面量字符和元字符
// metacharacters
// 1.点字符(.)
// 点字符（.）匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符。
// 注意，对于码点大于0xFFFF字符，点字符不能正确匹配，会认为这是两个字符。
/c.t/;
// c.t匹配c和t之间包含任意一个字符的情况。 只要三个字符在同一行，就可以匹配，如car、c2t、c-t.但不能匹配四个字符，如coot.

// 2.任意字符
// 位置字符用来提示字符所处的位置，主要有两个字符。
// ^ 表示字符串的开始位置
// $ 表示字符串的结束位置
// test必须出现在开始位置
console.log(/^test/.test("test123")); // true
console.log(/^test/.test("new test")); // false
// test必须出现在结束位置
console.log(/test$/.test("new test")); // true
console.log(/test$/.test("test123")); // false
// 从开始位置到结束位置只有test
console.log(/^test$/.test("test")); // true
console.log(/^test$/.test("test123")); // false
console.log(/^test$/.test("new test")); // false

// 3. 选择符(|)
// 竖线符号（|）在正则表达式中表示“或关系”（OR），即cat|dog表示匹配cat或dog
console.log(/11|22/.test("911")); // true
// 多个选择符可以联合使用
console.log(/freg|barney|betty/.test("betty1")); // true
// 选择符会包括它前后的多个字符，比如/ab|cd/指的是匹配ab或者cd，而不是指匹配b或者c。如果想修改这个行为，可以使用圆括号。
console.log(/a( |\t)b/.test("a\tb")); // true
// a和b之间有一个空格或者一个制表符

// 转义符
// 正则表达式中那些有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠。比如要匹配+，就要写成\+
console.log(/1+1/.test("1+1")); // false
console.log(/1\+1/.test("1+1")); // true

// 正则表达式中，需要反斜杠转义的，一共有12个字符：^、.、[、$、(、)、|、*、+、?、{和\
// 需要特别注意的是，如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。
console.log(new RegExp("1+1").test("1+1")); // false
console.log(new RegExp("1+\\+1").test("1+1")); // false

// 特殊字符
// 正则表达式对一些不能打印的特殊字符，提供了表达方法。
/*
\cX 表示Ctrl-[X]，其中的X是A-Z之中任一个英文字母，用来匹配控制字符。
[\b] 匹配退格键(U+0008)，不要与\b混淆。
\n 匹配换行键。
\r 匹配回车键。
\t 匹配制表符 tab（U+0009）。
\v 匹配垂直制表符（U+000B）。
\f 匹配换页符（U+000C）。
\0 匹配null字符（U+0000）。
\xhh 匹配一个以两位十六进制数（\x00-\xFF）表示的字符。
\uhhhh 匹配一个以四位十六进制数（\u0000-\uFFFF）表示的 Unicode 字符。
*/

// 字符类
// 字符类（class）表示有一系列字符可供选择，只要匹配其中一个就可以了。
// 所有可供选择的字符都放在方括号内，比如[xyz] 表示x、y、z之中任选一个匹配。
console.log(/[abc]/.test("hello world")); // false
console.log(/[abc]/.test("apple")); // true
// 1. 脱字符（^）
// 如果方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配。比如，[^xyz]表示除了x、y、z之外都可以匹配。
console.log(/[^abc]/.test("bbc news")); // true
console.log(/[^abc]/.test("bbc")); // false

// 如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符。相比之下，点号作为元字符（.）是不包括换行符的
var s = "Please yes\nmake my day!";
console.log(s.match(/yes.*day/)); // null
console.log(s.match(/yes[^]*day/));
/*
[
  'yes\nmake my day',
  index: 7,
  input: 'Please yes\nmake my day!',
  groups: undefined
]
 */
// 注意，脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义

// 2. 连字符 (-)
// 某些情况下，对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。
// 比如，[abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母。
console.log(/a-z/.test("b")); // false
console.log(/[a-z]/.test("b")); // true
// 当连字号（dash）不出现在方括号之中，就不具备简写的作用，只代表字面的含义，所以不匹配字符b。
// 只有当连字号用在方括号之中，才表示连续的字符序列。
/*
[0-9.,]
[0-9a-fA-F]
[a-zA-Z0-9-]
[1-31]
*/
// 上面代码中最后一个字符类[1-31]，不代表1到31，只代表1到3
// 连字符还可以用来指定 Unicode 字符的范围
var str = "\u0130\u0131\u0132";
console.log(/[\u0128-\uFFFF]/.test(str)); // true

// 预定义模式
// 预定义模式指的是某些常见模式的简写方式
/*
\d 匹配0-9之间的任一数字，相当于[0-9]。
\D 匹配所有0-9以外的字符，相当于[^0-9]。
\w 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。
\W 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。
\s 匹配空格（包括换行符、制表符、空格符等），相等于[ \t\r\n\v\f]。
\S 匹配非空格的字符，相当于[^ \t\r\n\v\f]。
\b 匹配词的边界。
\B 匹配非词边界，即在词的内部。
*/
// \s 的例子
console.log(/\s\w*/.exec("hello world")); // [ ' world', index: 5, input: 'hello world', groups: undefined ]
// \b 的例子
console.log(/\bworld/.test("hello world")); // true
console.log(/\bworld/.test("hello-world")); // true
console.log(/\bworld/.test("helloworld")); // false
// \B 的例子
console.log(/\Bworld/.test("hello world")); // false
console.log(/\Bworld/.test("helloworld")); // true
// 通常，正则表达式遇到换行符（\n）就会停止匹配
var html = "<b>Hello</b>\n<i>world!</i>";
console.log(/.*/.exec(html)[0]); // <b>Hello</b>
// 上面代码中，字符串html包含一个换行符，结果点字符（.）不匹配换行符，导致匹配结果可能不符合原意。
// 这时使用\s字符类，就能包括换行符。
console.log(/[\S\s]*/.exec(html)[0]);
// <b>Hello</b>\n<i>world!</i>
// 上面代码中，[\S\s]指代一切字符

// 重复类
// 模式的精确匹配次数，使用大括号（{}）表示。
// {n}表示恰好重复n次，{n,}表示至少重复n次，{n,m}表示重复不少于n次，不多于m次。
console.log(/lo{2}k/.test("look")); // true
console.log(/lo{2,5}k/.test("looook")); // true

// 量词符
// 量词符用来设定某个模式出现的次数。
/*
? 问号表示某个模式出现0次或1次，等同于{0, 1}。
* 星号表示某个模式出现0次或多次，等同于{0,}。
+ 加号表示某个模式出现1次或多次，等同于{1,}。
*/
// t 出现0次或1次
console.log(/t?est/.test("test")); // true
console.log(/t?est/.test("est")); // true

// t 出现1次或多次
console.log(/t+est/.test("test")); // true
console.log(/t+est/.test("ttest")); // true
console.log(/t+est/.test("est")); // false

// t 出现0次或多次
console.log(/t*est/.test("test")); // true
console.log(/t*est/.test("ttest")); // true
console.log(/t*est/.test("tttest")); // true
console.log(/t*est/.test("est")); // true

// 贪婪模式
// 三个量词符，默认情况下都是最大可能匹配，即匹配到下一个字符不满足匹配规则为止。这被称为贪婪模式
var s = "aaa";
console.log(s.match(/a+/)); // [ 'aaa', index: 0, input: 'aaa', groups: undefined ]
// 上面代码中，模式是/a+/，表示匹配1个a或多个a，那么到底会匹配几个a呢？因为默认是贪婪模式，会一直匹配到字符a不出现为止，所以匹配结果是3个a
// 除了贪婪模式，还有非贪婪模式，即最小可能匹配。只要一发现匹配，就返回结果，不要往下检查。如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号
console.log(s.match(/a+?/)); // [ 'a', index: 0, input: 'aaa', groups: undefined ]
// 上面例子中，模式结尾添加了一个问号/a+?/，这时就改为非贪婪模式，一旦条件满足，就不再往下匹配，+?表示只要发现一个a，就不再往下匹配了。
/*
+?：表示某个模式出现1次或多次，匹配时采用非贪婪模式。
*?：表示某个模式出现0次或多次，匹配时采用非贪婪模式。
??：表格某个模式出现0次或1次，匹配时采用非贪婪模式
*/
console.log("abb".match(/ab*/)); // [ 'abb', index: 0, input: 'aaa', groups: undefined ]
console.log("abb".match(/ab*?/)); // [ 'a', index: 0, input: 'aaa', groups: undefined ]
console.log("abb".match(/ab?/)); // [ 'ab', index: 0, input: 'abb', groups: undefined ]
console.log("abb".match(/ab??/)); // [ 'a', index: 0, input: 'abb', groups: undefined ]
