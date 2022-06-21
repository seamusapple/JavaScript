// 1. Element.attributes 属性
// 元素对象有一个attributes属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。
// 其他类型的节点对象，虽然也有attributes属性，但返回的都是null，因此可以把这个属性视为元素对象独有的。

// 单个属性可以通过序号引用，也可以通过属性名引用。

// HTML 代码如下
// <body bgcolor="yellow" onload="">
document.body.attributes[0];
document.body.attributes.bgcolor;
document.body.attributes["ONLOAD"];
// 注意，上面代码的三种方法，返回的都是属性节点对象，而不是属性值。

// 属性节点对象有name和value属性，对应该属性的属性名和属性值，等同于nodeName属性和nodeValue属性
// HTML代码为
// <div id="mydiv">
var n = document.getElementById("mydiv");
n.attributes[0].name; // id
n.attributes[0].nodeName; // id
n.attributes[0].value; // mydiv
n.attributes[0].nodeValue; // mydiv

// 下面代码可以遍历一个元素节点的所有属性
var para = document.getElementsByTagName("p")[0];
var result = document.getElementById("result");

if (para.hasAttribute()) {
  var attrs = para.attributes;
  var output = "";
  for (var i = attrs.length - 1; i >= 0; i--) {
    output += attrs[i].name + "->" + attrs[i].value;
  }
  result.textContent = output;
} else {
  result.textContent = "No attributes to show";
}

// 2. 元素的标准属性
// HTML 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性
var a = document.getElementById("test");
a.id; // test
a.href; // "http://www.example.com/"
// 上面代码中，a元素标签的属性id和href，自动成为节点对象的属性

// 这些属性都是可写的。
var img = document.getElementById("myImage");
img.src = "http://www.example.com/image.jpg";
// 上面的写法，会立刻替换掉img对象的src属性，即会显示另外一张图片

// 这种修改属性的方法，常常用于添加表单的属性
var f = docment.forms[0];
f.action = "submit.php";
f.method = "POST";
// 上面代码为表单添加提交网址和提交方法

// 注意，这种用法虽然可以读写属性，但是无法删除属性，delete运算符在这里不会生效

// HTML 元素的属性名是大小写不敏感的，但是 JavaScript 对象的属性名是大小写敏感的。
// 转换规则是，转为 JavaScript 属性名时，一律采用小写。如果属性名包括多个单词，
// 则采用骆驼拼写法，即从第二个单词开始，每个单词的首字母采用大写，比如onClick

// 有些 HTML 属性名是 JavaScript 的保留字，转为 JavaScript 属性时，必须改名。主要是以下两个
/*
for属性改为htmlFor
class属性改为className
*/

// 另外，HTML 属性值一般都是字符串，但是 JavaScript 属性会自动转换类型。比如，将字符串true转为布尔值，
// 将onClick的值转为一个函数，将style属性的值转为一个CSSStyleDeclaration对象。因此，可以对这些属性赋予各种类型的值。

// 3. 属性操作的标准方法
// 3.1 概述
// 元素节点提供六个方法，用来操作属性
/*
getAttribute()
getAttributeNames()
setAttribute()
hasAttribute()
hasAttributes()
removeAttribute()
*/

/*
这有几点注意。

（1）适用性

这六个方法对所有属性（包括用户自定义的属性）都适用。

（2）返回值

getAttribute()只返回字符串，不会返回其他类型的值。

（3）属性名

这些方法只接受属性的标准名称，不用改写保留字，比如for和class都可以直接使用。另外，这些方法对于属性名是大小写不敏感的。
*/
var image = document.images[0];
image.setAttribute("class", "myImage");
// 上面代码中，setAttribute方法直接使用class作为属性名，不用写成className。

// 3.2 Element.getAttribute()
// Element.getAttribute方法返回当前元素节点的指定属性。如果指定属性不存在，则返回null
// HTML 代码为
// <div id="div1" align="left">
var div = document.getElementById("div1");
div.getAttribute("align"); // left

