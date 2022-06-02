// 1. 概述
// document节点对象代表整个文档，每张网页都有自己的document对象
// window.document属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用

// document对象有不同的办法可以获取
/*
正常的网页，直接使用document或window.document。
iframe框架里面的网页，使用iframe节点的contentDocument属性。
Ajax 操作返回的文档，使用XMLHttpRequest对象的responseXML属性。
内部节点的ownerDocument属性。
*/

// document对象继承了EventTarget接口和Node接口，并且混入（mixin）了ParentNode接口。
// 这意味着，这些接口的方法都可以在document对象上调用。除此之外，document对象还有很多自己的属性和方法。

// 2. 属性
// 2.1 快捷方式属性
//（1）document.defaultView
// document.defaultView属性返回document对象所属的window对象。如果当前文档不属于window对象，该属性返回null。
document.defaultView === window; // true

// (2）document.doctype
// 对于 HTML 文档来说，document对象一般有两个子节点。
// 第一个子节点是document.doctype，指向<DOCTYPE>节点，即文档类型（Document Type Declaration，简写DTD）节点。
// HTML 的文档类型节点，一般写成<!DOCTYPE html>。如果网页没有声明 DTD，该属性返回null。
var doctype = document.doctype;
doctype; // <!DOCTYPE html>
doctype.name; // html
// document.firstChild通常就返回这个节点

// (3）document.documentElement
// document.documentElement属性返回当前文档的根元素节点（root）
// 它通常是document节点的第二个子节点，紧跟在document.doctype节点后面。HTML网页的该属性，一般是<html>节点。

// (4）document.body，document.head
// document.body属性指向<body>节点，document.head属性指向<head>节点。
// 这两个属性总是存在的，如果网页源码里面省略了<head>或<body>，浏览器会自动创建。
// 另外，这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。

// (5）document.scrollingElement
// document.scrollingElement属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动

// 标准模式下，这个属性返回的文档的根元素document.documentElement（即<html>）。
// 兼容（quirk）模式下，返回的是<body>元素，如果该元素不存在，返回null

// 页面滚动到浏览器顶部
document.scrollingElement.scrollTop = 0;

// (6）document.activeElement
// document.activeElement属性返回获得当前焦点（focus）的 DOM 元素。
// 通常，这个属性返回的是<input>、<textarea>、<select>等表单元素，如果当前没有焦点元素，返回<body>元素或null

// (7）document.fullscreenElement
// document.fullscreenElement属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回null。
if (document.fullscreenElement.nodeName == "VIDEO") {
  console.log("全屏播放视频");
}
// 上面代码中，通过document.fullscreenElement可以知道<video>元素有没有处在全屏状态，从而判断用户行为

// 2.2 节点集合属性
// 以下属性返回一个HTMLCollection实例，表示文档内部特定元素的集合。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中
// (1) document.links
// document.links属性返回当前文档所有设定了href属性的<a>及<area>节点
// 打印文档所有的链接
var links = document.links;
for (var i = 0; i < links.length; i++) {
  console.log(links[i]);
}

// (2）document.forms
// document.forms属性返回所有<form>表单节点
var selectForm = document.forms[0];
// 上面代码获取文档第一个表单。

// 除了使用位置序号，id属性和name属性也可以用来引用表单
/* HTML 代码如下
  <form name="foo" id="bar"></form>
*/
document.forms[0] === document.forms.foo; // true
document.forms.bar === document.forms.foo; // true

// (3）document.images
// document.images属性返回页面所有<img>图片节点
var imglist = document.images;

for (var i = 0; i < imglist.length; i++) {
  if (imglist[i].src === "banner.gif") {
  }
}
// 上面代码在所有img标签中，寻找某张图片

// (4) document.embeds，document.plugins
// document.embeds属性和document.plugins属性，都返回所有<embed>节点。

// (5) document.scripts
// document.scripts 属性返回所有 <script> 节点。
var scripts = document.scripts;
if (scripts.length != 0) {
  console.log("当前网页有脚本");
}

