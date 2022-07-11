// 1. 概述
// Cookie 是服务器保存在浏览器的一小段文本信息，一般大小不能超过4KB。浏览器每次向服务器发出请求，就会自动附上这段信息。

// HTTP 协议不带有状态，有些请求需要区分状态，就通过 Cookie 附带字符串，让服务器返回不一样的回应。
// 举例来说，用户登录以后，服务器往往会在网站上留下一个 Cookie，记录用户编号（比如id=1234），
// 以后每次浏览器向服务器请求数据，就会带上这个字符串，服务器从而知道是谁在请求，应该回应什么内容。

/*
Cookie 的目的就是区分用户，以及放置状态信息，它的使用场景主要如下。

- 对话（session）管理：保存登录状态、购物车等需要记录的信息。
- 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等等。
- 追踪用户：记录和分析用户行为。

*/

// Cookie 不是一种理想的客户端存储机制。它的容量很小（4KB），缺乏数据操作接口，而且会影响性能。
// 客户端存储建议使用 Web storage API 和 IndexedDB。只有那些每次请求都需要让服务器知道的信息，
// 才应该放在 Cookie 里面。

/*
每个 Cookie 都有以下几方面的元数据。

- Cookie 的名字
- Cookie 的值（真正的数据写在这里面）
- 到期时间（超过这个时间会失效）
- 所属域名（默认为当前域名）
- 生效的路径（默认为当前网址）
*/

// 举例来说，用户访问网址www.example.com，服务器在浏览器写入一个 Cookie。
// 这个 Cookie 的所属域名为www.example.com，生效路径为根路径/。

// 如果 Cookie 的生效路径设为/forums，那么这个 Cookie 只有在访问www.example.com/forums及其子路径时才有效。
// 以后，浏览器访问某个路径之前，就会找出对该域名和路径有效，并且还没有到期的 Cookie，一起发送给服务器。

// 用户可以设置浏览器不接受 Cookie，也可以设置不向服务器发送 Cookie。
// window.navigator.cookieEnabled属性返回一个布尔值，表示浏览器是否打开 Cookie 功能。

window.navigator.cookieEnabled; // true

// document.cookie属性返回当前网页的 Cookie。
document.cookie; // id=foo;key=bar

// 不同浏览器对 Cookie 数量和大小的限制，是不一样的。一般来说，单个域名设置的 Cookie 不应超过30个，
// 每个 Cookie 的大小不能超过 4KB。超过限制以后，Cookie 将被忽略，不会被设置。

// Cookie 是按照域名区分的，foo.com只能读取自己放置的 Cookie，无法读取其他网站（比如bar.com）放置的 Cookie。
// 一般情况下，一级域名也不能读取二级域名留下的 Cookie，比如mydomain.com不能读取subdomain.mydomain.com设置的
// Cookie。但是有一个例外，设置 Cookie 的时候（不管是一级域名设置的，还是二级域名设置的），
// 明确将domain属性设为一级域名，则这个域名下面的各级域名可以共享这个 Cookie。

// Set-Cookie: name=value; domain=mydomain.com
// 上面示例中，设置 Cookie 时，domain属性设为mydomain.com，那么各级的子域名和一级域名都可以读取这个 Cookie。

// 注意，区分 Cookie 时不考虑协议和端口。也就是说，http://example.com设置的 Cookie，
// 可以被https://example.com或http://example.com:8080读取。

// 2. Cookie 与 HTTP 协议
// Cookie 由 HTTP 协议生成，也主要是供 HTTP 协议使用。

// 2.1 HTTP 回应：Cookie 的生成
// 服务器如果希望在浏览器保存 Cookie，就要在 HTTP 回应的头信息里面，放置一个Set-Cookie字段。
// Set-Cookie:foo=bar

// 上面代码会在浏览器保存一个名为foo的 Cookie，它的值为bar。

// HTTP 回应可以包含多个Set-Cookie字段，即在浏览器生成多个 Cookie。下面是一个例子。

/*
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[page content]
*/

// 除了 Cookie 的值，Set-Cookie字段还可以附加 Cookie 的属性。
/*
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<non-zero-digit>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
*/

// 上面的几个属性的含义，将在后文解释。

// 一个Set-Cookie字段里面，可以同时包括多个属性，没有次序的要求。

// Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly

// 下面是一个例子。
// Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly

// 如果服务器想改变一个早先设置的 Cookie，必须同时满足四个条件：Cookie 的key、domain、path和secure都匹配。
// 举例来说，如果原始的 Cookie 是用如下的Set-Cookie设置的。

// Set-Cookie: key1=value1; domain=example.com; path=/blog

// 改变上面这个 Cookie 的值，就必须使用同样的Set-Cookie。
// Set-Cookie: key1=value2; domain=example.com; path=/blog

// 只要有一个属性不同，就会生成一个全新的 Cookie，而不是替换掉原来那个 Cookie
// Set-Cookie: key1=value2; domain=example.com; path=/

// 上面的命令设置了一个全新的同名 Cookie，但是path属性不一样。下一次访问example.com/blog的时候，
// 浏览器将向服务器发送两个同名的 Cookie。

// Cookie: key1=value1; key1=value2

// 上面代码的两个 Cookie 是同名的，匹配越精确的 Cookie 排在越前面。

// 2.2 HTTP 请求：Cookie 的发送
// 浏览器向服务器发送 HTTP 请求时，每个请求都会带上相应的 Cookie。也就是说，把服务器早前保存在浏览器的这段信息，
// 再发回服务器。这时要使用 HTTP 头信息的Cookie字段。
// Cookie: foo=bar

// 上面代码会向服务器发送名为foo的 Cookie，值为bar。

// Cookie字段可以包含多个 Cookie，使用分号（;）分隔。

// Cookie: name=value; name2=value2; name3=value3

// 下面是一个例子。
/*
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
*/

/*
服务器收到浏览器发来的 Cookie 时，有两点是无法知道的。

Cookie 的各种属性，比如何时过期。
哪个域名设置的 Cookie，到底是一级域名设的，还是某一个二级域名设的。
*/
