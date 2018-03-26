let configs = {};
/**
 * 前端基本配置文件
 */
if (process.env.NODE_ENV === 'production') {
  configs = {
    env: 'production',
    domain: 'http://3ms.huawei.com',
    prefix: {
      graphql: 'http://w3m.huawei.com'
    }
  };
} else if (process.env.NODE_ENV === 'uat') {
  configs = {
    env: 'uat',
    domain: 'http://3ms-beta.huawei.com',
    prefix: {
      graphql: 'http://w3m-beta.huawei.com'
    }
  };
} else {
  /* 开发环�?*/
  const serverConfig = require('./server.config');
  const domain = `http://dev.huawei.com:${serverConfig.port}`;
  configs = {
    env: 'uat',
    domain,
    prefix: {
      graphql: domain
    }
  };
}

const {
  domain,
  prefix,
  env
} = configs;

module.exports = {
  domain, // 登录跳转需�?
  sessionTTL: 24 * 60 * 60 * 1000,
  urls: { // 接口地址配置，本地使用node代理请求
    graphql: prefix.graphql
  },
  env
};
