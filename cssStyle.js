// 1. HTML 元素的 style 属性
// 操作 CSS 样式最简单的方法，就是使用网页元素节点的getAttribute()方法、setAttribute()方法和removeAttribute()方法，
// 直接读写或删除网页元素的style属性。
div.setAttribute("style", "background-color:red;" + "border:1px solid black");
// 上面的代码相当于下面的 HTML 代码
<div style="background-color:red; border:1px solid black;" />;

// style不仅可以使用字符串读写，它本身还是一个对象，部署了 CSSStyleDeclaration 接口（详见下面的介绍），可以直接读写个别属性
e.style.fontSize = "18px";
e.style.color = "black";

// 2. CSSStyleDeclaration 接口
// 2.1 简介
// CSSStyleDeclaration 接口用来操作元素的样式。三个地方部署了这个接口。
/*
元素节点的style属性（Element.style）
CSSStyle实例的style属性
window.getComputedStyle()的返回值
*/
// CSSStyleDeclaration 接口可以直接读写 CSS 的样式属性，不过，连词号需要变成骆驼拼写法。
var divStyle = document.querySelector("div").style;
divStyle.backgroundColor = "red";
divStyle.border = "1px solid black";
divStyle.width = "100px";
divStyle.height = "100px";
divStyle.fontSize = "10em";

divStyle.backgroundColor; // red
divStyle.border; // 1px solid black
divStyle.width; // 100px
divStyle.height; // 100px
// 上面代码中，style属性的值是一个 CSSStyleDeclaration 实例。这个对象所包含的属性与 CSS 规则一一对应，
// 但是名字需要改写，比如background-color写成backgroundColor
// 改写的规则是将横杠从 CSS 属性名中去除，然后将横杠后的第一个字母大写。如果 CSS 属性名是 JavaScript 保留字，
// 则规则名之前需要加上字符串css，比如float写成cssFloat。
// 注意，该对象的属性值都是字符串，设置时必须包括单位，但是不含规则结尾的分号。比如，divStyle.width不能写为100，而要写为100px
// 另外，Element.style返回的只是行内样式，并不是该元素的全部样式。通过样式表设置的样式，或者从父元素继承的样式，无法通过这个属性得到。
// 元素的全部样式要通过window.getComputedStyle()得到

// 2.2 CSSStyleDeclaration 实例属性
// (1) CSSStyleDeclaration.cssText
// CSSStyleDeclaration.cssText属性用来读写当前规则的所有样式声明文本
var divStyle = document.querySelector("div").style;

divStyle.cssText =
  "background-color: red;" +
  "border: 1px solid black;" +
  "height: 100px;" +
  "width: 100px;";
// 注意，cssText的属性值不用改写 CSS 属性名

// 删除一个元素的所有行内样式，最简便的方法就是设置cssText为空字符串。
divStyle.cssText = "";

// (2) CSSStyleDeclaration.length
// CSSStyleDeclaration.length 属性返回一个整数值，表示当前规则包含多少条样式声明。
// HTML 代码如下
// <div id="myDiv"
//   style="height: 1px;width: 100%;background-color: #CA1;"
// ></div>
var myDiv = document.getElementById("myDiv");
var divStyle = myDiv.style;
divStyle.length; // 3

// (3) CSSStyleDeclaration.parentRule
// CSSStyleDeclaration.parentRule属性返回当前规则所属的那个样式块（CSSRule 实例）。
// 如果不存在所属的样式块，该属性返回null。

// 该属性只读，且只在使用 CSSRule 接口时有意义。
var declaration = document.styleSheets[0].rules[0].style;
declaration.parentRule === document.styleSheets[0].rules[0]; // true

// 2.3 CSSStyleDeclaration 实例方法
// (1) CSSStyleDeclaration.getPropertyPriority()
// CSSStyleDeclaration.getPropertyPriority方法接受 CSS 样式的属性名作为参数，返回一个字符串，
// 表示有没有设置important优先级。如果有就返回important，否则返回空字符串。

// HTML 代码为
// <div id="myDiv" style="margin: 10px!important; color: red;"/>
var style = document.getElementById("myDiv").style;
style.margin; // 10px
style.getPropertyPriority("margin"); // "important"
style.getPropertyPriority("color"); // ""

