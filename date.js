// Date对象可以作为普通函数直接调用，返回一个代表当前时间的字符串。
console.log(Date());

// Date还可以当作构造函数使用。对它使用new命令，会返回一个Date对象的实例。如果不加参数，实例代表的就是当前时间
var today = new Date();

// Date实例有一个独特的地方。其他对象求值的时候，都是默认调用.valueOf()方法，但是Date实例求值的时候，默认调用的是toString()方法。
// 这导致对Date实例求值，返回的是一个字符串，代表该实例对应的时间
console.log(today);
console.log(today.toString());

// 参数为时间零点开始计算的毫秒数
console.log(new Date(1378218728000)); // 2013-09-03T14:32:08.000Z
// 参数为日期字符串
console.log(new Date("January 6, 2013")); // 2013-01-05T16:00:00.000Z
// 参数为多个整数，
// 代表年、月、日、小时、分钟、秒、毫秒
console.log(new Date(2013, 0, 1, 0, 0, 0, 0)); // 2012-12-31T16:00:00.000Z

// 第一点，参数可以是负整数，代表1970年元旦之前的时间
console.log(new Date(-1378218728000)); //

// 第二点，只要是能被Date.parse()方法解析的字符串，都可以当作参数。
console.log(new Date("2013-2-15"));
console.log(new Date("2013/2/15"));
console.log(new Date("02/15/2013"));
console.log(new Date("2013-FEB-15"));
console.log(new Date("FEB, 15, 2013"));
console.log(new Date("FEB 15, 2013"));
console.log(new Date("February, 15, 2013"));
console.log(new Date("February 15, 2013"));
console.log(new Date("15 Feb, 2013"));
console.log(new Date("15 Feb 2013"));
console.log(new Date("15, February, 2013"));

// 第三，参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的。
// 也就是说，这时至少需要两个参数，因为如果只使用“年”这一个参数，Date会将其解释为毫秒数。
console.log(new Date(2013)); // 1970-01-01T00:00:02.013Z
// 上面 2013被解释为毫秒数，而不是年份。
console.log(new Date(2013, 0));
console.log(new Date(2013, 0, 1));
console.log(new Date(2013, 0, 1, 0));
console.log(new Date(2013, 0, 1, 0, 0, 0, 0));
/*
年：使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表1910年。如果是负数，表示公元前。
月：0表示一月，依次类推，11表示12月。
日：1到31。
小时：0到23。
分钟：0到59。
秒：0到59
毫秒：0到999。
*/
// 注意，月份从0开始计算，但是，天数从1开始计算。另外，除了日期的默认值为1，小时、分钟、秒钟和毫秒的默认值都是0。
// 这些参数如果超出了正常范围，会被自动折算。比如，如果月设为15，就折算为下一年的4月。
// 参数还可以使用负数，表示扣去的时间

/*
类型自动转换时，Date实例如果转为数值，则等于对应的毫秒数；
如果转为字符串，则等于对应的日期字符串。所以，两个日期实例对象进行减法运算时，
返回的是它们间隔的毫秒数；进行加法运算时，返回的是两个字符串连接而成的新字符串
*/
var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);
console.log(d2 - d1); // 2678400000
console.log(d2 + d1);

console.log(Date.now());

// 如果解析失败，返回NaN
console.log(Date.parse("xxx"));
// Date.UTC方法接受年、月、日等变量作为参数，返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数。
console.log(Date.UTC(2011, 0, 1, 2, 3, 4, 567)); // 1293847384567

// valueOf方法返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，
// 该方法等同于getTime方法。
var d = new Date();
console.log(d.valueOf()); // 1652887053671
console.log(d.getTime()); // 1652887053671
// 预期为数值的场合，Date实例会自动调用该方法，所以可以用下面的方法计算时间的间隔。
var start = new Date();
var end = new Date();
var elapsed = end - start;
console.log(elapsed); // 0

// toString方法返回一个完整的日期字符串。
var d = new Date(2013, 0, 1);
console.log(d.toString()); // Tue Jan 01 2013 00:00:00 GMT+0800 (China Standard Time)
console.log(d); // 2012-12-31T16:00:00.000Z
// 因为toString是默认的调用方法，所以如果直接读取Date实例，就相当于调用这个方法。