// (6）document.styleSheets
// document.styleSheets属性返回网页内嵌或引入的 CSS 样式表集合

// (7）小结
// 除了document.styleSheets属性，以上的其他集合属性返回的都是HTMLCollection实例。
// document.styleSheets属性返回的是StyleSheetList实例。

document.links instanceof HTMLCollection; // true
document.images instanceof HTMLCollection; // true
document.forms instanceof HTMLCollection; // true
document.embeds instanceof HTMLCollection; // true
document.scripts instanceof HTMLCollection; // true

// HTMLCollection实例是类似数组的对象，所以上面这些属性都有length属性，都可以使用方括号运算符引用成员。
// 如果成员有id或name属性，还可以用这两个属性的值，在HTMLCollection实例上引用到这个成员。
// HTML 代码如下
// <form name="myForm">
document.myForm === document.forms.myForm;

// 2.3 文档静态信息属性
// (1) document.documentURI，document.URL
// document.documentURI属性和document.URL属性都返回一个字符串，表示当前文档的网址
// 不同之处是它们继承自不同的接口，documentURI继承自Document接口，可用于所有文档；
// URL继承自HTMLDocument接口，只能用于 HTML 文档。
document.URL; // http://www.example.com/about
document.documentURI === document.URL; // true
// 如果文档的锚点（#anchor）变化，这两个属性都会跟着变化

//（2）document.domain
// document.domain属性返回当前文档的域名，不包含协议和端口。比如，网页的网址是http://www.example.com:80/hello.html，
// 那么document.domain属性就等于www.example.com。如果无法获取域名，该属性返回null。

// document.domain基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把document.domain设为对应的上级域名。
// 比如，当前域名是a.sub.example.com，则document.domain属性可以设置为sub.example.com，也可以设为example.com。
// 修改后，document.domain相同的两个网页，可以读取对方的资源，比如设置的 Cookie。

// 另外，设置document.domain会导致端口被改成null。
// 因此，如果通过设置document.domain来进行通信，双方网页都必须设置这个值，才能保证端口相同。

//（3）document.location
// Location对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。
// 通过window.location和document.location属性，可以拿到这个对象。

//（4）document.lastModified
// document.lastModified属性返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的

document.lastModified; // '06/02/2022 16:36:55'

// 注意，document.lastModified属性的值是字符串，所以不能直接用来比较。Date.parse方法将其转为Date实例，才能比较两个网页
var lastVisitedDate = Date.parse("01/01/2022");
if (Date.parse(document.lastModified) > lastVisitedDate) {
  console.log("网页已经变更");
}

//（5）document.title
// document.title属性返回当前文档的标题。默认情况下，返回<title>节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值。
document.title = "新标题";
document.title; // 新标题

//（6）document.characterSet
// document.characterSet属性返回当前文档的编码，比如UTF-8、ISO-8859-1等等。

//（7）document.referrer
// document.referrer属性返回一个字符串，表示当前文档的访问者来自哪里
document.referrer;
// "https://example.com/path"

// 如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，document.referrer返回一个空字符串

// document.referrer的值，总是与 HTTP 头信息的Referer字段保持一致。
// 但是，document.referrer的拼写有两个r，而头信息的Referer字段只有一个r。

//（8）document.dir
// document.dir返回一个字符串，表示文字方向。它只有两个可能的值：
// rtl表示文字从右到左，阿拉伯文是这种方式；
// ltr表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。

//（9）document.compatMode
// compatMode属性返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）。

// 一般来说，如果网页代码的第一行设置了明确的DOCTYPE（比如<!doctype html>），document.compatMode的值都为CSS1Compat。

// 2.4 文档状态属性
// （1）document.hidden
// document.hidden属性返回一个布尔值，表示当前页面是否可见。
// 如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得document.hidden返回true。

//（2）document.visibilityState
// document.visibilityState返回文档的可见状态。

