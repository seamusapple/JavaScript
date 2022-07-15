// Storage 接口
// 1. 概述
/*
Storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：window.sessionStorage和window.localStorage。

sessionStorage保存的数据用于浏览器的一次会话（session），当会话结束（通常是窗口关闭），
数据被清空；localStorage保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
除了保存期限的长短不同，这两个对象的其他方面都一致。

保存的数据都以“键值对”的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。

这个接口很像 Cookie 的强化版，能够使用大得多的存储空间。目前，每个域名的存储上限视浏览器而定，
Chrome 是 2.5MB，Firefox 和 Opera 是 5MB，IE 是 10MB。其中，Firefox 的存储空间由一级域名决定，
而其他浏览器没有这个限制。也就是说，Firefox 中，a.example.com和b.example.com共享 5MB 的存储空间。
另外，与 Cookie 一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取，如果跨域操作会报错。
*/

// 2. 属性和方法
// Storage 接口只有一个属性。

// Storage.length：返回保存的数据项个数
window.localStorage.setItem("foo", "a");
window.localStorage.setItem("bar", "b");
window.localStorage.setItem("baz", "c");

window.localStorage.length; // 3

// 该接口提供5个方法。

// 2.1 Storage.setItem()
// Storage.setItem()方法用于存入数据。它接受两个参数，第一个是键名，第二个是保存的数据。
// 如果键名已经存在，该方法会更新已有的键值。该方法没有返回值。
window.sessionStorage.setItem("key", "value");
window.localStorage.setItem("key", "value");

// 注意，Storage.setItem()两个参数都是字符串。如果不是字符串，会自动转成字符串，再存入浏览器。

window.sessionStorage.setItem(3, { foo: 1 });
window.sessionStorage.getIem("3"); // "[object, object]"

// 上面代码中，setItem方法的两个参数都不是字符串，但是存入的值都是字符串。

// 如果储存空间已满，该方法会抛错。

// 写入不一定要用这个方法，直接赋值也是可以的。

// 下面三种写法等价
window.localStorage.foo = "123";
window.localStorage["foo"] = "123";
window.localStorage.setItem("foo", "123");

// 2.2 Storage.getItem()
// Storage.getItem()方法用于读取数据。它只有一个参数，就是键名。如果键名不存在，该方法返回null。
window.sessionStorage.getItem("key");
window.localStorage.getItem("key");

// 键名应该是一个字符串，否则会被自动转为字符串。

// 2.3 Storage.removeItem()
// Storage.removeItem()方法用于清除某个键名对应的键值。它接受键名作为参数，如果键名不存在，该方法不会做任何事情。
sessionStorage.removeItem("key");
localStorage.removeItem("key");

// 2.4 Storage.clear()
// Storage.clear()方法用于清除所有保存的数据。该方法的返回值是undefined。
window.sessionStorage.clear();
window.localStorage.clear();

// 2.5 Storage.key()
// Storage.key()方法接受一个整数作为参数（从零开始），返回该位置对应的键名。
window.sessionStorage.setItem("key", "value");
window.sessionStorage.key[0]; // key

// 结合使用Storage.length属性和Storage.key()方法，可以遍历所有的键。
for (var i = 0; i < window.localStorage.length; i++) {
  console.log(localStorage.key[i]);
}

// 3. storage 事件
// Storage 接口储存的数据发生变化时，会触发 storage 事件，可以指定这个事件的监听函数。
window.addEventListener("storage", onStorageEvent, false);

/*
监听函数接受一个event实例对象作为参数。这个实例对象继承了 StorageEvent 接口，有几个特有的属性，都是只读属性。

- StorageEvent.key：字符串，表示发生变动的键名。如果 storage 事件是由clear()方法引起，该属性返回null。
- StorageEvent.newValue：字符串，表示新的键值。如果 storage 事件是由clear()方法或删除该键值对引发的，
  该属性返回null。
- StorageEvent.oldValue：字符串，表示旧的键值。如果该键值对是新增的，该属性返回null。
- StorageEvent.storageArea：对象，返回键值对所在的整个对象。也说是说，可以从这个属性上面拿到当前域名储存
  的所有键值对。
- StorageEvent.url：字符串，表示原始触发 storage 事件的那个网页的网址。
*/

// 下面是StorageEvent.key属性的例子。
function onStorageChange(e) {
  console.log(e.key);
}

window.addEventListener("storage", onStorageChange, false);