// toUTCString方法返回对应的 UTC 时间，也就是比北京时间晚8个小时。
console.log(d.toUTCString()); // Mon, 31 Dec 2012 16:00:00 GMT

// toISOString方法返回对应时间的 ISO8601 写法。
console.log(d.toISOString()); // 2012-12-31T16:00:00.000Z

// toJSON方法返回一个符合 JSON 格式的 ISO 日期字符串，与toISOString方法的返回结果完全相同。
console.log(d.toJSON()); // 2012-12-31T16:00:00.000Z

// toDateString方法返回日期字符串（不含小时、分和秒）。
console.log(d.toDateString()); // Tue Jan 01 2013

// toTimeString方法返回时间字符串（不含年月日）。
console.log(d.toTimeString()); // 00:00:00 GMT+0800 (China Standard Time)

/*
以下三种方法，可以将 Date 实例转为表示本地时间的字符串。

Date.prototype.toLocaleString()：完整的本地时间。
Date.prototype.toLocaleDateString()：本地日期（不含小时、分和秒）。
Date.prototype.toLocaleTimeString()：本地时间（不含年月日）。
*/
console.log(d.toLocaleString()); // 1/1/2013, 12:00:00 AM
console.log(d.toLocaleDateString()); // 1/1/2013
console.log(d.toLocaleTimeString()); // 12:00:00 AM

console.log(d.toLocaleString("en-US")); // 1/1/2013, 12:00:00 AM
console.log(d.toLocaleDateString("en-US")); // 1/1/2013
console.log(d.toLocaleTimeString("en-US")); // 12:00:00 AM
console.log(d.toLocaleString("zh-CN")); // 2013/1/1 上午12:00:00
console.log(d.toLocaleDateString("zh-CN")); // 2013/1/1
console.log(d.toLocaleTimeString("zh-CN")); // 上午12:00:00

/*
options配置对象有以下属性。

dateStyle：可能的值为full、long、medium、short。
timeStyle：可能的值为full、long、medium、short。
month：可能的值为numeric、2-digit、long、short、narrow。
year：可能的值为numeric、2-digit。
weekday：可能的值为long、short、narrow。
day、hour、minute、second：可能的值为numeric、2-digit。
timeZone：可能的值为 IANA 的时区数据库。
timeZoneName：可能的值为long、short。
hour12：24小时周期还是12小时周期，可能的值为true、false。
*/
var d = new Date(2013, 0, 1);
var r1 = d.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
console.log(r1); // "Tuesday, January 1, 2013"
var r2 = d.toLocaleDateString("en-US", {
  day: "2-digit",
  month: "long",
  year: "2-digit",
});
console.log(r2); // January 01, 13

var r3 = d.toLocaleDateString("en-US", {
  day: "2-digit",
  month: "long",
  year: "2-digit",
});
console.log(r3); // "January 01, 13"

var r4 = d.toLocaleTimeString("en-US", {
  timeZone: "UTC",
  timeZoneName: "short",
});
console.log(r4); // "4:00:00 PM UTC"

var r5 = d.toLocaleTimeString("en-US", {
  timeZone: "Asia/Shanghai",
  timeZoneName: "long",
});
console.log(r5); // "12:00:00 AM China Standard Time"

var r6 = d.toLocaleTimeString("en-US", {
  hour12: false,
});
console.log(r6); // "00:00:00"

var r7 = d.toLocaleTimeString("en-US", {
  hour12: true,
});
console.log(r7); // "12:00:00 AM"

/*
Date对象提供了一系列get*方法，用来获取实例对象某个方面的值。

getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
getDate()：返回实例对象对应每个月的几号（从1开始）。
getDay()：返回星期几，星期日为0，星期一为1，以此类推。
getFullYear()：返回四位的年份。
getMonth()：返回月份（0表示1月，11表示12月）。
getHours()：返回小时（0-23）。
getMilliseconds()：返回毫秒（0-999）。
getMinutes()：返回分钟（0-59）。
getSeconds()：返回秒（0-59）。
getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。
所有这些get*方法返回的都是整数，不同方法返回值的范围不一样。

分钟和秒：0 到 59
小时：0 到 23
星期：0（星期天）到 6（星期六）
日期：1 到 31
月份：0（一月）到 11（十二月）
*/
var d = new Date("January 6, 2013");
console.log(d.getDate()); // 6
console.log(d.getMonth()); // 0
console.log(d.getFullYear()); // 2013
console.log(d.getTimezoneOffset()); // -480
// 上面代码中，最后一行返回-480，即 UTC 时间减去当前时间，单位是分钟。
// -480表示 UTC 比当前时间少480分钟，即当前时区比 UTC 早8个小时。

