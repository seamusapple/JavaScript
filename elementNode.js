// 1. 简介
// Element节点对象对应网页的 HTML 元素。每一个 HTML 元素，在 DOM 树上都会转化成一个Element节点对象（以下简称元素节点）。

// 元素节点的nodeType属性都是1
var p = document.querySelector("p");
p.nodeName; // p
p.nodeType; // 1

// Element对象继承了Node接口，因此Node的属性和方法在Element对象都存在
// 此外，不同的 HTML 元素对应的元素节点是不一样的，浏览器使用不同的构造函数，生成不同的元素节点

// 2. 实例属性
// 2.1 元素特性的相关属性

// Element.id属性返回指定元素的id属性，该属性可读写。
// HTML 代码为 <p id="foo">
var p = document.querySelector("p");
p.id; // foo
// id属性的值是大小写敏感，即浏览器能正确识别<p id="foo">和<p id="FOO">这两个元素的id属性，但是最好不要这样命名

// Element.tagName属性返回指定元素的大写标签名，与nodeName属性的值相等。
// HTML代码为
// <span id="myspan">Hello</span>
var span = document.getElementById("myspan");
span.id; // myspan
span.tagName; // SPAN

// Element.dir属性用于读写当前元素的文字方向，可能是从左到右（"ltr"），也可能是从右到左（"rtl"）

// Element.accessKey属性用于读写分配给当前元素的快捷键
// HTML 代码如下
// <button accesskey="h" id="btn">点击</button>
var btn = document.getElementById("btn");
btn.accessKey; // h
// 上面代码中，btn元素的快捷键是h，按下Alt + h就能将焦点转移到它上面

// Element.draggable属性返回一个布尔值，表示当前元素是否可拖动。该属性可读写。

// Element.lang属性返回当前元素的语言设置。该属性可读写。
// HTML 代码如下
// <html lang="en">
document.documentElement.lang; // en

// Element.tabIndex属性返回一个整数，表示当前元素在 Tab 键遍历时的顺序。该属性可读写。
// tabIndex属性值如果是负值（通常是-1），则 Tab 键不会遍历到该元素。如果是正整数，则按照顺序，从小到大遍历。
// 如果两个元素的tabIndex属性的正整数值相同，则按照出现的顺序遍历。遍历完所有tabIndex为正整数的元素以后，
// 再遍历所有tabIndex等于0、或者属性值是非法值、或者没有tabIndex属性的元素，顺序为它们在网页中出现的顺序。

// Element.title属性用来读写当前元素的 HTML 属性title。该属性通常用来指定，鼠标悬浮时弹出的文字提示框

// 2.2 元素状态的相关属性
// Element.hidden属性返回一个布尔值，表示当前 HTML 元素的hidden属性的值。该属性可读写，用来控制当前元素是否可见
var btn = document.getElementById("btn");
var mydiv = document.getElementById("mydiv");

btn.addEventListener(
  "click",
  function () {
    mydiv.hidden = !mydiv.hidden;
  },
  false
);
// 注意，该属性与 CSS 设置是互相独立的。CSS 对当前元素可见性的设置，Element.hidden并不能反映出来。
// 也就是说，这个属性并不能用来判断当前元素的实际可见性

// CSS 设置的优先级高于Element.hidden。如果 CSS 指定了该元素不可见（display: none）或可见（visibility: visible），
// 那么Element.hidden并不能改变该元素实际的可见性。换言之，这个属性只在 CSS 没有明确设定当前元素的可见性时才有效。

// HTML 元素可以设置contentEditable属性，使得元素的内容可以编辑。
<div contenteditable>123</div>;
// 上面代码中，<div>元素有contenteditable属性，因此用户可以在网页上编辑这个区块的内容。

// Element.contentEditable属性返回一个字符串，表示是否设置了contenteditable属性，有三种可能的值。该属性可写
/*
"true"：元素内容可编辑
"false"：元素内容不可编辑
"inherit"：元素是否可编辑，继承了父元素的设置
*/
// Element.isContentEditable属性返回一个布尔值，同样表示是否设置了contenteditable属性。该属性只读

// 2.3 Element.attributes
// Element.attributes属性返回一个类似数组的对象，成员是当前元素节点的所有属性节点
var p = document.querySelector("p");
var attrs = p.attributes;

for (var i = attrs.length - 1; i >= 0; i--) {
  console.log(attrs[i].name + "->" + attrs[i].value);
}
// 上面代码遍历p元素的所有属性

// 2.4 Element.className，Element.classList
// className属性用来读写当前元素节点的class属性。它的值是一个字符串，每个class之间用空格分割
// classList属性返回一个类似数组的对象，当前元素节点的每个class就是这个对象的一个成员

