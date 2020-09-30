# NodeJS 中间层开发规范

> 此规范制定了 NodeJS 中间层代码的标准规范和习惯，以确保共享的 NodeJs 代码具有高程度的技术互通性和可维护性。

## 前言

> **强烈要求本地开启 ESlint，上传代码前需通过 ESLint 检查、修复代码问题**
> **强烈要求本地开启 ESlint，上传代码前需通过 ESLint 检查、修复代码问题**
> **强烈要求本地开启 ESlint，上传代码前需通过 ESLint 检查、修复代码问题**

> **重要**
> 除非有 CodeViewer 和保证团队代码格式完全，否则请勿因为 ESLint "恼人"的提示而禁用，除非能保证团队代码格式化配置完全一致！

## 目录

-   结构化规范
    -   目录文件夹及子文件规范
-   命名规范
    -   文件命名规范
    -   普通变量命名规范
    -   常量命名规范
    -   函数命名规范
-   编码规范
    -   严格模式
    -   其他

---

## 结构化规范

### 目录文件夹及子文件规范

```
egg-init-template
├── .eslintrc.js（ESLint配置）
├── prettier.config.js（VSCode prettier配置）
├── package.json
├── app.js（入口文件，可选）
├── app
|   ├── router.js（路由入口）
|   ├── router（路由文件夹，可选）
│   |   ├── admin
│   |   |   └── topics.js
│   |   └── worker
│   |       └── topics.js
│   ├── core（基类）
│   |   ├── base_controller
│   |   └── base_service
│   ├── controller
│   |   ├── admin
│   |   |   └── topics.js
│   |   └── worker
│   |       └── topics.js
│   ├── service (可选)
│   |   └── topics.js
│   ├── rpc (可选)
│   |   └── topics.js
│   ├── middleware (可选)
│   |   ├── error_handler.js
│   |   └── notfound_handler.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── upload（上传文件夹）
│   ├── view (可选)
│   |   └── home.tpl
│   ├── enum (枚举，可选)
│   |   └── topics.js
│   ├── utils (工具类，可选)
│   |   └── common.js
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
└── config
    ├── plugin.js（声明插件）
    ├── config.default.js（默认配置）
    ├── config.prod.js（生产环境配置）
    ├── config.sit.js （测试环境配置）
    └── config.local.js （本地环境配置）
```

---

## 命名规范

### 文件命名规范

-   命名必须是跟需求的内容相关的词，比如说我想申明一个中间件，用来表示错误处理，那么我们可以这样定义 "error_handler.js";

### 普通变量命名规范

-   命名方法 ：驼峰命名法
    > 通常来说，为开发方便作统一约定，外部数据(接口，URL，etc)允许使用下划线命名变量，内部数据一般使用**小驼峰**。
-   命名规范 ：

1. 命名必须是跟需求的内容相关的词，比如说我想申明一个变量，用来表示我的学校，那么我们可以这样定义 const mySchool = "我的学校";
2. 命名是复数的时候需要加 s,比如说我想申明一个数组，表示很多人的名字，那么我们可以这样定义 const names = new Array();
3. 简写需使用约定俗成的简写且不能有歧义，如，current cur/curr; index idx;previous prev

### 常量命名规范

-   命名方法 : 全部大写
-   命名规范 : 使用大写字母和下划线来组合命名，下划线用以分割单词。
-   全局变量应当是常量

```js
const MAX_COUNT = 10;
const URL = 'https://www.xxx.com/';
```

### 函数命名规范

> 通常情况下，为开发方便作统一约定，尽量使用**有意义的命名**，便于理解当前函数处理的作用。

-   驼峰式命名，统一使用动词或者动词+名词形式

```js
  //bad
  go、nextPage、show、open、login
  // good
  jumpPage、getCars、authorizeWechat
```

-   私有函数名以下划线（\_）开头

```js
//bad
authorizeWechat;
// good
_authorizeWechat;
```

-   init、refresh 单词除外
-   尽量使用常用单词开头（set、get、go、can、has、is）

---

## 编码规范

### 尽量按照 ESLint 格式要求编写代码

> 本模版引入使用 eslint-config-egg 规范，具体配置请查阅 Github 和 eslintrc.js

-   Tab 缩进（4 格）
-   单引号

```js
//bad
let accesstoken = "string";

// good
let accesstoken = 'string';
```

-   代码末尾不需要分号

```js
//bad
const { ctx } = this;
ctx.renderJSON(list);

// good
const { ctx } = this
ctx.renderJSON(list)
```

-   函数小括号后空格

```js
//bad
constructor(ctx){
    super(ctx)
}

// good
constructor(ctx) {
    super(ctx)
}
```

### 严格模式

设立"严格模式"的目的，主要有以下几个：

-   消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
-   消除代码运行的一些不安全之处，保证代码运行的安全；
-   提高编译器效率，增加运行速度；
-   为未来新版本的 Javascript 做好铺垫。

> 所有文件必须以严格模式 `'use strict' ` 执行

### 其他

-   调试信息 console.log() debugger 使用完及时删除
