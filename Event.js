// 1. 概述
// 事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，
// 所有的事件都是这个对象的实例，或者说继承了Event.prototype对象。

// Event对象本身就是一个构造函数，可以用来生成新的实例。
event = new Event(type, options);

// Event构造函数接受两个参数。第一个参数type是字符串，表示事件的名称；
// 第二个参数options是一个对象，表示事件对象的配置。该对象主要有下面两个属性。
/*
bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡。
cancelable：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用Event.preventDefault()取消这个事件。
一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。
*/

var ev = new Event("look", {
  bubbles: true,
  cancelable: true,
});
document.dispatchEvent(ev);
// 上面代码新建一个look事件实例，然后使用dispatchEvent方法触发该事件。

// 注意，如果不是显式指定bubbles属性为true，生成的事件就只能在“捕获阶段”触发监听函数。

// HTML 代码为
// <div><p>Hello</p></div>
var div = document.querySelector("div");
var p = document.querySelector("p");

function callback(event) {
  var tag = event.currentTarget.tagName;
  console.log("Tag: " + tag); // 没有任何输出
}

div.addEventListener("click", callback, false);

var click = new Event("click");
p.dispatchEvent(click);

// 上面代码中，p元素发出一个click事件，该事件默认不会冒泡。div.addEventListener方法指定在冒泡阶段监听，因此监听函数不会触发。
// 如果写成div.addEventListener('click', callback, true)，那么在“捕获阶段”可以监听到这个事件。

// 另一方面，如果这个事件在div元素上触发。
div.dispatchEvent(click);
// 那么，不管div元素是在冒泡阶段监听，还是在捕获阶段监听，都会触发监听函数。因为这时div元素是事件的目标，
// 不存在是否冒泡的问题，div元素总是会接收到事件，因此导致监听函数生效。

// 2. 实例属性
// 2.1 Event.bubbles，Event.eventPhase
// Event.bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。
// 前面说过，除非显式声明，Event构造函数生成的事件，默认是不冒泡的。

// Event.eventPhase属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。
var phase = event.eventPhase;

// Event.eventPhase的返回值有四种可能。
/*
0，事件目前没有发生。
1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
2，事件到达目标节点，即Event.target属性指向的那个节点。
3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。
*/

// 2.2 Event.cancelable，Event.cancelBubble，event.defaultPrevented
// Event.cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。

// 大多数浏览器的原生事件是可以取消的。比如，取消click事件，点击链接将无效。
// 但是除非显式声明，Event构造函数生成的事件，默认是不可以取消的。
var evt = new Event("foo");
evt.cancelable; // false

// 当Event.cancelable属性为true时，调用Event.preventDefault()就可以取消这个事件，阻止浏览器对该事件的默认行为。

// 如果事件不能取消，调用Event.preventDefault()会没有任何效果。
// 所以使用这个方法之前，最好用Event.cancelable属性判断一下是否可以取消。
function preventEvent(event) {
  if (event.cancelable) {
    event.preventDefault();
  } else {
    console.warn("This event couldn't be canceled.");
    console.dir(event);
  }
}

// Event.cancelBubble属性是一个布尔值，如果设为true，相当于执行Event.stopPropagation()，可以阻止事件的传播。

// Event.defaultPrevented属性返回一个布尔值，表示该事件是否调用过Event.preventDefault方法。该属性只读。
if (event.defaultPrevented) {
  console.log("该事件已经取消了");
}

// 2.3 Event.currentTarget，Event.target
// 事件发生以后，会经过捕获和冒泡两个阶段，依次通过多个 DOM 节点。因此，任意事件都有两个与事件相关的节点，
// 一个是事件的原始触发节点（Event.target），另一个是事件当前正在通过的节点（Event.currentTarget）。
// 前者通常是后者的后代节点。

// Event.currentTarget属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。
// 随着事件的传播，这个属性的值会变。

// Event.target属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

// 事件传播过程中，不同节点的监听函数内部的Event.target与Event.currentTarget属性的值是不一样的。

// HTML 代码为
// <p id="para">Hello <em>World</em></p>
function hide(e) {
  // 不管点击 Hello 或 World，总是返回 true
  console.log(this === e.currentTarget);

  // 点击 Hello，返回 true
  // 点击 World，返回 false
  console.log(this === e.target);
}
document.getElementById("para").addEventListener("click", hide, false);

// 上面代码中，<em>是<p>的子节点，点击<em>或者点击<p>，都会导致监听函数执行。这时，e.target总是指向原始点击位置的那个节点，
// 而e.currentTarget指向事件传播过程中正在经过的那个节点。由于监听函数只有事件经过时才会触发，
// 所以e.currentTarget总是等同于监听函数内部的this。

// 2.4 Event.type
// Event.type属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。
var evt = new Event("foo");
evt.type; // foo

// 2.5 Event.timeStamp
// Event.timeStamp属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。
var evt = new Event("foo");
evt.timeStamp; // 3683.699999

// 它的返回值有可能是整数，也有可能是小数（高精度时间戳），取决于浏览器的设置

// 下面是一个计算鼠标移动速度的例子，显示每秒移动的像素数量。
var previousX;
var previousY;
var previousT;

window.addEventListener("mousemove", function (event) {
  if (
    previousX !== undefined &&
    previousY !== undefined &&
    previousT !== undefined
  ) {
    var deltaX = event.screenX - previousX;
    var deltaY = event.screenY - previousY;
    var deltaD = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    var deltaT = event.timeStamp - previousT;
    console.log((deltaD / deltaT) * 1000);
  }

  previousX = event.screenX;
  previousY = event.screenY;
  previousT = event.timeStamp;
});

// 2.6 Event.isTrusted
// Event.isTrusted属性返回一个布尔值，表示该事件是否由真实的用户行为产生。
// 比如，用户点击链接会产生一个click事件，该事件是用户产生的；Event构造函数生成的事件，则是脚本产生的。
var evt = new Event("foo");
evt.isTrusted; // false
// 上面代码中，evt对象是脚本产生的，所以isTrusted属性返回false。

// 2.7 Event.detail
// Event.detail属性只有浏览器的 UI （用户界面）事件才具有。该属性返回一个数值，表示事件的某种信息。
// 具体含义与事件类型相关。比如，对于click和dblclick事件，Event.detail是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；
// 对于鼠标滚轮事件，Event.detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。

// HTML 代码如下
// <p>Hello</p>
function giveDetails(e) {
  console.log(e.detail);
}

document.querySelector("p").onclick = giveDetails;

// 3. 实例方法
// 3.1 Event.preventDefault()