// HTML 代码 <div class="one two three" id="myDiv"></div>
var div = document.getElementById("mydiv");
div.className; // one, two, three
div.classList;
// {
//   0: "one"
//   1: "two"
//   2: "three"
//   length: 3
// }

// 上面代码中，className属性返回一个空格分隔的字符串，而classList属性指向一个类似数组的对象，
// 该对象的length属性（只读）返回当前元素的class数量。

/*
classList对象有下列方法。

add()：增加一个 class。
remove()：移除一个 class。
contains()：检查当前元素是否包含某个 class。
toggle()：将某个 class 移入或移出当前元素。
item()：返回指定索引位置的 class。
toString()：将 class 的列表转为字符串
*/
var div = document.getElementById("mydiv");
div.classList.add("myCssClass");
div.classList.add("foo", "bar");
div.classList.remove("myCssClass");
div.classList.toggle("myCssClass"); // 如果 myCssClass 不存在就加入，否则移除
div.classList.contains("myCssClass"); // 返回 true 或者 false
div.classList.item(0); // 返回第一个 Class
div.classList.toString();

// 下面比较一下，className和classList在添加和删除某个 class 时的写法
var foo = document.getElementById("foo");

// 添加class
foo.className += "bold";
foo.classList.add("bold");

// 删除class
foo.classList.remove("bold");
foo.className = foo.className.replace("/^bold$/", "");

// toggle方法可以接受一个布尔值，作为第二个参数。如果为true，则添加该属性；如果为false，则去除该属性
el.classList.toggle("abc", boolValue);

// 等同于
if (boolValue) {
  el.classList.add("abc");
} else {
  el.classList.remove("abc");
}

// 2.5 Element.dataset
// 网页元素可以自定义data-属性，用来添加数据。
<div data-timestamp="1522907809292"></div>;
// 上面代码中，<div>元素有一个自定义的data-timestamp属性，用来为该元素添加一个时间戳

// Element.dataset属性返回一个对象，可以从这个对象读写data-属性
// <article
//   id="foo"
//   data-columns="3"
//   data-index-number="12314"
//   data-parent="cars">
//   ...
// </article>
var article = document.getElementById("foo");
article.dataset.columns; // 3
article.dataset.indexNumber; // 12314
article.dataset.parent; // cars

// 注意，dataset上面的各个属性返回都是字符串

// HTML 代码中，data-属性的属性名，只能包含英文字母、数字、连词线（-）、点（.）、冒号（:）和下划线（_）。
// 它们转成 JavaScript 对应的dataset属性名，规则如下
/*
开头的data-会省略。
如果连词线后面跟了一个英文字母，那么连词线会取消，该字母变成大写。
其他字符不变。
*/
// 因此，data-abc-def对应dataset.abcDef，data-abc-1对应dataset["abc-1"]

// 除了使用dataset读写data-属性，也可以使用Element.getAttribute()和Element.setAttribute()，通过完整的属性名读写这些属性
var mydiv = document.getElementById("mydiv");
mydiv.dataset.foo = "bar";
mydiv.getAttribute("data-foo"); // bar

// 2.6 Element.innerHTML
// Element.innerHTML属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。
// 它能改写所有元素节点的内容，包括<HTML>和<body>元素。

// 如果将innerHTML属性设为空，等于删除所有它包含的所有节点
el.innerHTML = "";
// 上面代码等于将el节点变成了一个空节点，el原来包含的节点被全部删除

// 注意，读取属性值的时候，如果文本节点包含&、小于号（<）和大于号（>），innerHTML属性会将它们转为实体形式&amp;、&lt;、&gt;。
// 如果想得到原文，建议使用element.textContent属性

// HTML代码如下 <p id="para"> 5 > 3 </p>
document.getElementById("para").innerHTML;
// 5 &gt; 3

// 写入的时候，如果插入的文本包含 HTML 标签，会被解析成为节点对象插入 DOM。注意，如果文本之中含有<script>标签，
// 虽然可以生成script节点，但是插入的代码不会执行
var name = "<script>alert('haah')</script>";
el.innerHTML = name;
// 上面代码将脚本插入内容，脚本并不会执行。但是，innerHTML还是有安全风险的

var name = "<img src=x onerror=alert(1)>";
el.innerHTML = name;
// 上面代码中，alert方法是会执行的。因此为了安全考虑，如果插入的是文本，最好用textContent属性代替innerHTML

// 2.7 Element.outerHTML
// Element.outerHTML属性返回一个字符串，表示当前元素节点的所有 HTML 代码，包括该元素本身和所有子元素

// HTML 代码如下
// <div id="d"><p>Hello</p></div>
var d = document.getElementById("d");
d.outerHTML;
// '<div id="d"><p>Hello</p></div>'

