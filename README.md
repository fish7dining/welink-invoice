
# WeLink React框架

一�?weui 设计语言(适配welink风格)�?React 实现�?

## 特�?

- 适配WeLink交互语言和视觉风格�?
- 开箱即用的高质�?React 组件�?
- 本地开发自动检测Welink JSAPI新版本并集成到开发环境�?
- 使用 eslint，按照规则给出报告的代码检测工�?避免低级错误和统一代码的风格�?
- 基于 npm + webpack + react + redux + less + jsapi + [weui](https://github.com/weui/react-weui)（mit license），适配WeLink风格 的快速开发本地化的框架�?

## 支持环境

* 现代手机浏览器，安卓 5.0 以上，ios 8 以上�?
* 支持本地使用谷歌浏览器调试�?

## 安装

安装依赖包，建议使用[welink-react-cli](nkgtsv5910rhl.huawei.com/npmpage/package/@huawei/welink-react-cli)初始化项�?

```bash
# 配置 npm register 内网�?
npm config set registry http://nkweb-sit.huawei.com/npm/
```

```bash
# 安装命令行工�?
npm install @huawei/welink-react-cli -g
```

```bash
# 新建项目，不含weui react组件Demo，用于开发项目使�?
$ mkdir welink-react-demo && cd welink-react-demo
$ welink-react-init
```

## 本地开�?

1、启动项目，将会自动检查jsapi是否有新版本，若有新版本，将自动下载并将文件复制至`build/common`路径�?

```bash
npm start
```
项目启动完会自动用浏览器打开连接：http://dev.huawei.com:3000/apps/welinkapp/1/html/index.html


2、默认开�?000端口，可通过根目录`config/server.config.js`修改

3、检查并安装最新版本Welink JSAPI，将会把最新的文件复制至`bulid/common`，供开发环境使�?

```bash
npm run jsapi
```

4、构建项目打包，提供生产和uat打包功能

```bash
npm run build -- prod
npm run build -- uat
```

5.eslint 代码规范检�?

```bash
npm run lint
```

## 配置本地代理服务

目的：解决本地调试接口可能存在跨域问题，便于本地调试接口

方法：本地开发框架集成webpack-dev-server，可在项目根目录�?<code>server.js</code> 中添加对应的代理配置信息，如�?

```javascript
app.use('/km/m/w3bulletin/graphql', proxy({ target: 'http://3ms-beta.huawei.com', changeOrigin: true }));
```

即本地通过请求 `http://localhost:3000/km/m/w3bulletin/graphql`，将代理去请�?`http://3ms-beta.huawei.com/km/m/w3bulletin/graphql`，并返回数据�?

了解更多代理配置信息，可参考[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)�?


## 示例

引用 weui 组件
```jsx
import React from 'react';
import {
  Tab,
  TabBody,
  TabBar,
  TabBarItem,
  TabBarIcon,
  TabBarLabel,
  Article
} from '@huawei/react-weui';
```

使用 AsyncComponent 按需加载组件
```jsx
import Home from './Home';
import asyncComponent from './AsyncComponent';

// webpackChunkName 指定webpack打包模块名称，访问路由按需加载
const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/welink-ui', component: asyncComponent(() => import(/* webpackChunkName: 'welink-ui' */ './WelinkUI')) }
];

export default routes;
```

## 添加路由

�?`src/routes/index.js` 配置，如果添加路由`'/welink-ui'`，添加对应的 `component` 逻辑组件，指定模块生成的名称 `webpackChunkName: 'welinkUI'`

```js
import Home from './Home';
import asyncComponent from './AsyncComponent';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/welink-ui', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './WelinkUI')) }
];

export default routes;
```

## 国际�?

输出src/locales中common.json配置的国际化字段appName信息，国际化初始化判断请参�?[src/entry.js](src/entry.js)

使用�?

```jsx
import i18n from 'i18n';
i18n.t('common:appName');
```

## 项目结构

```text
|—�?build
│ �?├── common // jsapi文件目录
│ �?└── apps   // 打包生成的app目录
|—�?config
│ �?├── web.config.js // 项目配置目录，区分生产、uat和开发环境配�?
│ �?└── server.config.js // 开发环境设置，可修项目名称、端口号�?
├── package.json // node相关环境的配置文�?
├── server.js // 本地开发服务器
├── src // 源代码目�?
│ �?├── actions // action控制中心
│ �?├── components // 页面组件
│ �?├── core 
│ �?    └── checkLogin // sso登录
│ �?├── locales // 国际化信�?
│ �?    ├── en_US // 英文配置信息
│ �?    └── zh_CN // 中文配置信息
│ �?├── reducers // 存放state
│ �?├── routes // 组件路由
│ �?    ├── Home // 首页路由
│ �?    ├── AsyncComponent.js // 异步react组件HOC
│ �?    └── index.js // 路由定义
│ �?├── templets // 模板文件
│ �?├── utils // 提供一些小工具
│ �?└── App.js // 根react组件
│ �?├── app.less // 公共样式
│ �?├── entry.js // webpack打包入口，获取当前app语言
│ �?└── i18n.js // 国际化处�?
├── test // jest测试�?
│ �?└── __snapshots__
├── templets // 模板文件
├── tools // 打包相关 
└── webpack.config.js // webpack配置文件

```

## 模板生成

通过命令行可生成Action，Component，Reducer和Route模板，代替人工新增或复制文件或目录，减少冗余操作，提高工作效率�?

示例：生成一个指定组�?

```bash
  npm run add component demo
```

帮助说明

```bash
  npm run add -- help
```

具体请参�?[templets](./templets/README.md)

## 链接

- [Welink JSAPI说明文档](http://3ms.huawei.com/km/static/welink/doc/h5/)
- [Welink JSAPI Demo](http://nkgtsv5910rhl.huawei.com/npmpage/package/@huawei/welink-jsapi)
- [Welink React Cli](nkgtsv5910rhl.huawei.com/npmpage/package/@huawei/welink-react-cli)

