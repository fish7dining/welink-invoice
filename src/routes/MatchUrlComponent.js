/**
 * 首页路由匹配url参数值，访问效果同hash路由一�?
 * 如访问路由：/html/index.html?url=%2Fdemo，页面效果同�?html/index.html#/demo
 * 目前邮件链接点击跳WeLink页面的方案不支持hash #�?可提�?html/index.html?url=%2Fdemo
 */
import React from 'react';

/**
 * 根据链接中的参数�?获取参数�?
 * @param name
 * @returns
 */
function getQueryValue(name) {
  var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

const matchUrlComponent = (routes) => (
  class MatchUrlComponent extends React.Component {
    state = {
      Component: null
    }

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }
      let url = getQueryValue('url');
      if (url) {
        url = decodeURIComponent(url);
        let _routeindex = null;
        for (let i = 0; i < routes.length; i++) {
          if (url === routes[i].path) {
            _routeindex = i;
            break;
          }
        }
        if (_routeindex !== null) {
          this.setState({
            Component: routes[_routeindex].component
          });
          return;
        }
      }
      // 如果url没有指定，则默认显示首页数据
      this.setState({
        Component: routes[0].defaultComponent
      });
    }

    hasLoadedComponent() {
      return this.state.Component !== null;
    }

    render() {
      const { Component } = this.state;
      return (Component) ? <Component {...this.props} /> : null;
    }
  }
);

export default matchUrlComponent;
