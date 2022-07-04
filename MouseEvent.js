// 1. 鼠标事件的种类
// 鼠标事件主要有下面这些，所有事件都继承了MouseEvent接口
/*
（1）点击事件
鼠标点击相关的有四个事件。

- click：按下鼠标（通常是按下主按钮）时触发。
- dblclick：在同一个元素上双击鼠标时触发。
- mousedown：按下鼠标键时触发。
- mouseup：释放按下的鼠标键时触发。

click事件可以看成是两个事件组成的：用户在同一个位置先触发mousedown，再触发mouseup。
因此，触发顺序是，mousedown首先触发，mouseup接着触发，click最后触发。

双击时，dblclick事件则会在mousedown、mouseup、click之后触发。

（2）移动事件
鼠标移动相关的有五个事件。
- mousemove：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。
为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次。
- mouseenter：鼠标进入一个节点时触发，进入子节点不会触发这个事件（详见后文）。
- mouseover：鼠标进入一个节点时触发，进入子节点会再一次触发这个事件（详见后文）。
- mouseout：鼠标离开一个节点时触发，离开父节点也会触发这个事件（详见后文）。
- mouseleave：鼠标离开一个节点时触发，离开父节点不会触发这个事件（详见后文）。

mouseover事件和mouseenter事件，都是鼠标进入一个节点时触发。
两者的区别是，mouseenter事件只触发一次，而只要鼠标在节点内部移动，mouseover事件会在子节点上触发多次。
*/