// 注意，该事件有一个很特别的地方，就是它不在导致数据变化的当前页面触发，而是在同一个域名的其他窗口触发。
// 也就是说，如果浏览器只打开一个窗口，可能观察不到这个事件。比如同时打开多个窗口，
// 当其中的一个窗口导致储存的数据发生改变时，只有在其他窗口才能观察到监听函数的执行。可以通过这种机制，
// 实现多个窗口之间的通信。

// History 对象
// 1. 概述
// window.history属性指向 History 对象，它表示当前窗口的浏览历史。

// History 对象保存了当前窗口访问过的所有页面网址。下面代码表示当前窗口一共访问过3个网址。
window.history.length; // 3

// 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。
// 后退到前一个网址
history.back();

// 等同于
history.go(-1);

// 浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。

// 2. 属性
// History 对象主要有两个属性。

// History.length：当前窗口访问过的网址数量（包括当前网页）
// History.state：History 堆栈最上层的状态值（详见下文）

// 当前窗口访问过多少个网页
window.history.length; // 1

// History 对象的当前状态
// 通常是 undefined，即未设置
window.history.state; // undefined

// 3. 方法
// 3.1 History.back()、History.forward()、History.go()
/*
这三个方法用于在历史之中移动。

- History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
- History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
- History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，
go(-1)相当于back()。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为0，相当于刷新当前页面。
*/

history.back();
history.forward();
history.go(-2);

// history.go(0)相当于刷新当前页面。
history.go(); // 刷新当前页面

// 注意，移动到以前访问过的页面时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。

// 3.2 History.pushState()
// History.pushState()方法用于在历史中添加一条记录。
window.history.pushState(state, title, url);

/*
该方法接受三个参数，依次为：

- state：一个与添加的记录相关联的状态对象，主要用于popstate事件。该事件触发时，该对象会传入回调函数。
  也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。
    如果不需要这个对象，此处可以填null。
- title：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

*/

// 假定当前网址是example.com/1.html，使用pushState()方法在浏览记录（History 对象）中添加一个新记录。
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "2.html");

// 添加新记录后，浏览器地址栏立刻显示example.com/2.html，但并不会跳转到2.html，甚至也不会检查2.html是否存在，
// 它只是成为浏览历史中的最新记录。这时，在地址栏输入一个新的地址(比如访问google.com)，然后点击了倒退按钮，
// 页面的 URL 将显示2.html；你再点击一次倒退按钮，URL 将显示1.html。

// 总之，pushState()方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应。

// 使用该方法之后，就可以用History.state属性读出状态对象。
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "2.html");
history.state; // {foo: "bar"}

// 如果pushState的 URL 参数设置了一个新的锚点值（即hash），并不会触发hashchange事件。反过来，
// 如果 URL 的锚点值变了，则会在 History 对象创建一条浏览记录。

// 如果pushState()方法设置了一个跨域网址，则会报错

// 报错
// 当前网址为 http://example.com
history.pushState(null, "", "https://twitter.com/hello");

// 上面代码中，pushState想要插入一个跨域的网址，导致报错。这样设计的目的是，
// 防止恶意代码让用户以为他们是在另一个网站上，因为这个方法不会导致页面跳转。

// 3.3 History.replaceState()
// History.replaceState()方法用来修改 History 对象的当前记录，其他都与pushState()方法一模一样。

// 假定当前网页是example.com/example.html。
history.pushState({ page: 1 }, "title 1", "?page=1");
// URL 显示为 http://example.com/example.html?page=1

history.pushState({ page: 2 }, "title 2", "?page=2");
// URL 显示为 http://example.com/example.html?page=2

history.replaceState({ page: 3 }, "title 3", "?page=3");
// URL 显示为 http://example.com/example.html?page=3

history.back();
// URL 显示为 http://example.com/example.html?page=1

history.back();
// URL 显示为 http://example.com/example.html

history.go(2);
// URL 显示为 http://example.com/example.html?page=3

// 4. popstate 事件
// 每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。

// 注意，仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，
// 或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发。
// 另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

// 使用的时候，可以为popstate事件指定回调函数。

window.onpopstate = function (event) {
  console.log("location: " + document.location);
  console.log("state: " + JSON.stringify(event.state));
};

// 或者
window.addEventListener("popstate", function (event) {
  console.log("location: " + document.location);
  console.log("state: " + JSON.stringify(event.state));
});

// 回调函数的参数是一个event事件对象，它的state属性指向pushState和replaceState方法为当前 URL
// 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的event.state，就是通过pushState和replaceState方法，
// 为当前 URL 绑定的state对象。

// 这个state对象也可以直接通过history对象读取。
var currentState = history.state;

// 注意，页面第一次加载的时候，浏览器不会触发popstate事件。
