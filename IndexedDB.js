// IndexedDB API

// 1. 概述
// 通俗地说，IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，
// 还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），
// 更接近 NoSQL 数据库。

/*
IndexedDB 具有以下特点。

（1）键值对储存。 IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。
    对象仓库中，数据以“键值对”的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。

（2）异步。 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。
    异步设计是为了防止大量数据的读写，拖慢网页的表现。

（3）支持事务。 IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，
    数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

（4）同源限制。 IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

（5）储存空间大。 IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。

（6）支持二进制储存。 IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。
*/

// 2. 基本概念
/*
IndexedDB 是一个比较复杂的 API，涉及不少概念。它把不同的实体，抽象成一个个对象接口。学习这个 API，就是学习它的各种对象接口。

- 数据库：IDBDatabase 对象
- 对象仓库：IDBObjectStore 对象
- 索引： IDBIndex 对象
- 事务： IDBTransaction 对象
- 操作请求：IDBRequest 对象
- 指针： IDBCursor 对象
- 主键集合：IDBKeyRange 对象
*/

//（1）数据库
// 数据库是一系列相关数据的容器。每个域名（严格的说，是协议 + 域名 + 端口）都可以新建任意多个数据库。

// IndexedDB 数据库有版本的概念。同一个时刻，只能有一个版本的数据库存在。如果要修改数据库结构（新增或删除表、索引或者主键），
// 只能通过升级数据库版本完成。

//（2）对象仓库
// 每个数据库包含若干个对象仓库（object store）。它类似于关系型数据库的表格。

//（3）数据记录
// 对象仓库保存的是数据记录。每条记录类似于关系型数据库的行，但是只有主键和数据体两部分。主键用来建立默认的索引，必须是不同的，
// 否则会报错。主键可以是数据记录里面的一个属性，也可以指定为一个递增的整数编号。

/* {id: 1, text: 'foo'}; */

// 上面的对象中，id属性可以当作主键。

// 数据体可以是任意数据类型，不限于对象。

//（4）索引
// 为了加速数据的检索，可以在对象仓库里面，为不同的属性建立索引。

//（5）事务
// 数据记录的读写和删改，都要通过事务完成。事务对象提供error、abort和complete三个事件，用来监听操作结果。

// 3. 操作流程
// IndexedDB 数据库的各种操作，一般是按照下面的流程进行的。

// 3.1 打开数据库
// 使用 IndexedDB 的第一步是打开数据库，使用indexedDB.open()方法。

var request = window.indexedDB.open(databaseName, version);

// 这个方法接受两个参数，第一个参数是字符串，表示数据库的名字。如果指定的数据库不存在，就会新建数据库。
// 第二个参数是整数，表示数据库的版本。如果省略，打开已有数据库时，默认为当前版本；新建数据库时，默认为1。

// indexedDB.open()方法返回一个 IDBRequest 对象。这个对象通过三种事件error、success、upgradeneeded，
// 处理打开数据库的操作结果。

//（1）error 事件
// error事件表示打开数据库失败;

request.onerror = function (event) {
  console.log("数据库打开报错");
};

//（2）success 事件
// success事件表示成功打开数据库。

var db;

request.onsuccess = function (event) {
  db = request.result;
  console.log("数据库打开成功");
};
// 这时，通过request对象的result属性拿到数据库对象。

//（3）upgradeneeded 事件
// 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。

var db;

request.onupgradeneeded = function (event) {
  db = event.target.result;
};

// 这时通过事件对象的target.result属性，拿到数据库实例。

// 3.2 新建数据库
// 新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。不同之处在于，后续的操作主要在upgradeneeded事件
// 的监听函数里面完成，因为这时版本从无到有，所以会触发这个事件。

// 通常，新建数据库以后，第一件事是新建对象仓库（即新建表）。

request.onupgradeneeded = function (event) {
  db = event.target.request;
  var objectStore = db.createObjectStore("person", { keyPath: "id" });
};

// 上面代码中，数据库新建成功以后，新增一张叫做person的表格，主键是id。

// 更好的写法是先判断一下，这张表格是否存在，如果不存在再新建。
request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore;
  if (!db.objectStoreNames.contains("person")) {
    objectStore = db.createObjectStore("person", { keyPath: "id" });
  }
};

// 主键（key）是默认建立索引的属性。比如，数据记录是{ id: 1, name: '张三' }，那么id属性可以作为主键。
// 主键也可以指定为下一层对象的属性，比如{ foo: { bar: 'baz' } }的foo.bar也可以指定为主键。