/* HTML 代码如下
 <ul>
   <li>item 1</li>
   <li>item 2</li>
   <li>item 3</li>
 </ul>
*/
var ul = document.querySelector("ul");
// 进入 ul 节点以后，mouseenter 事件只会触发一次
// 以后只要鼠标在节点内移动，都不会再触发这个事件
// event.target 是 ul 节点
ul.addEventListener(
  "mouseenter",
  function (event) {
    event.target.style.color = "purple";
    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);
// 进入 ul 节点以后，只要在子节点上移动，mouseover 事件会触发多次
// event.target 是 li 节点
ul.addEventListener(
  "mouseover",
  function (event) {
    event.target.style.color = "orange";
    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);
// 上面代码中，在父节点内部进入子节点，不会触发mouseenter事件，但是会触发mouseover事件。

// mouseout事件和mouseleave事件，都是鼠标离开一个节点时触发。
// 两者的区别是，在父元素内部离开一个子元素时，mouseleave事件不会触发，而mouseout事件会触发。
/* HTML 代码如下
 <ul>
   <li>item 1</li>
   <li>item 2</li>
   <li>item 3</li>
 </ul>
*/
var ul = document.querySelector("ul");
// 先进入 ul 节点，然后在节点内部移动，不会触发 mouseleave 事件
// 只有离开 ul 节点时，触发一次 mouseleave
// event.target 是 ul 节点
ul.addEventListener(
  "mouseleave",
  function (event) {
    event.target.style.color = "purple";
    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);

// 先进入 ul 节点，然后在节点内部移动，mouseout 事件会触发多次
// event.target 是 li 节点
ul.addEventListener(
  "mouseout",
  function (event) {
    event.target.style.color = "orange";
    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);
// 上面代码中，在父节点内部离开子节点，不会触发mouseleave事件，但是会触发mouseout事件。

/*
（3）其他事件

- contextmenu：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文”菜单键时触发。
- wheel：滚动鼠标的滚轮时触发，该事件继承的是WheelEvent接口。
*/

// 2. MouseEvent 接口
// MouseEvent接口代表了鼠标相关的事件，单击（click）、双击（dblclick）、松开鼠标键（mouseup）、按下鼠标键（mousedown）
// 等动作，所产生的事件对象都是MouseEvent实例。此外，滚轮事件和拖拉事件也是MouseEvent实例。

// MouseEvent接口继承了Event接口，所以拥有Event的所有属性和方法，并且还提供鼠标独有的属性和方法。

// 浏览器原生提供一个MouseEvent()构造函数，用于新建一个MouseEvent实例。
var event = new MouseEvent(type, options);
// MouseEvent()构造函数接受两个参数。第一个参数是字符串，表示事件名称；第二个参数是一个事件配置对象，该参数可选。
// 除了Event接口的实例配置属性，该对象可以配置以下属性，所有属性都是可选的。

/*
- screenX：数值，鼠标相对于屏幕的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
- screenY：数值，鼠标相对于屏幕的垂直位置（单位像素），其他与screenX相同。
- clientX：数值，鼠标相对于程序窗口的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
- clientY：数值，鼠标相对于程序窗口的垂直位置（单位像素），其他与clientX相同。
- ctrlKey：布尔值，是否同时按下了 Ctrl 键，默认值为false。
- shiftKey：布尔值，是否同时按下了 Shift 键，默认值为false。
- altKey：布尔值，是否同时按下 Alt 键，默认值为false。
- metaKey：布尔值，是否同时按下 Meta 键，默认值为false。
- button：数值，表示按下了哪一个鼠标按键，默认值为0，表示按下主键（通常是鼠标的左键）或者当前事件没有定义这个属性；
  1表示按下辅助键（通常是鼠标的中间键），2表示按下次要键（通常是鼠标的右键）。
- buttons：数值，表示按下了鼠标的哪些键，是一个三个比特位的二进制值，默认为0（没有按下任何键）。
  1（二进制001）表示按下主键（通常是左键），2（二进制010）表示按下次要键（通常是右键），
  4（二进制100）表示按下辅助键（通常是中间键）。因此，如果返回3（二进制011）就表示同时按下了左键和右键。
- relatedTarget：节点对象，表示事件的相关节点，默认为null。mouseenter和mouseover事件时，表示鼠标刚刚离开的那个元素节点；
  mouseout和mouseleave事件时，表示鼠标正在进入的那个元素节点。
*/
function simulateClick() {
  var event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  });
  var cb = document.getElementById("checkbox");
  cb.dispatchEvent(event);
}
// 上面代码生成一个鼠标点击事件，并触发该事件。

// 3. MouseEvent 接口的实例属性
// 3.1 MouseEvent.altKey，MouseEvent.ctrlKey，MouseEvent.metaKey，MouseEvent.shiftKey
// MouseEvent.altKey、MouseEvent.ctrlKey、MouseEvent.metaKey、MouseEvent.shiftKey这四个属性都返回一个布尔值，
// 表示事件发生时，是否按下对应的键。它们都是只读属性。
/*
altKey属性：Alt 键
ctrlKey属性：Ctrl 键
metaKey属性：Meta 键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
shiftKey属性：Shift 键
*/

// HTML 代码如下
// <body onclick="showKey(event)">
function showKey(e) {
  console.log("ALT key pressed: " + e.altKey);
  console.log("CTRL key pressed: " + e.ctrlKey);
  console.log("META key pressed: " + e.metaKey);
  console.log("SHIFT key pressed: " + e.shiftKey);
}
// 上面代码中，点击网页会输出是否同时按下对应的键。

// 3.2 MouseEvent.button，MouseEvent.buttons
// MouseEvent.button属性返回一个数值，表示事件发生时按下了鼠标的哪个键。该属性只读。
/*
0：按下主键（通常是左键），或者该事件没有初始化这个属性（比如mousemove事件）。
1：按下辅助键（通常是中键或者滚轮键）。
2：按下次键（通常是右键）。
*/
// HTML 代码为
// <button onmouseup="whichButton(event)">点击</button>
var whichButton = function (e) {
  switch (e.button) {
    case 0:
      console.log("Left button clicked.");
      break;
    case 1:
      console.log("Middle button clicked.");
      break;
    case 2:
      console.log("Right button clicked.");
      break;
    default:
      console.log("Unexpected code: " + e.button);
  }
};

// MouseEvent.buttons属性返回一个三个比特位的值，表示同时按下了哪些键。它用来处理同时按下多个鼠标键的情况。该属性只读。
/*
1：二进制为001（十进制的1），表示按下左键。
2：二进制为010（十进制的2），表示按下右键。
4：二进制为100（十进制的4），表示按下中键或滚轮键。
*/
// 同时按下多个键的时候，每个按下的键对应的比特位都会有值。比如，同时按下左键和右键，会返回3（二进制为011）。

// 3.3 MouseEvent.clientX，MouseEvent.clientY
// MouseEvent.clientX属性返回鼠标位置相对于浏览器窗口左上角的水平坐标（单位像素），MouseEvent.clientY属性返回垂直坐标。
// 这两个属性都是只读属性。
// HTML 代码为
// <body onmousedown="showCoords(event)">
function showCords(evt) {
  console.log(
    "clientX value: " + evt.clientX + "\n",
    +"clickY value: " + evt.clientY + "\n"
  );
}
// 这两个属性还分别有一个别名MouseEvent.x和MouseEvent.y

// 3.4 MouseEvent.movementX，MouseEvent.movementY
// MouseEvent.movementX属性返回当前位置与上一个mousemove事件之间的水平距离（单位像素）。数值上，它等于下面的计算公式。
currentEvent.movementX = currentEvent.screenX = previousEvent.screenX;
// MouseEvent.movementY属性返回当前位置与上一个mousemove事件之间的垂直距离（单位像素）。数值上，它等于下面的计算公式。
currentEvent.movementY = currentEvent.screenY - previousEvent.screenY;
// 这两个属性都是只读属性。

// 3.5 MouseEvent.screenX，MouseEvent.screenY
// MouseEvent.screenX属性返回鼠标位置相对于屏幕左上角的水平坐标（单位像素），MouseEvent.screenY属性返回垂直坐标。
// 这两个属性都是只读属性。
// HTML 代码如下
// <body onmousedown="showCoords(event)">
function showCoords(evt) {
  console.log(
    "screenX value: " + evt.screenX + "\n",
    "screenY value: " + evt.screenY + "\n"
  );
}

// 3.6 MouseEvent.offsetX，MouseEvent.offsetY
// MouseEvent.offsetX属性返回鼠标位置与目标节点左侧的padding边缘的水平距离（单位像素），
// MouseEvent.offsetY属性返回与目标节点上方的padding边缘的垂直距离。这两个属性都是只读属性。
/* HTML 代码如下
  <style>
    p {
      width: 100px;
      height: 100px;
      padding: 100px;
    }
  </style>
  <p>Hello</p>
*/
var p = document.querySelector("p");
p.addEventListener(
  "click",
  function (e) {
    console.log(e.offsetX);
    console.log(e.offsetY);
  },
  false
);
// 上面代码中，鼠标如果在p元素的中心位置点击，会返回150 150。因此中心位置距离左侧和上方的padding边缘，
// 等于padding的宽度（100像素）加上元素内容区域一半的宽度（50像素）。

// 3.7 MouseEvent.pageX，MouseEvent.pageY
// MouseEvent.pageX属性返回鼠标位置与文档左侧边缘的距离（单位像素），MouseEvent.pageY属性返回与文档上侧边缘的距离（单位像素）。
// 它们的返回值都包括文档不可见的部分。这两个属性都是只读。
/* HTML 代码如下
  <style>
    body {
      height: 2000px;
    }
  </style>
*/
document.body.addEventListener(
  "click",
  function (e) {
    console.log(e.pageX);
    console.log(e.pageY);
  },
  false
);
// 上面代码中，页面高度为2000像素，会产生垂直滚动条。滚动到页面底部，点击鼠标输出的pageY值会接近2000。

// 3.8 MouseEvent.relatedTarget
// MouseEvent.relatedTarget属性返回事件的相关节点。对于那些没有相关节点的事件，该属性返回null。该属性只读。

// 下表列出不同事件的target属性值和relatedTarget属性值义。
/*
事件名称	target 属性	relatedTarget 属性
focusin	接受焦点的节点	丧失焦点的节点
focusout	丧失焦点的节点	接受焦点的节点
mouseenter	将要进入的节点	将要离开的节点
mouseleave	将要离开的节点	将要进入的节点
mouseout	将要离开的节点	将要进入的节点
mouseover	将要进入的节点	将要离开的节点
dragenter	将要进入的节点	将要离开的节点
dragexit	将要离开的节点	将要进入的节点
*/

/*
  HTML 代码如下
  <div id="outer" style="height:50px;width:50px;border:1px solid black;">
    <div id="inner" style="height:25px;width:25px;border:1px solid black;"></div>
  </div>
*/
var inner = document.getElementById("inner");
inner.addEventListener(
  "mouseover",
  function (event) {
    console.log("进入" + event.target.id + " 离开" + event.relatedTarget.id);
  },
  false
);
inner.addEventListener("mouseenter", function (event) {
  console.log("进入" + event.target.id + " 离开" + event.relatedTarget.id);
});
inner.addEventListener("mouseout", function (event) {
  console.log("离开" + event.target.id + " 进入" + event.relatedTarget.id);
});
inner.addEventListener("mouseleave", function (event) {
  console.log("离开" + event.target.id + " 进入" + event.relatedTarget.id);
});
// 鼠标从 outer 进入inner，输出
// 进入inner 离开outer
// 进入inner 离开outer

// 鼠标从 inner进入 outer，输出
// 离开inner 进入outer
// 离开inner 进入outer

// 4. MouseEvent 接口的实例方法
// 4.1 MouseEvent.getModifierState()
// MouseEvent.getModifierState方法返回一个布尔值，表示有没有按下特定的功能键。它的参数是一个表示功能键的字符串。
document.addEventListener(
  "click",
  function (e) {
    console.log(e.getModifierState("CapsLock"));
  },
  false
);
// 上面的代码可以了解用户是否按下了大写键。

// 5. WheelEvent 接口
// 5.1 概述
// WheelEvent 接口继承了 MouseEvent 实例，代表鼠标滚轮事件的实例对象。目前，鼠标滚轮相关的事件只有一个wheel事件，
// 用户滚动鼠标的滚轮，就生成这个事件的实例。

// 浏览器原生提供WheelEvent()构造函数，用来生成WheelEvent实例。
var wheelEvent = new WheelEvent(type, options);
/*
WheelEvent()构造函数可以接受两个参数，第一个是字符串，表示事件类型，对于滚轮事件来说，这个值目前只能是wheel。
第二个参数是事件的配置对象。该对象的属性除了Event、UIEvent的配置属性以外，还可以接受以下几个属性，所有属性都是可选的。

deltaX：数值，表示滚轮的水平滚动量，默认值是 0.0。
deltaY：数值，表示滚轮的垂直滚动量，默认值是 0.0。
deltaZ：数值，表示滚轮的 Z 轴滚动量，默认值是 0.0。
deltaMode：数值，表示相关的滚动事件的单位，适用于上面三个属性。0表示滚动单位为像素，1表示单位为行，2表示单位为页，默认为0。
*/

// 5.2 实例属性
// WheelEvent事件实例除了具有Event和MouseEvent的实例属性和实例方法，还有一些自己的实例属性，但是没有自己的实例方法。
// 下面的属性都是只读属性。
/*
WheelEvent.deltaX：数值，表示滚轮的水平滚动量。
WheelEvent.deltaY：数值，表示滚轮的垂直滚动量。
WheelEvent.deltaZ：数值，表示滚轮的 Z 轴滚动量。
WheelEvent.deltaMode：数值，表示上面三个属性的单位，0是像素，1是行，2是页。
*/
