console.log(Math.E); // 2.718281828459045
console.log(Math.LN2); // 0.6931471805599453
console.log(Math.LN10);
console.log(Math.LOG2E);
console.log(Math.LOG10E);
console.log(Math.PI);
console.log(Math.SQRT1_2);
console.log(Math.SQRT2);
/*
Math.E：常数e。
Math.LN2：2 的自然对数。
Math.LN10：10 的自然对数。
Math.LOG2E：以 2 为底的e的对数。
Math.LOG10E：以 10 为底的e的对数。
Math.PI：常数π。
Math.SQRT1_2：0.5 的平方根。
Math.SQRT2：2 的平方根
*/

/*
Math.abs()：绝对值
Math.ceil()：向上取整
Math.floor()：向下取整
Math.max()：最大值
Math.min()：最小值
Math.pow()：幂运算
Math.sqrt()：平方根
Math.log()：自然对数
Math.exp()：e的指数
Math.round()：四舍五入
Math.random()：随机数
*/
console.log(Math.abs(1)); // 1
console.log(Math.abs(-1)); // 1

// Math.max方法返回参数之中最大的那个值，Math.min返回最小的那个值。
// 如果参数为空, Math.min返回Infinity, Math.max返回-Infinity
console.log(Math.max(2, -1, 5)); // 5
console.log(Math.min(2, -1, 5)); // -1
console.log(Math.max()); // -Infinity
console.log(Math.min()); // Infinity

console.log(Math.floor(3.2)); // 3
console.log(Math.floor(-3.2)); // -4
console.log(Math.ceil(3.2)); // 4
console.log(Math.ceil(-3.2)); // -3

// 这两个方法可以结合起来，实现一个总是返回数值的整数部分的函数
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
console.log(ToInteger(3.2)); // 3
console.log(ToInteger(3.5)); // 3
console.log(ToInteger(3.8)); // 3
console.log(ToInteger(-3.2)); // -3
console.log(ToInteger(-3.5)); // -3
console.log(ToInteger(-3.9)); // -3

console.log(Math.round(0.1)); // 0
console.log(Math.round(0.5)); // 1
console.log(Math.round(0.6)); // 1
// 等同于
// Math.floor(x + 0.5);
console.log(Math.round(-1.1)); // -1
console.log(Math.round(-1.5)); // -1
console.log(Math.round(-1.6)); // -2

console.log(Math.pow(2, 2)); // 4
console.log(Math.pow(2, 3)); // 8
console.log(Math.sqrt(4)); // 2
console.log(Math.sqrt(-4)); //NaN
console.log(Math.log(Math.E)); // 1
console.log(Math.log(10)); // 2.302585092994046

// 如果要计算以10为底的对数，可以先用Math.log求出自然对数，然后除以Math.LN10；
// 求以2为底的对数，可以除以Math.LN2。
console.log(Math.log(100) / Math.LN10); // 2
console.log(Math.log(8) / Math.LN2); // 3

// Math.exp方法返回常数e的参数次方
console.log(Math.exp(1)); // 2.718281828459045
console.log(Math.exp(3)); // 20.085536923187668

// Math.random()返回0到1之间的一个伪随机数，可能等于0，但是一定小于1
console.log(Math.random());

// 任意范围的随机数生成函数如下
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

console.log(getRandomArbitrary(1.5, 6.5));

// 任意范围的随机整数生成函数如下
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 6));

// 返回随机字符的例子如下。
function random_str(length) {
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ALPHABET += "abcdefghijklmnopqrstuvwxyz";
  ALPHABET += "0123456789-_";
  var str = "";
  for (var i = 0; i < length; i++) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}
console.log(random_str(6));

/* 
Math.sin()：返回参数的正弦（参数为弧度值）
Math.cos()：返回参数的余弦（参数为弧度值）
Math.tan()：返回参数的正切（参数为弧度值）
Math.asin()：返回参数的反正弦（返回值为弧度值）
Math.acos()：返回参数的反余弦（返回值为弧度值）
Math.atan()：返回参数的反正切（返回值为弧度值）
*/
console.log(Math.sin(0)); // 0
console.log(Math.cos(0)); // 1
console.log(Math.tan(0)); // 0

console.log(Math.sin(Math.PI / 2)); // 1

console.log(Math.asin(1)); // 1.5707963267948966
console.log(Math.acos(1)); // 0
console.log(Math.atan(1)); // 0.7853981633974483