// 如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。

var objectStore = db.createObjectStore("person", { autoIncrement: true });

// 上面代码中，指定主键为一个递增的整数。

// 新建对象仓库以后，下一步可以新建索引。

request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore = db.createObjectStore("person", { keyPath: "id" });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("email", "email", { unique: true });
};

// 上面代码中，IDBObject.createIndex()的三个参数分别为索引名称、索引所在的属性、配置对象（说明该属性是否包含重复的值）。

// 3.3 新增数据
// 新增数据指的是向对象仓库写入数据记录。这需要通过事务完成。
function add() {
  var request = db
    .transaction(["person"], "readwrite")
    .objectStore("person")
    .add({ id: 1, name: "张三", age: 24, email: "zhangsan@gmail.com" });

  request.onsuccess = function (event) {
    console.log("数据写入成功");
  };

  request.onerror = function (event) {
    console.log("数据写入失败");
  };
}

add();

// 上面代码中，写入数据需要新建一个事务。新建时必须指定表格名称和操作模式（“只读”或“读写”）。新建事务以后，通
// 过IDBTransaction.objectStore(name)方法，拿到 IDBObjectStore 对象，再通过表格对象的add()方法，向表格写入一条记录。

// 写入操作是一个异步操作，通过监听连接对象的success事件和error事件，了解是否写入成功。

// 3.4 读取数据
// 读取数据也是通过事务完成。
function read() {
  var transaction = db.transaction(["person"]);
  var objectStore = transaction.objectStore("person");
  var request = objectStore.get(1);

  request.onerror = function (event) {
    console.log("事务失败");
  };

  request.onsuccess = function (event) {
    if (request.result) {
      console.log("Name: " + request.result.name);
      console.log("Age: " + request.result.age);
      console.log("Email: " + request.result.email);
    } else {
      console.log("未获取数据记录");
    }
  };
}

read();

// 上面代码中，objectStore.get()方法用于读取数据，参数是主键的值。

// 3.5 遍历数据
// 遍历数据表格的所有记录，要使用指针对象 IDBCursor。

function readAll() {
  var objectStore = db.transaction("person").objectStore("person");

  objectStore.openCurson().onsuccess = function (event) {
    var cursor = event.target.result;

    if (cursor) {
      console.log("ID: " + cursor.key);
      console.log("Name: " + cursor.value.name);
      console.log("Age: " + cursor.value.age);
      console.log("Email: " + cursor.value.email);
    } else {
      console.log("没有更多数据了");
    }
  };
}

readAll();
// 上面代码中，新建指针对象的openCursor()方法是一个异步操作，所以要监听success事件。

// 3.6 更新数据
// 更新数据要使用IDBObject.put()方法。

function update() {
  var request = db
    .transaction(["person"], "readwrite")
    .objectStore("person")
    .put({ id: 1, name: "李四", email: "lisi@email.com" });

  request.onsuccess = function (event) {
    console.log("数据更新成功");
  };

  request.onerror = function (event) {
    console.log("数据更新失败");
  };
}

update();

// 上面代码中，put()方法自动更新了主键为1的记录

// 3.7 删除数据
// IDBObjectStore.delete()方法用于删除记录。

function remove() {
  var request = db
    .transaction(["person"], "readwrite")
    .objectStore("person")
    .delete(1);

  request.onsuccess = function (event) {
    console.log("数据删除成功");
  };
}

remove();

// 3.8 使用索引
// 索引的意义在于，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）。

// 假定新建表格的时候，对name字段建立了索引。
objectStore.createIndex("name", "name", { unique: false });

// 现在，就可以从name找到对应的数据记录了。
var transaction = db.transaction(["person"], "readonly");
var store = transaction.objectStore("person");
var index = store.index("name");
var request = index.get("李四");

request.onsuccess = function (event) {
  var result = event.target.result;
  if (result) {
    // ...
  } else {
    // ...
  }
};

// 4. indexedDB 对象
// 浏览器原生提供indexedDB对象，作为开发者的操作接口。

// 4.1 indexedDB.open()
// indexedDB.open()方法用于打开数据库。这是一个异步操作，但是会立刻返回一个 IDBOpenDBRequest 对象。
var openRequest = window.indexedDB.open("test", 1);
// 上面代码表示，打开一个名为test、版本为1的数据库。如果该数据库不存在，则会新建该数据库。

