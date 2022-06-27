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