// 它的值有四种可能。
/*
visible：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
hidden：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
prerender：页面处于正在渲染状态，对于用户来说，该页面不可见。
unloaded：页面从内存里面卸载了。
*/
// 这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。

//（3）document.readyState
// document.readyState属性返回当前文档的状态，共有三种可能的值。
/*
loading：加载 HTML 代码阶段（尚未完成解析）
interactive：加载外部资源阶段
complete：加载完成
*/
// 这个属性变化的过程如下
/*
浏览器开始解析 HTML 文档，document.readyState属性等于loading。
浏览器遇到 HTML 文档中的<script>元素，并且没有async或defer属性，就暂停解析，开始执行脚本，这时document.readyState属性还是等于loading。
HTML 文档解析完成，document.readyState属性变成interactive。
浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，document.readyState属性变成complete。
*/
// 基本检查
if (document.readyState === "complete") {
  // ...
}

// 轮询检查
var interval = setInterval(function () {
  if (document.readyState === "complete") {
    clearInterval(interval);
    // ...
  }
}, 100);
// 另外，每次状态变化都会触发一个readystatechange事件。

// 2.5 document.cookie
// document.cookie属性用来操作浏览器 Cookie

// 2.6 document.designMode
// document.designMode属性控制当前文档是否可编辑。
// 该属性只有两个值on和off，默认值为off。一旦设为on，用户就可以编辑整个文档的内容

// 下面代码打开iframe元素内部文档的designMode属性，就能将其变为一个所见即所得的编辑器。
// HTML 代码如下
// <iframe id="editor" src="about:blank"></iframe>
var editor = document.getElementById("editor");
editor.contentDocument.designMode = "on";

// 2.7 document.currentScript
// document.currentScript属性只用在<script>元素的内嵌脚本或加载的外部脚本之中，
// 返回当前脚本所在的那个 DOM 节点，即<script>元素的 DOM 节点
/* <script id="foo">
  console.log( document.currentScript === document.getElementById('foo') ); 
  // true
</script>; */
// 上面代码中，document.currentScript就是<script>元素节点。

// 2.8 document.implementation
// document.implementation属性返回一个DOMImplementation对象
// 该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象
/*
DOMImplementation.createDocument()：创建一个 XML 文档。
DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。
DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。
*/

// 下面是创建 HTML 文档的例子
var doc = document.implementation.createHTMLDocument("Title");
var p = doc.createElement("p");
p.innerHTML = "hello wolrd";
doc.body.appendChild(p);

document.replaceChild(doc.documentElement, document.documentElement);

// 上面代码中，第一步生成一个新的 HTML 文档doc，
// 然后用它的根元素doc.documentElement替换掉document.documentElement。
// 这会使得当前文档的内容全部消失，变成hello world

// 3. 方法
// 3.1 document.open()，document.close()
// document.open方法清除当前文档所有内容，使得文档处于可写状态，供document.write方法写入内容。
// document.close方法用来关闭document.open()打开的文档

// 3.2 document.write()，document.writeln()
// document.write方法用于向当前文档写入内容
// 在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行document.close()），
// document.write写入的内容就会追加在已有内容的后面
// 页面显示“helloworld”
document.open();
document.write("hello");
document.write("world");
document.close();

// 注意，document.write会当作 HTML 代码解析，不会转义
document.write("<p>hello world</p>");
// 上面代码中，document.write会将<p>当作 HTML 标签解释。

// 如果页面已经解析完成（DOMContentLoaded事件发生之后），再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入。
document.addEventListener("DOMContentLoaded", function (event) {
  document.write("<p>Hello World!</p>");
});
// 等同于
document.addEventListener("DOMContentLoaded", function (event) {
  document.open();
  document.write("<p>Hello World!</p>");
  document.close();
});
// 如果在页面渲染过程中调用write方法，并不会自动调用open方法。（可以理解成，open方法已调用，但close方法还未调用。）
<html>
  <body>
    hello
    <script type="text/javascript">document.write("world")</script>
  </body>
</html>;