// (2) CSSStyleDeclaration.getPropertyValue()
// CSSStyleDeclaration.getPropertyValue方法接受 CSS 样式属性名作为参数，返回一个字符串，表示该属性的属性值。
// HTML 代码为
// <div id="myDiv" style="margin: 10px!important; color: red;"/>
var style = document.getElementById("myDiv").style;
style.margin; // 10px
style.getPropertyValue("margin"); // 10px

// (3) CSSStyleDeclaration.item()
// CSSStyleDeclaration.item方法接受一个整数值作为参数，返回该位置的 CSS 属性名
// HTML 代码为
// <div id="myDiv" style="color: red; background-color: white;"/>
var style = document.getElementById("myDiv").style;
style.item(0); // color
style.item(1); // background-color
// 如果没有提供参数，这个方法会报错。如果参数值超过实际的属性数目，这个方法返回一个空字符值。

// (4) CSSStyleDeclaration.removeProperty()
// CSSStyleDeclaration.removeProperty方法接受一个属性名作为参数，在 CSS 规则里面移除这个属性，返回这个属性原来的值。
// HTML 代码为
// <div id="myDiv" style="color: red; background-color: white;">
//   111
// </div>
var style = document.getElementById("myDiv").style;
style.removeProperty("color"); // red
// HTML 代码变为
// <div id="myDiv" style="background-color: white;">

// (5) CSSStyleDeclaration.setProperty()
// CSSStyleDeclaration.setProperty方法用来设置新的 CSS 属性。该方法没有返回值。
/*
该方法可以接受三个参数。

第一个参数：属性名，该参数是必需的。
第二个参数：属性值，该参数可选。如果省略，则参数值默认为空字符串。
第三个参数：优先级，该参数可选。如果设置，唯一的合法值是important，表示 CSS 规则里面的!important。
*/
// HTML 代码为
// <div id="myDiv" style="color: red; background-color: white;">
//   111
// </div>
var style = document.getElementById("myDiv").style;
style.setProperty("border", "1px solid blue");

// 3. CSS 模块的侦测
// 有时候，需要知道当前浏览器是否支持某个模块，这就叫做“CSS模块的侦测”

// 一个比较普遍适用的方法是，判断元素的style对象的某个属性值是否为字符串。
typeof element.style.animationName === "string";
typeof element.style.transfotm === "string";
// 如果该 CSS 属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。
// 如果该属性不存在，则会返回undefined
document.body.style["maxWidth"]; // ""
document.body.style["maximumWidth"]; // undefined
// 上面代码说明，这个浏览器支持max-width属性，但是不支持maximum-width属性。

// 注意，不管 CSS 属性名的写法带不带连词线，style属性上都能反映出该属性是否存在。
document.body.style["backgroundColor"]; // ""
document.body.style["background-color"]; // ""

// 另外，使用的时候，需要把不同浏览器的 CSS 前缀也考虑进去.
var content = document.getElementById("content");
typeof content.style["webkitAnimation"] === "string";

// 这种侦测方法可以写成一个函数。
function isPropertySupported(property) {
  if (property in document.body.style) return true;
  var prefixes = ["Moz", "Webkit", "O", "ms", "Khtml"];
  var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + prefProperty in document.body.style) return true;
  }

  return false;
}

isPropertySupported("background-clip"); // true

// 4. CSS 对象
// 浏览器原生提供 CSS 对象，为 JavaScript 操作 CSS 提供一些工具方法。
// 这个对象目前有两个静态方法。

// 4.1 CSS.escape()
// CSS.escape方法用于转义 CSS 选择器里面的特殊字符
<div id="foo#bar"></div>;
// 上面代码中，该元素的id属性包含一个#号，该字符在 CSS 选择器里面有特殊含义。不能直接写
// 成document.querySelector('#foo#bar')，只能写成document.querySelector('#foo\\#bar')。
// 这里必须使用双斜杠的原因是，单引号字符串本身会转义一次斜杠。

// CSS.escape方法就用来转义那些特殊字符。
document.querySelector("#" + CSS.escape("foo#bar"));

// 4.2 CSS.supports()
// CSS.supports方法返回一个布尔值，表示当前环境是否支持某一句 CSS 规则。
// 它的参数有两种写法，一种是第一个参数是属性名，第二个参数是属性值；另一种是整个参数就是一行完整的 CSS 语句。
// 第一种写法
CSS.supports("transform-origin", "5px"); // true
// 第二种写法
CSS.supports("display: table-cell"); // true

// 注意，第二种写法的参数结尾不能带有分号，否则结果不准确。
CSS.supports("display: table-cell;"); // false

