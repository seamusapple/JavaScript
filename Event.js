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