// document.write是 JavaScript 语言标准化之前就存在的方法，
// 现在完全有更符合标准的方法向文档写入内容（比如对innerHTML属性赋值）。
// 所以，除了某些特殊情况，应该尽量避免使用document.write这个方法。

// document.writeln方法与write方法完全一致，除了会在输出内容的尾部添加换行符。
document.write(1);
document.write(2);
// 12

document.writeln(1);
document.writeln(2);
// 1
// 2
//
// 注意，writeln方法添加的是 ASCII 码的换行符，渲染成 HTML 网页时不起作用，即在网页上显示不出换行。
// 网页上的换行，必须显式写入<br>。

// 3.3 document.querySelector()，document.querySelectorAll()
// document.querySelector方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。
// 如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null
var el1 = document.querySelector(".myclass");
var el2 = document.querySelector("#myParent > [ng-click]");

// document.querySelectorAll方法与querySelector用法类似，区别是返回一个NodeList对象，包含所有匹配给定选择器的节点。
elementList = document.querySelectorAll(".myclass");

// 这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的。
var matches = document.querySelectorAll("div.note, div.alert");
// 上面代码返回class属性是note或alert的div元素。

// 这两个方法都支持复杂的 CSS 选择器。
// 选中 data-foo-bar 属性等于 someval 的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中 myForm 表单中所有不通过验证的元素
document.querySelectorAll("#myForm :invalid");

// 选中div元素，那些 class 含 ignore 的除外
document.querySelectorAll("DIV:not(.ignore)");

// 同时选中 div，a，script 三类元素
document.querySelectorAll("DIV, A, SCRIPT");

// 但是，它们不支持 CSS 伪元素的选择器（比如:first-line和:first-letter）和伪类的选择器（比如:link和:visited），
// 即无法选中伪元素和伪类。

// 如果querySelectorAll方法的参数是字符串*，则会返回文档中的所有元素节点。
// 另外，querySelectorAll的返回结果不是动态集合，不会实时反映元素节点的变化。

// 最后，这两个方法除了定义在document对象上，还定义在元素节点上，即在元素节点上也可以调用。

// 3.4 document.getElementsByTagName()
// document.getElementsByTagName()方法搜索 HTML 标签名，返回符合条件的元素。
// 它的返回值是一个类似数组对象（HTMLCollection实例），可以实时反映 HTML 文档的变化。如果没有任何匹配的元素，就返回一个空集。
var paras = document.getElementsByTagName("p");
paras instanceof HTMLCollection; // true
// 上面代码返回当前文档的所有p元素节点

// HTML 标签名是大小写不敏感的，因此getElementsByTagName()方法的参数也是大小写不敏感的。
// 另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序。

// 如果传入*，就可以返回文档中所有 HTML 元素。
var allElement = document.getElementsByTagName("*");

// 注意，元素节点本身也定义了getElementsByTagName方法，返回该元素的后代元素中符合条件的元素。
// 也就是说，这个方法不仅可以在document对象上调用，也可以在任何元素节点上调用

var firstPara = document.getElementsByTagName("p")[0];
var spans = firstPara.getElementsByTagName("span");
// 上面代码选中第一个p元素内部的所有span元素。

// 3.5 document.getElementsByClassName()
// document.getElementsByClassName()方法返回一个类似数组的对象（HTMLCollection实例），
// 包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中。
var elements = document.getElementsByClassName(names);

// 由于class是保留字，所以 JavaScript 一律使用className表示 CSS 的class。
// 参数可以是多个class，它们之间使用空格分隔
var elements = document.getElementsByClassName("foo bar");
// 上面代码返回同时具有foo和bar两个class的元素，foo和bar的顺序不重要。

// 注意，正常模式下，CSS 的class是大小写敏感的。（quirks mode下，大小写不敏感。）

// 与getElementsByTagName()方法一样，getElementsByClassName()方法不仅可以在document对象上调用，也可以在任何元素节点上调用。

// 非document对象上调用
var elements = rootElement.getElementsByClassName(names);