// 5. window.getComputedStyle()
// 行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。
// 但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，
// 只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则。

// window.getComputedStyle方法，就用来返回浏览器计算后得到的最终规则。
// 它接受一个节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息。
// 所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果

var div = document.querySelector("div");
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor;
// 上面代码中，得到的背景色就是div元素真正的背景色。

// 注意，CSSStyleDeclaration 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的。

// getComputedStyle方法还可以接受第二个参数，表示当前元素的伪元素（比如:before、:after、:first-line、:first-letter等）。
var result = window.getComputedStyle(div, ":before");

// 下面的例子是如何获取元素的高度。
var elem = document.getElementById("elem-container");
var syleObj = window.getComputedStyle(elem, null);
var height = styleObj.height;
// 等同于
var height = syleObj["height"];
var height = styleObj.getPropertyValue("height");
// 上面代码得到的height属性，是浏览器最终渲染出来的高度，比其他方法得到的高度更可靠。
// 由于styleObj是 CSSStyleDeclaration 实例，所以可以使用各种 CSSStyleDeclaration 的实例属性和方法

// 有几点需要注意。
/*
- CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。
  比如，长度都是像素单位（返回值包括px后缀），颜色是rgb(#, #, #)或rgba(#, #, #, #)格式。
- CSS 规则的简写形式无效。比如，想读取margin属性的值，不能直接读，只能读marginLeft、marginTop等属性；
  再比如，font属性也是不能直接读的，只能读font-size等单个属性。
- 如果读取 CSS 原始的属性名，要用方括号运算符，比如styleObj['z-index']；
  如果读取骆驼拼写法的 CSS 属性名，可以直接读取styleObj.zIndex。
- 该方法返回的 CSSStyleDeclaration 实例的cssText属性无效，返回undefined。
*/

// 6. CSS 伪元素
// CSS 伪元素是通过 CSS 向 DOM 添加的元素，主要是通过:before和:after选择器生成，然后用content属性指定伪元素的内容。
<div id="test">Test content</div>;
// CSS 添加伪元素:before的写法如下。
/*
#test:before {
  content: 'Before ';
  color: '#FF0';
}
*/
// 节点元素的style对象无法读写伪元素的样式，这时就要用到window.getComputedStyle()。JavaScript 获取伪元素，可以使用下面的方法。
var test = document.querySelector("#test");
var result = window.getComputedStyle(test, ":before").content;
var color = window.getComputedStyle(test, ":before").color;
// 此外，也可以使用 CSSStyleDeclaration 实例的getPropertyValue方法，获取伪元素的属性。
var result = window
  .getComputedStyle(test, ":before")
  .getPropertyValue("content");
var color = window.getComputedStyle(test, ":before").getPropertyValue("color");

// 7. StyleSheet 接口
// 7.1 概述
// StyleSheet接口代表网页的一张样式表，包括<link>元素加载的样式表和<style>元素内嵌的样式表

// document对象的styleSheets属性，可以返回当前页面的所有StyleSheet实例（即所有样式表）。它是一个类似数组的对象。
var sheets = document.styleSheets;
var sheet = document.styleSheets[0];
sheet instanceof StyleSheet; // true

// 如果是<style>元素嵌入的样式表，还有另一种获取StyleSheet实例的方法，就是这个节点元素的sheet属性。
// HTML 代码为 <style id="myStyle"></style>
var myStyleSheet = document.getElementById("myStyle").sheets;
myStyleSheet instanceof StyleSheet; // true

// 严格地说，StyleSheet接口不仅包括网页样式表，还包括 XML 文档的样式表。
// 所以，它有一个子类CSSStyleSheet表示网页的 CSS 样式表。我们在网页里面拿到的样式表实例，实际上是CSSStyleSheet的实例。
// 这个子接口继承了StyleSheet的所有属性和方法，并且定义了几个自己的属性，下面把这两个接口放在一起介绍。

// 7.2 实例属性
// StyleSheet实例有以下属性。
// (1) StyleSheet.disabled
// StyleSheet.disabled返回一个布尔值，表示该样式表是否处于禁用状态。手动设置disabled属性为true，等同于在<link>元素里面，
// 将这张样式表设为alternate stylesheet，即该样式表将不会生效。

// 注意，disabled属性只能在 JavaScript 脚本中设置，不能在 HTML 语句中设置。