// outerHTML属性是可读写的，对它进行赋值，等于替换掉当前元素
// HTML 代码如下
// <div id="container"><div id="d">Hello</div></div>
var container = document.getElementById("container");
var d = document.getElementById("d");
container.firstChild.nodeName; // DIV
d.nodeName; // DIV

d.outerHTML = "<p>Hello</p>";
container.firstChild.nodeName; // p
d.nodeName; // DIV
// 上面代码中，变量d代表子节点，它的outerHTML属性重新赋值以后，内层的div元素就不存在了，被p元素替换了。
// 但是，变量d依然指向原来的div元素，这表示被替换的DIV元素还存在于内存中。

// 注意，如果一个节点没有父节点，设置outerHTML属性会报错。
var div = document.createElement("div");
div.outerHTML = "<p>test</p>";
// DOMException: This element has no parent node.

// 2.8 Element.clientHeight，Element.clientWidth
// Element.clientHeight属性返回一个整数值，表示元素节点的 CSS 高度（单位像素），只对块级元素生效，对于行内元素返回0。
// 如果块级元素没有设置 CSS 高度，则返回实际高度。

// 除了元素本身的高度，它还包括padding部分，但是不包括border、margin。如果有水平滚动条，还要减去水平滚动条的高度。
// 注意，这个值始终是整数，如果是小数会被四舍五入

// Element.clientWidth属性返回元素节点的 CSS 宽度，同样只对块级元素有效，也是只包括元素本身的宽度和padding，
// 如果有垂直滚动条，还要减去垂直滚动条的宽度

// document.documentElement的clientHeight属性，返回当前视口的高度（即浏览器窗口的高度），
// 等同于window.innerHeight属性减去水平滚动条的高度（如果有的话）。document.body的高度则是网页的实际高度。
// 一般来说，document.body.clientHeight大于document.documentElement.clientHeight

// 视口高度
document.documentElement.clientHeight;

// 网页总高度
document.body.clientHeight;

// 2.9 Element.clientLeft，Element.clientTop
// Element.clientLeft属性等于元素节点左边框（left border）的宽度（单位像素），不包括左侧的padding和margin。
// 如果没有设置左边框，或者是行内元素（display: inline），该属性返回0。该属性总是返回整数值，如果是小数，会四舍五入。

// Element.clientTop属性等于网页元素顶部边框的宽度（单位像素），其他特点都与clientLeft相同

// 2.10 Element.scrollHeight，Element.scrollWidth
// Element.scrollHeight属性返回一个整数值（小数会四舍五入），表示当前元素的总高度（单位像素），包括溢出容器、
// 当前不可见的部分。它包括padding，但是不包括border、margin以及水平滚动条的高度（如果有水平滚动条的话），
// 还包括伪元素（::before或::after）的高度。

// Element.scrollWidth属性表示当前元素的总宽度（单位像素），其他地方都与scrollHeight属性类似。这两个属性只读

// 整张网页的总高度可以从document.documentElement或document.body上读取。

// 返回网页的总高度
document.documentElement.scrollHeight;
document.body.scrollHeight;

// 注意，如果元素节点的内容出现溢出，即使溢出的内容是隐藏的，scrollHeight属性仍然返回元素的总高度。
// HTML 代码如下
// <div id="myDiv" style="height: 200px; overflow: hidden;">...<div>
document.getElementById("myDiv").scrollHeight; // 356
// 上面代码中，即使myDiv元素的 CSS 高度只有200像素，且溢出部分不可见，但是scrollHeight仍然会返回该元素的原始高度

// 2.11 Element.scrollLeft，Element.scrollTop
// Element.scrollLeft属性表示当前元素的水平滚动条向右侧滚动的像素数量，Element.scrollTop属性表示当前元素的垂直滚动条向下滚动的像素数量。
// 对于那些没有滚动条的网页元素，这两个属性总是等于0。

// 如果要查看整张网页的水平的和垂直的滚动距离，要从document.documentElement元素上读取
document.documentElement.scrollLeft;
document.documentElement.scrollTop;

// 这两个属性都可读写，设置该属性的值，会导致浏览器将当前元素自动滚动到相应的位置

// 2.12 Element.offsetParent
// Element.offsetParent属性返回最靠近当前元素的、并且 CSS 的position属性不等于static的上层元素
<div style="position: absolute;">
  <p>
    <span>Hello</span>
  </p>
</div>;
// 上面代码中，span元素的offsetParent属性就是div元素
// 该属性主要用于确定子元素位置偏移的计算基准，Element.offsetTop和Element.offsetLeft就是offsetParent元素计算的

// 如果该元素是不可见的（display属性为none），或者位置是固定的（position属性为fixed），则offsetParent属性返回null
<div style="position: absolute;">
  <p>
    <span style="display: none;">Hello</span>
  </p>
</div>;
// 上面代码中，span元素的offsetParent属性是null