// open()方法的第一个参数是数据库名称，格式为字符串，不可省略；第二个参数是数据库版本，是一个大于0的正整数（0将报错），
// 如果该参数大于当前版本，会触发数据库升级。第二个参数可省略，如果数据库已存在，将打开当前版本的数据库；
// 如果数据库不存在，将创建该版本的数据库，默认版本为1。

// 打开数据库是异步操作，通过各种事件通知客户端。下面是有可能触发的4种事件。
/*
- success：打开成功。
- error：打开失败。
- upgradeneeded：第一次打开该数据库，或者数据库版本发生变化。
- blocked：上一次的数据库连接还未关闭。
*/

// 第一次打开数据库时，会先触发upgradeneeded事件，然后触发success事件。

// 根据不同的需要，对上面4种事件监听函数。

var openRequest = indexedDB.open("test", 1);
var db;

openRequest.onupgradeneeded = function (event) {
  console.log("Upgrading");
};

openRequest.onsuccess = function (event) {
  console.log("Success!");
  db = openRequest.result;
};

openRequest.onerror = function (event) {
  console.log("Error");
  console.log(e);
};

// 上面代码有两个地方需要注意。首先，open()方法返回的是一个对象（IDBOpenDBRequest），监听函数就定义在这个对象上面。
// 其次，success事件发生后，从openRequest.result属性可以拿到已经打开的IndexedDB数据库对象。

// 4.2 indexedDB.deleteDatabase()
/*
indexedDB.deleteDatabase()方法用于删除一个数据库，参数为数据库的名字。它会立刻返回一个IDBOpenDBRequest对象，
然后对数据库执行异步删除。删除操作的结果会通过事件通知，IDBOpenDBRequest对象可以监听以下事件。

- success：删除成功
- error：删除报错
*/
var DBDeleteRequest = window.indexedDB.deleteDatabase("demo");

DBDeleteRequest.onerror = function (event) {
  console.log("Error");
};

DBDeleteRequest.onsuccess = function (event) {
  console.log("Success");
};

// 调用deleteDatabase()方法以后，当前数据库的其他已经打开的连接都会接收到versionchange事件。

// 注意，删除不存在的数据库并不会报错。

// 4.3 indexedDB.cmp()
// indexedDB.cmp()方法比较两个值是否为 indexedDB 的相同的主键。它返回一个整数，表示比较的结果：
// 0表示相同，1表示第一个主键大于第二个主键，-1表示第一个主键小于第二个主键。

window.indexedDB.cmp(1, 2); // -1

// 注意，这个方法不能用来比较任意的 JavaScript 值。如果参数是布尔值或对象，它会报错

window.indexedDB.cmp(1, true); // 报错
window.indexedDB.cmp({}, {}); // 报错

// 5. IDBRequest 对象
/*
IDBRequest 对象表示打开的数据库连接，indexedDB.open()方法和indexedDB.deleteDatabase()方法会返回这个对象。
数据库的操作都是通过这个对象完成的。

这个对象的所有操作都是异步操作，要通过readyState属性判断是否完成，如果为pending就表示操作正在进行，如果为done就表示操作完成，
可能成功也可能失败。

操作完成以后，触发success事件或error事件，这时可以通过result属性和error属性拿到操作结果。如果在pending阶段，
就去读取这两个属性，是会报错的。

IDBRequest 对象有以下属性。

IDBRequest.readyState：等于pending表示操作正在进行，等于done表示操作正在完成。
IDBRequest.result：返回请求的结果。如果请求失败、结果不可用，读取该属性会报错。
IDBRequest.error：请求失败时，返回错误对象。
IDBRequest.source：返回请求的来源（比如索引对象或 ObjectStore）。
IDBRequest.transaction：返回当前请求正在进行的事务，如果不包含事务，返回null。
IDBRequest.onsuccess：指定success事件的监听函数。
IDBRequest.onerror：指定error事件的监听函数。
IDBOpenDBRequest 对象继承了 IDBRequest 对象，提供了两个额外的事件监听属性。

IDBOpenDBRequest.onblocked：指定blocked事件（upgradeneeded事件触发时，数据库仍然在使用）的监听函数。
IDBOpenDBRequest.onupgradeneeded：upgradeneeded事件的监听函数。
*/

// 6. IDBDatabase 对象
// 打开数据成功以后，可以从IDBOpenDBRequest对象的result属性上面，拿到一个IDBDatabase对象，它表示连接的数据库。
// 后面对数据库的操作，都通过这个对象完成。