// (2) Stylesheet.href
// Stylesheet.href返回样式表的网址。对于内嵌样式表，该属性返回null。该属性只读
document.styleSheets[0].href;

// (3) StyleSheet.media
// StyleSheet.media属性返回一个类似数组的对象（MediaList实例），成员是表示适用媒介的字符串。
// 表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。
// 该属性只读，默认值是screen.
document.styleSheets[0].media.mediaText; // 'all'

// MediaList实例的appendMedium方法，用于增加媒介；deleteMedium方法用于删除媒介。
document.styleSheets[0].media.appendMedium("handheld");
document.styleSheets[0].media.deleteMedium("print");

// (4) StyleSheet.title
// StyleSheet.title属性返回样式表的title属性。

// (5) StyleSheet.type
// StyleSheet.type属性返回样式表的type属性，通常是text/css。
document.styleSheets[0].type; // text/css

// (6) StyleSheet.parentStyleSheet
// CSS 的@import命令允许在样式表中加载其他样式表。StyleSheet.parentStyleSheet属性返回包含了当前样式表的那张样式表。
// 如果当前样式表是顶层样式表，则该属性返回null。
if (stylesheet.parentStyleSheet) {
  sheet = stylesheet.parentStyleSheet;
} else {
  sheet = stylesheet;
}

// (7) StyleSheet.ownerNode
// StyleSheet.ownerNode属性返回StyleSheet对象所在的 DOM 节点，通常是<link>或<style>。
// 对于那些由其他样式表引用的样式表，该属性为null。
// HTML代码为
// <link rel="StyleSheet" href="example.css" type="text/css" />
document.styleSheets[0].ownerNode; // [object HTMLLinkElement]

// (8) CSSStyleSheet.cssRules
// CSSStyleSheet.cssRules属性指向一个类似数组的对象（CSSRuleList实例），里面每一个成员就是当前样式表的一条 CSS 规则。
// 使用该规则的cssText属性，可以得到 CSS 规则对应的字符串
var sheet = document.querySelector("#styleElement").sheet;
sheet.cssRules[0].cssText; // "body { background-color: red; margin: 20px; }"
sheet.cssRules[1].cssText; // "p { line-height: 1.4em; color: blue; }"

// 每条 CSS 规则还有一个style属性，指向一个对象，用来读写具体的 CSS 命令。
cssStyleSheet.cssRules[0].style.color = "red";
cssStyleSheet.cssRules[1].style.color = "purple";

// (9) CSSStyleSheet.ownerRule
// 有些样式表是通过@import规则输入的，它的ownerRule属性会返回一个CSSRule实例，代表那行@import规则。
// 如果当前样式表不是通过@import引入的，ownerRule属性返回null。

// 7.3 实例方法
// (1) CSSStyleSheet.insertRule()
// CSSStyleSheet.insertRule方法用于在当前样式表的插入一个新的 CSS 规则。
var sheet = document.querySelector("#styleElement").sheet;
sheet.insertRule("#block { color: white }", 0);
sheet.insertRule("p { color: red }", 1);

/*
该方法可以接受两个参数，第一个参数是表示 CSS 规则的字符串，这里只能有一条规则，否则会报错。
第二个参数是该规则在样式表的插入位置（从0开始），该参数可选，默认为0（即默认插在样式表的头部）。
注意，如果插入位置大于现有规则的数目，会报错。

该方法的返回值是新插入规则的位置序号。

注意，浏览器对脚本在样式表里面插入规则有很多限制。所以，这个方法最好放在try...catch里使用。
*/

// (2) CSSStyleSheet.deleteRule()
// CSSStyleSheet.deleteRule方法用来在样式表里面移除一条规则，它的参数是该条规则在cssRules对象中的位置。该方法没有返回值。
document.styleSheets[0].deleteRule(1);

// 8. 实例：添加样式表
// 网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个<style>节点。
// 写法一
var style = document.createElement("style");
style.setAttribute("media", "screen");
style.innerHTML = "body{color:red}";
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement("style");
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule(".foo{color:red;}", 0);

// 另一种是添加外部样式表，即在文档中添加一个<link>节点，然后将href属性指向外部样式表的 URL。
var linkElm = document.createElement("link");
linkElm.setAttribute("rel", "stylesheet");
linkElm.setAttribute("type", "text/css");
linkElm.setAttribute("href", "reset-min.css");
document.head.appendChild(linkElm);

