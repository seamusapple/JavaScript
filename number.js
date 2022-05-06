// 作为构造函数时，它用于生成值为数值的对象。
var n = new Number(1);
typeof n; // object

// 作为工具函数时，它可以将任何类型的值转为数值
Number(true); // 1

// Number对象拥有以下一些静态属性（即直接定义在Number对象上的属性，而不是定义在实例上的属性）
/*
Number.POSITIVE_INFINITY：正的无限，指向Infinity。
Number.NEGATIVE_INFINITY：负的无限，指向-Infinity。
Number.NaN：表示非数值，指向NaN。
Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE。
Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991。
Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991。
*/

Number.POSITIVE_INFINITY; // Infinity
Number.NEGATIVE_INFINITY; // -Infinity
Number.NaN; // NaN

Number.MAX_VALUE;
// 1.7976931348623157e+308
Number.MAX_VALUE < Infinity;
// true

Number.MIN_VALUE;
// 5e-324
Number.MIN_VALUE > 0;
// true

Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_SAFE_INTEGER; // -9007199254740991

// Number对象部署了自己的toString方法，用来将一个数值转为字符串形式
console.log((10).toString()); // '10'

// toString方法可以接受一个参数，表示输出的进制。
// 如果省略这个参数，默认将数值先转为十进制，再输出字符串；
// 否则，就根据参数指定的进制，将一个数字转化成某个进制的字符串。
console.log((10).toString(2)); // '1010'
console.log((10).toString(8)); // '112'
console.log((10).toString(16)); // 'a'

// 除了为10加上括号，还可以在10后面加两个点，JavaScript 会把第一个点理解成小数点（即10.0），
// 把第二个点理解成调用对象属性，从而得到正确结果。
console.log((10).toString(2)); // '1010'
console.log((10.5).toString()); // '10.5'

// 通过方括号运算符也可以调用toString方法。
console.log((10)["toString"](2)); // '1010'

// toFixed()方法先将一个数转为指定位数的小数，
// 然后返回这个小数对应的字符串。
console.log((10).toFixed(2)); // '10.00'
console.log((10.005).toFixed(2)); // '10.01'

// toExponential方法用于将一个数转为科学计数法形式。
console.log((10).toExponential()); // '1e+1'
console.log((10).toExponential(1)); // '1.0e+1'
console.log((10).toExponential(2)); // '1.00e+1'

console.log((1234).toExponential()); // '1.234e+3'
console.log((1234).toExponential(1)); // '1.2e+3'
console.log((1234).toExponential(2)); // '1.23e+3'

// Number.prototype.toPrecision()方法用于将一个数转为指定位数的有效数字
console.log((12.34).toPrecision(1)); // '1e+1'
console.log((12.34).toPrecision(2)); // '12'
console.log((12.34).toPrecision(3)); // '12.3'
console.log((12.34).toPrecision(4)); // '12.34'
console.log((12.34).toPrecision(5)); // '12.340'

// Number.prototype.toLocaleString()方法接受一个地区码作为参数，
// 返回一个字符串，表示当前数字在该地区的当地书写形式。
console.log((123).toLocaleString("zh-Hans-CN-u-nu-hanidec")); // '一二三'

// 该方法还可以接受第二个参数配置对象，用来定制指定用途的返回字符串。该对象的style属性指定输出样式，
// 默认值是decimal，表示输出十进制形式。如果值为percent，表示输出百分数
console.log((123).toLocaleString("zh-Hans-CN", { style: "percent" })); // '12,300%'

// 如果style属性的值为currency，则可以搭配currency属性，输出指定格式的货币字符串形式
console.log(
  (123).toLocaleString("zh-Hans-CN", { style: "currency", currency: "CNY" })
); // ￥123.00
console.log(
  (123).toLocaleString("de-DE", { style: "currency", currency: "EUR" })
); // 123,00 €
console.log(
  (123).toLocaleString("en-US", { style: "currency", currency: "USD" })
); // $123.00

Number.prototype.add = function (x) {
  return this + x;
};
console.log((8)["add"](2)); // 10
console.log((8).add(3)); // 11
Number.prototype.subtract = function (x) {
  return this - x;
};

console.log((8).add(3).subtract(1)); // 10

Number.prototype.iterate = function () {
  var result = [];
  for (var i = 0; i <= this; i++) {
    result.push(i);
  }
  return result;
};
console.log((8).iterate()); // [0, 1, 2, 3, 4, 5, 6, 7, 8]