// 如果某个元素的所有上层节点的position属性都是static，则Element.offsetParent属性指向<body>元素。

// 2.13 Element.offsetHeight，Element.offsetWidth
// Element.offsetHeight属性返回一个整数，表示元素的 CSS 垂直高度（单位像素），
// 包括元素本身的高度、padding 和 border，以及水平滚动条的高度（如果存在滚动条）

// Element.offsetWidth属性表示元素的 CSS 水平宽度（单位像素），其他都与Element.offsetHeight一致

// 这两个属性都是只读属性，只比Element.clientHeight和Element.clientWidth多了边框的高度或宽度。
// 如果元素的 CSS 设为不可见（比如display: none;），则返回0

// 2.14 Element.offsetLeft，Element.offsetTop
// Element.offsetLeft返回当前元素左上角相对于Element.offsetParent节点的水平位移，Element.offsetTop返回垂直位移，
// 单位为像素。通常，这两个值是指相对于父节点的位移

// 下面的代码可以算出元素左上角相对于整张网页的坐标。
function getElementPosition(e) {
  var x = 0;
  var y = 0;
  while (e != null) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return { x: x, y: y };
}

// 2.15 Element.style
// 每个元素节点都有style用来读写该元素的行内样式信息

// 2.16 Element.children，Element.childElementCount
// Element.children属性返回一个类似数组的对象（HTMLCollection实例），包括当前元素节点的所有子元素。
// 如果当前元素没有子元素，则返回的对象包含零个成员
if (para.children.length) {
  var children = para.children;
  for (var i = 0; i < children.length; i++) {
    // ...
  }
}
// 上面代码遍历了para元素的所有子元素

// 这个属性与Node.childNodes属性的区别是，它只包括元素类型的子节点，不包括其他类型的子节点。

// Element.childElementCount属性返回当前元素节点包含的子元素节点的个数，与Element.children.length的值相同。

// 2.17 Element.firstElementChild，Element.lastElementChild
// Element.firstElementChild属性返回当前元素的第一个元素子节点，Element.lastElementChild返回最后一个元素子节点。

// 如果没有元素子节点，这两个属性返回null

// 2.18 Element.nextElementSibling，Element.previousElementSibling
// Element.nextElementSibling属性返回当前元素节点的后一个同级元素节点，如果没有则返回null。
// HTML 代码如下
// <div id="div-01">Here is div-01</div>
// <div id="div-02">Here is div-02</div>
var el = document.getElementById("div-01");
el.nextElementSibling;
// <div id="div-02">Here is div-02</div>

// 3 实例方法
// 3.1 属性相关方法
// 元素节点提供六个方法，用来操作属性
/*
getAttribute()：读取某个属性的值
getAttributeNames()：返回当前元素的所有属性名
setAttribute()：写入属性值
hasAttribute()：某个属性是否存在
hasAttributes()：当前元素是否有属性
removeAttribute()：删除属性
*/

// 3.2 Element.querySelector()
// Element.querySelector方法接受 CSS 选择器作为参数，返回父元素的第一个匹配的子元素。如果没有找到匹配的子元素，就返回null
var content = document.getElementById("content");
var el = content.querySelector("p");
// 上面代码返回content节点的第一个p元素

// Element.querySelector方法可以接受任何复杂的 CSS 选择器
document.body.querySelector("style[type='text/css'], style:not([type])");
// 注意，这个方法无法选中伪元素

// 它可以接受多个选择器，它们之间使用逗号分隔
element.querySelector("div, p");
// 上面代码返回element的第一个div或p子元素

// 需要注意的是，浏览器执行querySelector方法时，是先在全局范围内搜索给定的 CSS 选择器，然后过滤出哪些属于当前元素的子元素。
// 因此，会有一些违反直觉的结果，下面是一段 HTML 代码
<div>
  <blockquote id="outer">
    <p>hello</p>
    <div id="inner">
      <p>world</p>
    </div>
  </blockquote>
</div>;
// 那么，像下面这样查询的话，实际上返回的是第一个p元素，而不是第二个
var outer = document.getElementById("outer");
outer.querySelector("div, p");
// <p>Hello</p>

// 3.3 Element.querySelectorAll()
// Element.querySelectorAll方法接受 CSS 选择器作为参数，返回一个NodeList实例，包含所有匹配的子元素。
var el = document.querySelector("#test");
var matches = el.querySelectorAll("div.highlighted > p");
// 该方法的执行机制与querySelector方法相同，也是先在全局范围内查找，再过滤出当前元素的子元素。
// 因此，选择器实际上针对整个文档的

// 它也可以接受多个 CSS 选择器，它们之间使用逗号分隔。如果选择器里面有伪元素的选择器，则总是返回一个空的NodeList实例
