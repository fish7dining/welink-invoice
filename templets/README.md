# 模板生成命令行工�?

通过命令行可生成Action，Component，Reducer和Route模板，代替人工新增或复制文件或目录，减少冗余操作，提高工作效率�?
开发者可根据自身需要配置个性模板�?

## 配置

在templets/config.js中，配置指定源文件目录以及目标文件目录，根据项目需要可以用户自定义。以下是默认配置项：
```js
module.exports = {
  route: {
    src: './templets/route',
    target: './src/routes'
  },
  component: {
    src: './templets/component',
    target: './src/components'
  },
  action: {
    src: './templets/action',
    target: './src/actions'
  },
  reducer: {
    src: './templets/reducer',
    target: './src/reducers'
  }
};
```

## 使用

执行命令
```
  npm run add <command> <name>
```
- command config.js配置的key�?
- name 生成对应文件夹或文件名称（一般action生成的是一个文件，组件生成的是文件夹，生成的文件目录在对应config.js配置的value值中指定，如配置 src �?target 值）

新增路由，名称为`DemoRoute`
```
  npm run add route DemoRoute
```

新增组件，名称为`DemoComponent`
```
 npm run add component DemoComponent
```

新增Action，名称为`DemoAction`
```
  npm run add action DemoAction
```

新增 Reducer，名称为`DemoReducer`
```
  npm run add reducer DemoReducer
```

## 帮助

```
  npm run add -- help
```

## 模板说明

比如：templets/component/index.js 

```jsx
import React from 'react';
import './index.less';

export default class __Name__ extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>__Name__</div>
    );
  }
};
```
`备注：__Name__ 执行命令的name，输出模板指目标文件时会自动替换`  
