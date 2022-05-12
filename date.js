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