// 9. CSSRuleList 接口
// CSSRuleList 接口是一个类似数组的对象，表示一组 CSS 规则，成员都是 CSSRule 实例。

// 获取 CSSRuleList 实例，一般是通过StyleSheet.cssRules属性。
// HTML 代码如下
// <style id="myStyle">
//   h1 { color: red; }
//   p { color: blue; }
// </style>
var myStyleSheet = document.getElementById("myStyle").sheet;
var crl = myStyleSheet.cssRules;
crl instanceof CSSRuleList; // true

// CSSRuleList 实例里面，每一条规则（CSSRule 实例）可以通过rules.item(index)或者rules[index]拿到。
// CSS 规则的条数通过rules.length拿到。还是用上面的例子。
crl[0] instanceof CSSRule; // true
crl.length; // 2

// 注意，添加规则和删除规则不能在 CSSRuleList 实例操作，而要在它的父元素 StyleSheet 实例上，
// 通过StyleSheet.insertRule()和StyleSheet.deleteRule()操作。

// 10. CSSRule 接口
// 10.1 概述
// 一条 CSS 规则包括两个部分：CSS 选择器和样式声明。下面就是一条典型的 CSS 规则。
/*
.myClass {
  color: red;
  background-color: yellow;
}
*/
// JavaScript 通过 CSSRule 接口操作 CSS 规则。一般通过 CSSRuleList 接口（StyleSheet.cssRules）获取 CSSRule 实例。

// HTML 代码如下
// <style id="myStyle">
//   .myClass {
//     color: red;
//     background-color: yellow;
//   }
// </style>
var myStyleSheet = document.getElementById("myStyle").sheet;
var ruleList = myStyleSheet.cssRules;
var rule = ruleList[0];
rule instanceof CSSRule; // true

// 10.2 CSSRule 实例的属性
// (1) CSSRule.cssText
// CSSRule.cssText属性返回当前规则的文本，还是使用上面的例子。
rule.cssText; // ".myClass { color: red; background-color: yellow; }"
// 如果规则是加载（@import）其他样式表，cssText属性返回@import 'url'。

// (2) CSSRule.parentStyleSheet
// CSSRule.parentStyleSheet属性返回当前规则所在的样式表对象（StyleSheet 实例），还是使用上面的例子。
rule.parentStyleSheet === myStyleSheet;

// (3) CSSRule.parentRule
// CSSRule.parentRule属性返回包含当前规则的父规则，如果不存在父规则（即当前规则是顶层规则），则返回null。

// 父规则最常见的情况是，当前规则包含在@media规则代码块之中。
// HTML 代码如下
// <style id="myStyle">
//   @supports (display: flex) {
//     @media screen and (min-width: 900px) {
//       article {
//         display: flex;
//       }
//     }
//  }
// </style>
var myStyleSheet = document.getElementById("myStyle").sheet;
var ruleList = myStyleSheet.cssRules;

var rule0 = ruleList[0];
rule0.cssText;
// "@supports (display: flex) {
//    @media screen and (min-width: 900px) {
//      article { display: flex; }
//    }
// }"

// 由于这条规则内嵌其他规则，
// 所以它有 cssRules 属性，且该属性是 CSSRuleList 实例
rule0.cssRules instanceof CSSRuleList; // true

var rule1 = rule0.cssRules[0];
rule1.cssText;
// "@media screen and (min-width: 900px) {
//   article { display: flex; }
// }"
var rule2 = rule1.cssRules[0];
rule2.cssText;
// "article { display: flex; }"

rule1.parentRule === rule0; // true
rule2.parentRule === rule1; // true

// (4) CSSRule.type
// CSSRule.type属性返回一个整数值，表示当前规则的类型。
/*
最常见的类型有以下几种。

1：普通样式规则（CSSStyleRule 实例）
3：@import规则
4：@media规则（CSSMediaRule 实例）
5：@font-face规则
*/

// 10.3 CSSStyleRule 接口
// 如果一条 CSS 规则是普通的样式规则（不含特殊的 CSS 命令），那么除了 CSSRule 接口，它还部署了 CSSStyleRule 接口。

// CSSStyleRule 接口有以下两个属性。
//（1）CSSStyleRule.selectorText
// CSSStyleRule.selectorText属性返回当前规则的选择器。
var stylesheet = document.styleSheets[0];
stylesheet.cssRules[0].selectorText; // ".myClass"
// 注意，这个属性是可写的.

