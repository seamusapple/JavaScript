// avaScript 提供定时执行代码的功能，叫做定时器（timer），主要由setTimeout()和setInterval()这两个函数来完成。
// 它们向任务队列添加定时任务。
// 1. setTimeout()
// setTimeout函数用来指定某个函数或某段代码，在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。
// var timerId = setTimeout(func | code, delay);
// 上面代码中，setTimeout函数接受两个参数，第一个参数func|code是将要推迟执行的函数名或者一段代码，第二个参数delay是推迟执行的毫秒数。
console.log(1);
setTimeout(function () {
  console.log(2);
}, 1000);
console.log(3);
// 1
// 3
// 2
function f() {
  console.log(2);
}
setTimeout(f, 1000);

// setTimeout的第二个参数如果省略，则默认为0。
setTimeout(f);
// 等同于
setTimeout(f, 0);

// 除了前两个参数，setTimeout还允许更多的参数。它们将依次传入推迟执行的函数（回调函数）
setTimeout(
  function (a, b) {
    console.log(a + b);
  },
  1000,
  1,
  5
);
// 6

// 还有一个需要注意的地方，如果回调函数是对象的方法，那么setTimeout使得方法内部的this关键字指向全局环境，
// 而不是定义时所在的那个对象
var x = 1;
var obj = {
  x: 2,
  y: function () {
    console.log(this.x);
  },
};
setTimeout(obj.y, 1000); // 1 (in web console)
// 上面代码输出的是1，而不是2。因为当obj.y在1000毫秒后运行时，this所指向的已经不是obj了，而是全局环境。

// 为了防止出现这个问题，一种解决方法是将obj.y放入一个函数
setTimeout(function () {
  obj.y();
}, 1000); // 2
// 上面代码中，obj.y放在一个匿名函数之中，这使得obj.y在obj的作用域执行，而不是在全局作用域内执行，所以能够显示正确的值

// 另一种解决方法是，使用bind方法，将obj.y这个方法绑定在obj上面
setTimeout(obj.y.bind(obj), 1000); // 2

// 2. setInterval()
// setInterval函数的用法与setTimeout完全一致，区别仅仅在于setInterval指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。
var i = 1;
// var timer = setInterval(function () {
//   console.log(2);
// }, 1000);
// 上面代码中，每隔1000毫秒就输出一个2，会无限运行下去，直到关闭当前窗口

// setInterval指定的是“开始执行”之间的间隔，并不考虑每次任务执行本身所消耗的时间。
// 因此实际上，两次执行之间的间隔会小于指定的时间。

// 比如，setInterval指定每 100ms 执行一次，每次执行需要 5ms，那么第一次执行结束后95毫秒，第二次执行就会开始。
// 如果某次执行耗时特别长，比如需要105毫秒，那么它结束后，下一次执行就会立即开始

// 为了确保两次执行之间有固定的间隔，可以不用setInterval，而是每次执行结束后，使用setTimeout指定下一次执行的具体时间
// var timer = setTimeout(function f() {
//   // ...
//   timer = setTimeout(f, 2000);
// }, 2000);

// 3. clearTimeout()，clearInterval()
// setTimeout和setInterval函数，都返回一个整数值，表示计数器编号。
// 将该整数传入clearTimeout和clearInterval函数，就可以取消对应的定时器
// var id1 = setTimeout(f, 1000);
// var id2 = setInterval(f, 1000);
// clearTimeout(id1);
// clearInterval(id2);

// 上面代码中，回调函数f不会再执行了，因为两个定时器都被取消了
// setTimeout和setInterval返回的整数值是连续的，也就是说，第二个setTimeout方法返回的整数值，将比第一个的整数值大1
// 利用这一点，可以写一个函数，取消当前所有的setTimeout定时器

// (function () {
//   // 每轮事件循环检查一次
//   var gid = setInterval(clearAllTimeouts, 0);

//   function clearAllTimeouts() {
//     var id = setTimeout(function () {}, 0);
//     while (id > 0) {
//       if (id !== gid) {
//         clearTimeout(id);
//       }
//       id--;
//     }
//   }
// })();
// 上面代码中，先调用setTimeout，得到一个计算器编号，然后把编号比它小的计数器全部取消

// 4. 实例：debounce 函数
// 有时，我们不希望回调函数被频繁调用。比如，用户填入网页输入框的内容，希望通过 Ajax 方法传回服务器，jQuery 的写法如下
// $("textarea").on("keydown", ajaxAction);
// 这样写有一个很大的缺点，就是如果用户连续击键，就会连续触发keydown事件，造成大量的 Ajax 通信。
// 这是不必要的，而且很可能产生性能问题
// 正确的做法应该是，设置一个门槛值，表示两次 Ajax 通信的最小间隔时间。
// 如果在间隔时间内，发生新的keydown事件，则不触发 Ajax 通信，并且重新开始计时。如果过了指定时间，没有发生新的keydown事件，再将数据发送出去。

// 这种做法叫做 debounce（防抖动）。假定两次 Ajax 通信的间隔不得小于2500毫秒，上面的代码可以改写成下面这样。
// $("textarea").on("keydown", debounce(ajaxAction, 2500));
// function debounce(fn, delay) {
//   var timer = null; // 声明计时器
//   return function () {
//     var context = this;
//     var args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(function () {
//       fn.apply(context, args);
//     }, delay);
//   };
// }
// 上面代码中，只要在2500毫秒之内，用户再次击键，就会取消上一次的定时器，然后再新建一个定时器。
// 这样就保证了回调函数之间的调用间隔，至少是2500毫秒。