// 3.3 Element.getAttributeNames()
// Element.getAttributeNames()返回一个数组，成员是当前元素的所有属性的名字。如果当前元素没有任何属性，则返回一个空数组。
// 使用Element.attributes属性，也可以拿到同样的结果，唯一的区别是它返回的是类似数组的对象。
var myDiv = document.getElementById("mydiv");
myDiv.getAttributeNames().forEach(function (key) {
  var value = myDiv.getAttribute(key);
  console.log(key, value);
});
// 上面代码用于遍历某个节点的所有属性

// 3.4 Element.setAttribute()
// Element.setAttribute方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。该方法没有返回值。
// HTML 代码为
// <button>Hello World</button>
var b = document.querySelector("button");
b.setAttribute("name", "myButton");
b.setAttribute("disabled", true);
// 上面代码中，button元素的name属性被设成myButton，disabled属性被设成true

// 这里有两个地方需要注意，首先，属性值总是字符串，其他类型的值会自动转成字符串，比如布尔值true就会变成字符串true；
// 其次，上例的disable属性是一个布尔属性，对于<button>元素来说，这个属性不需要属性值，只要设置了就总是会生效，
// 因此setAttribute方法里面可以将disabled属性设成任意值。

// 3.5 Element.hasAttribute()
// Element.hasAttribute方法返回一个布尔值，表示当前元素节点是否包含指定属性。
var d = document.getElementById("div1");
if (d.hasAttribute("align")) {
  d.setAttribute("align", "center");
}
// 上面代码检查div节点是否含有align属性。如果有，则设置为居中对齐

// 3.6 Element.hasAttributes()
// Element.hasAttributes方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回false，否则返回true
var foo = document.getElementById("foo");
foo.hasAttributes();

// 3.7 Element.removeAttribute()
// Element.removeAttribute方法移除指定属性。该方法没有返回值
// HTML 代码为
// <div id="div1" align="left" width="200px">
document.getElementById("div1").removeAttribute("align");
// 现在的HTML代码为
// <div id="div1" width="200px">

// 4 dataset 属性
// 有时，需要在HTML元素上附加数据，供 JavaScript 脚本使用。一种解决方法是自定义属性。
<div id="mydiv" foo="bar"></div>;
// 上面代码为div元素自定义了foo属性，然后可以用getAttribute()和setAttribute()读写这个属性
var n = document.getElementById("mydiv");
n.getAttribute("foo"); // bar
n.setAttribute("foo", "baz");
// 这种方法虽然可以达到目的，但是会使得 HTML 元素的属性不符合标准，导致网页代码通不过校验。

// 更好的解决方法是，使用标准提供的data-*属性。
<div id="mydiv" data-foo="bar"></div>;
// 然后，使用元素节点对象的dataset属性，它指向一个对象，可以用来操作 HTML 元素标签的data-*属性。
var n = document.getElementById("mydiv");
n.dataset.foo; // bar
n.dataset.foo = "baz";
// 上面代码中, 通过dataset.foo读写data-foo属性;

// 删除一个data-*属性，可以直接使用delete命令。
delete document.getElementById("myDiv").dataset.foo;

// 除了dataset属性，也可以用getAttribute('data-foo')、removeAttribute('data-foo')、
// setAttribute('data-foo')、hasAttribute('data-foo')等方法操作data-*属性。

// 注意，data-后面的属性名有限制，只能包含字母、数字、连词线（-）、点（.）、冒号（:）和下划线（_)。
// 而且，属性名不应该使用A到Z的大写字母，比如不能有data-helloWorld这样的属性名，而要写成data-hello-world。

// 转成dataset的键名时，连词线后面如果跟着一个小写字母，那么连词线会被移除，该小写字母转为大写字母，其他字符不变。
// 反过来，dataset的键名转成属性名时，所有大写字母都会被转成连词线+该字母的小写形式，其他字符不变。
// 比如，dataset.helloWorld会转成data-hello-world