// (2) CSSStyleRule.style
// CSSStyleRule.style属性返回一个对象（CSSStyleDeclaration 实例），代表当前规则的样式声明，也就是选择器后面的大括号里面的部分。
// HTML 代码为
// <style id="myStyle">
//   p { color: red; }
// </style>
var styleSheet = document.getElementById("myStyle").sheet;
styleSheet.cssRules[0].style instanceof CSSStyleDeclaration; // true

// CSSStyleDeclaration 实例的cssText属性，可以返回所有样式声明，格式为字符串。
styleSheet.cssRules[0].style.cssText; // "color: red;"
styleSheet.cssRules[0].selectorText; // "p"

// 10.4 CSSMediaRule 接口
// 如果一条 CSS 规则是@media代码块，那么它除了 CSSRule 接口，还部署了 CSSMediaRule 接口。

// 该接口主要提供media属性和conditionText属性。前者返回代表@media规则的一个对象（MediaList 实例），
// 后者返回@media规则的生效条件。
// HTML 代码如下
// <style id="myStyle">
//   @media screen and (min-width: 900px) {
//     article { display: flex; }
//   }
// </style>
var styleSheet = document.getElementById("myStyle").sheet;
styleSheet.cssRules[0] instanceof CSSMediaRule; // true
styleSheet.cssRules[0].media;
//  {
//    0: "screen and (min-width: 900px)",
//    appendMedium: function,
//    deleteMedium: function,
//    item: function,
//    length: 1,
//    mediaText: "screen and (min-width: 900px)"
// }
styleSheet.cssRules[0].conditionText;
// "screen and (min-width: 900px)"

// 11. window.matchMedia()
// 11.1 基本用法
// window.matchMedia()方法用来将 CSS 的Media Query条件语句，转换成一个 MediaQueryList 实例。
var mdl = window.matchMedia("(min-width: 400px)");
mdl instanceof MediaQueryList; // true
// 上面代码中，变量mdl就是 mediaQueryList 的实例。

// 注意，如果参数不是有效的MediaQuery条件语句，window.matchMedia不会报错，依然返回一个 MediaQueryList 实例。
window.matchMedia("bad string") instanceof MediaQueryList; // true

// 11.2 MediaQueryList 接口的实例属性
// MediaQueryList 实例有三个属性。
//（1）MediaQueryList.media
// MediaQueryList.media属性返回一个字符串，表示对应的 MediaQuery 条件语句。
var mql = window.matchMedia("(min-width: 400px)");
mql.media; // "(min-width: 400px)"

// (2) MediaQueryList.matches
// MediaQueryList.matches属性返回一个布尔值，表示当前页面是否符合指定的 MediaQuery 条件语句。
if (window.matchMedia("(min-width; 400px)").matches) {
  /* 当前视口不小于 400 像素 */
} else {
  /* 当前视口小于 400 像素 */
}

// 下面的例子根据mediaQuery是否匹配当前环境，加载相应的 CSS 样式表。
var result = window.matchMedia("(min-width: 700px)");

if (result.matches) {
  var linkElm = document.createElement("link");
  linkElm.setAttribute("rel", "stylesheet");
  linkElm.setAttribute("type", "text/css");
  linkElm.setAttribute("href", "small.css");

  document.head.appendChild(linkElm);
}

// (3) MediaQueryList.onchange
// 如果 MediaQuery 条件语句的适配环境发生变化，会触发change事件。
// MediaQueryList.onchange属性用来指定change事件的监听函数。该函数的参数是change事件对象（MediaQueryListEvent 实例），
// 该对象与 MediaQueryList 实例类似，也有media和matches属性。
var mql = window.matchMedia("(max-width: 600px)");

mql.onchange = function (e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
};
// 上面代码中，change事件发生后，存在两种可能。一种是显示宽度从600像素以上变为以下，另一种是从600像素以下变为以上，
// 所以在监听函数内部要判断一下当前是哪一种情况。

// 11.3 MediaQueryList 接口的实例方法
// MediaQueryList 实例有两个方法MediaQueryList.addListener()和MediaQueryList.removeListener()，
// 用来为change事件添加或撤销监听函数。
var mql = window.matchMedia("(max-width: 600px)");

// 指定监听函数
mql.addEventListener(mqCallback);

// 撤销监听函数
mql.removeListener(mqCallback);

function mqCallback(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
// 注意，MediaQueryList.removeListener()方法不能撤销MediaQueryList.onchange属性指定的监听函数。