var db;
var DBOpenRequest = window.indexedDB.open("demo", 1);

DBOpenRequest.onerror = function (e) {
  console.error("Error");
};

DBOpenRequest.onsuccess = function (event) {
  db = DBOpenRequest.result;
  // ...
};

// 6.1 属性
/*
IDBDatabase 对象有以下属性。

- IDBDatabase.name：字符串，数据库名称。
- IDBDatabase.version：整数，数据库版本。数据库第一次创建时，该属性为空字符串。
- IDBDatabase.objectStoreNames：DOMStringList 对象（字符串的集合），包含当前数据的所有 object store 的名字。
- IDBDatabase.onabort：指定 abort 事件（事务中止）的监听函数。
- IDBDatabase.onclose：指定 close 事件（数据库意外关闭）的监听函数。
- IDBDatabase.onerror：指定 error 事件（访问数据库失败）的监听函数。
- IDBDatabase.onversionchange：数据库版本变化时触发（发生upgradeneeded事件，或调用indexedDB.deleteDatabase()）。
*/

// 下面是objectStoreNames属性的例子。该属性返回一个 DOMStringList 对象，包含了当前数据库所有对象仓库的名称（即表名），
// 可以使用 DOMStringList 对象的contains方法，检查数据库是否包含某个对象仓库。
if (!db.objectStoreNames.contains("firstOS")) {
  db.createObjectStore("firstOS");
}

// 上面代码先判断某个对象仓库是否存在，如果不存在就创建该对象仓库。

// 6.2 方法
/*
IDBDatabase 对象有以下方法。

- IDBDatabase.close()：关闭数据库连接，实际会等所有事务完成后再关闭。
- IDBDatabase.createObjectStore()：创建存放数据的对象仓库，类似于传统关系型数据库的表格，返回一个 IDBObjectStore 对象。
  该方法只能在versionchange事件监听函数中调用。
- IDBDatabase.deleteObjectStore()：删除指定的对象仓库。该方法只能在versionchange事件监听函数中调用。
- IDBDatabase.transaction()：返回一个 IDBTransaction 事务对象。
*/

// 下面是createObjectStore()方法的例子。
var request = window.indexedDB.open("demo", 2);

request.onupgradeneeded = function (event) {
  var db = event.target.result;

  db.onerror = function (event) {
    console.log("error");
  };

  var objectStore = db.createObjectStore("items");

  // ...
};

// 上面代码创建了一个名为items的对象仓库，如果该对象仓库已经存在，就会抛出一个错误。
// 为了避免出错，需要用到下文的objectStoreNames属性，检查已有哪些对象仓库。

// createObjectStore()方法还可以接受第二个对象参数，用来设置对象仓库的属性。
db.createObjectStore("test", { keyPath: "email" });
db.createObjectStore("test2", { autoIncrement: true });

// 上面代码中，keyPath属性表示主键（由于主键的值不能重复，所以上例存入之前，必须保证数据的email属性值都是不一样的），默认值为null；
// autoIncrement属性表示，是否使用自动递增的整数作为主键（第一个数据记录为1，第二个数据记录为2，以此类推），默认为false。
// 一般来说，keyPath和autoIncrement属性只要使用一个就够了，如果两个同时使用，表示主键为递增的整数，且对象不得缺少keyPath指定的属性。

// 下面是deleteObjectStore()方法的例子。
var dbName = "sampleDB";
var dbVersion = 2;
var request = indexedDB.open(dbName, dbVersion);

request.onupgradeneeded = function (event) {
  var db = request.result;
  if (event.oldVersion < 1) {
    db.createObjectStore("store1");
  }

  if (event.oldVersion < 2) {
    db.deleteObjectStore("store1");
    db.createObjectStore("store2");
  }
};

// 下面是transaction()方法的例子，该方法用于创建一个数据库事务，返回一个 IDBTransaction 对象。向数据库添加数据之前，必须先创建数据库事务。
var t = db.transaction(["items"], "readwrite");

// transaction()方法接受两个参数：第一个参数是一个数组，里面是所涉及的对象仓库，通常是只有一个；第二个参数是一个表示操作类型的字符串。
// 目前，操作类型只有两种：readonly（只读）和readwrite（读写）。添加数据使用readwrite，读取数据使用readonly。第二个参数是可选的，
// 省略时默认为readonly模式。