// 5. 运行机制
// setTimeout和setInterval的运行机制，是将指定的代码移出本轮事件循环，等到下一轮事件循环，
// 再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就继续等待。

// 这意味着，setTimeout和setInterval指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完，才会开始执行

// 由于前面的任务到底需要多少时间执行完，是不确定的，所以没有办法保证，
// setTimeout和setInterval指定的任务，一定会按照预定时间执行
// setTimeout(someTask, 100);
// veryLongTask();
// 上面代码的setTimeout，指定100毫秒以后运行一个任务。但是，如果后面的veryLongTask函数（同步任务）运行时间非常长，
// 过了100毫秒还无法结束，那么被推迟运行的someTask就只有等着，等到veryLongTask运行结束，才轮到它执行。

// setInterval(function () {
//   console.log(2);
// }, 1000);
// sleep(3000);
// function sleep(ms) {
//   var start = Date.now();
//   while (Date.now() - start < ms) {}
// }
// 上面代码中，setInterval要求每隔1000毫秒，就输出一个2。
// 但是，紧接着的sleep语句需要3000毫秒才能完成，那么setInterval就必须推迟到3000毫秒之后才开始生效。
// 注意，生效后setInterval不会产生累积效应，即不会一下子输出三个2，而是只会输出一个2

// 6. setTimeout(f, 0)
// 6.1 含义
// setTimeout的作用是将代码推迟到指定时间执行，如果指定时间为0，即setTimeout(f, 0)，那么会立刻执行吗？
// 答案是不会。因为上一节说过，必须要等到当前脚本的同步任务，全部处理完以后，才会执行setTimeout指定的回调函数f。
// 也就是说，setTimeout(f, 0)会在下一轮事件循环一开始就执行
setTimeout(function () {
  console.log(11);
}, 0);
console.log(12);
// 上面代码先输出12，再输出11。因为12是同步任务，在本轮事件循环执行，而11是下一轮事件循环执行

// 总之，setTimeout(f, 0)这种写法的目的是，尽可能早地执行f，但是并不能保证立刻就执行f。

// 实际上，setTimeout(f, 0)不会真的在0毫秒之后运行，不同的浏览器有不同的实现。
// 以 Edge 浏览器为例，会等到4毫秒之后运行。如果电脑正在使用电池供电，会等到16毫秒之后运行；
// 如果网页不在当前 Tab 页，会推迟到1000毫秒（1秒）之后运行。这样是为了节省系统资源。

// 6.2 应用
// setTimeout(f, 0)有几个非常重要的用途。它的一大应用是，可以调整事件的发生顺序。
// 比如，网页开发中，某个事件先发生在子元素，然后冒泡到父元素，即子元素的事件回调函数，会早于父元素的事件回调函数触发。
// 如果，想让父元素的事件回调函数先发生，就要用到setTimeout(f, 0)
/*
// HTML 代码如下
// <input type="button" id="myButton" value="click">

var input = document.getElementById('myButton');

input.onclick = function A() {
  setTimeout(function B() {
    input.value +=' input';
  }, 0)
};

document.body.onclick = function C() {
  input.value += ' body'
}; 
*/
// 上面代码在点击按钮后，先触发回调函数A，然后触发函数C。函数A中，setTimeout将函数B推迟到下一轮事件循环执行，
// 这样就起到了，先触发父元素的回调函数C的目的了。

// 另一个应用是，用户自定义的回调函数，通常在浏览器的默认动作之前触发。
// 比如，用户在输入框输入文本，keypress事件会在浏览器接收文本之前触发。因此，下面的回调函数是达不到目的的。
/*
// HTML 代码如下
// <input type="text" id="input-box">

document.getElementById('input-box').onkeypress = function (event) {
  this.value = this.value.toUpperCase();
} 
*/
// 上面代码想在用户每次输入文本后，立即将字符转为大写。但是实际上，它只能将本次输入前的字符转为大写，
// 因为浏览器此时还没接收到新的文本，所以this.value取不到最新输入的那个字符。只有用setTimeout改写，上面的代码才能发挥作用。
/*
document.getElementById('input-box').onkeypress = function() {
  var self = this;
  setTimeout(function() {
    self.value = self.value.toUpperCase();
  }, 0);
}
*/
// 上面代码将代码放入setTimeout之中，就能使得它在浏览器接收到文本之后触发

// 由于setTimeout(f, 0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、
// 耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f, 0)里面执行
/*
var div = document.getElementsByTagName('div')[0];

// 写法一
for (var i = 0xA00000; i < 0xFFFFFF; i++) {
  div.style.backgroundColor = '#' + i.toString(16);
}

// 写法二
var timer;
var i=0x100000;

function func() {
  timer = setTimeout(func, 0);
  div.style.backgroundColor = '#' + i.toString(16);
  if (i++ == 0xFFFFFF) clearTimeout(timer);
}

timer = setTimeout(func, 0);
*/
// 上面代码有两种写法，都是改变一个网页元素的背景色。写法一会造成浏览器“堵塞”，
// 因为 JavaScript 执行速度远高于 DOM，会造成大量 DOM 操作“堆积”，而写法二就不会，这就是setTimeout(f, 0)的好处

// 另一个使用这种技巧的例子是代码高亮的处理。如果代码块很大，一次性处理，可能会对性能造成很大的压力，
// 那么将其分成一个个小块，一次处理一块，比如写成setTimeout(highlightNext, 50)的样子，性能压力就会减轻。