function leftDays() {
  var today = new Date();
  var endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
  var msPerDay = 24 * 60 * 60 * 1000;
  return Math.round(endYear.getTime() - today.getTime()) / msPerDay;
}
console.log(leftDays());

/*
上面这些get*方法返回的都是当前时区的时间，Date对象还提供了这些方法对应的 UTC 版本，用来返回 UTC 时间。

getUTCDate()
getUTCFullYear()
getUTCMonth()
getUTCDay()
getUTCHours()
getUTCMinutes()
getUTCSeconds()
getUTCMilliseconds()
*/
var d = new Date("January 6, 2013");
console.log(d.getDate()); // 6
console.log(d.getUTCDate()); // 5
// 上面代码中，实例对象d表示当前时区（东八时区）的1月6日0点0分0秒，
// 这个时间对于当前时区来说是1月6日，所以getDate方法返回6，
// 对于 UTC 时区来说是1月5日，所以getUTCDate方法返回5。

/**
 *Date对象提供了一系列set*方法，用来设置实例对象的各个方面。

setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。
setFullYear(year [, month, date])：设置四位年份。
setHours(hour [, min, sec, ms])：设置小时（0-23）。
setMilliseconds()：设置毫秒（0-999）。
setMinutes(min [, sec, ms])：设置分钟（0-59）。
setMonth(month [, date])：设置月份（0-11）。
setSeconds(sec [, ms])：设置秒（0-59）。
setTime(milliseconds)：设置毫秒时间戳。
这些方法基本是跟get*方法一一对应的，但是没有setDay方法，因为星期几是计算出来的，而不是设置的。
另外，需要注意的是，凡是涉及到设置月份，都是从0开始算的，即0是1月，11是12月。
*/
var d = new Date("January 6, 2013");
console.log(d.toString()); // Sun Jan 06 2013 00:00:00 GMT+0800 (China Standard Time)
d.setDate(9); // // 1357660800000
console.log(d.toString()); // Wed Jan 09 2013 00:00:00 GMT+0800 (China Standard Time)

// set*方法的参数都会自动折算。以setDate()为例，如果参数超过当月的最大天数，
// 则向下一个月顺延，如果参数是负数，表示从上个月的最后一天开始减去的天数。
var d1 = new Date("January 6, 2013");
d1.setDate(32);
console.log(d1.toString()); // Fri Feb 01 2013 00:00:00 GMT+0800 (China Standard Time)
var d2 = new Date("January 6, 2013");
d2.setDate(-1);
console.log(d2.toString()); // Sun Dec 30 2012 00:00:00 GMT+0800 (China Standard Time)
// 上面代码中，d1.setDate(32)将日期设为1月份的32号，因为1月份只有31号，所以自动折算为2月1日。
// d2.setDate(-1)表示设为上个月的倒数第二天，即12月30日。

var d = new Date();
// 将日期向后推1000天
d.setDate(d.getDate() + 1000);
// 将时间设为6小时后
d.setHours(d.getHours() + 6);
// 将年份设为去年
d.setFullYear(d.getFullYear() - 1);

/**
set*系列方法除了setTime()，都有对应的 UTC 版本，即设置 UTC 时区的时间。

setUTCDate()
setUTCFullYear()
setUTCHours()
setUTCMilliseconds()
setUTCMinutes()
setUTCMonth()
setUTCSeconds()
*/
var d = new Date("January 6, 2013");
console.log(d.getUTCHours()); // 16
console.log(d.setUTCHours(22)); // 1357423200000
console.log(d.toString()); // Sun Jan 06 2013 06:00:00 GMT+0800 (China Standard Time)
// 上面代码中，本地时区（东八时区）的1月6日0点0分，是 UTC 时区的前一天下午16点。
// 设为 UTC 时区的22点以后，就变为本地时区的上午6点。
