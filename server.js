const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const errorOverlayMiddleware = require('react-error-overlay/middleware');
const chalk = require('chalk');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./webpack.config');
const webconfig = require('./config/web.config');
const CheckLogin = require('./src/core/checkLogin');
const proxy = require('http-proxy-middleware');
const { port, host } = require('./config/server.config');
var { packageAlias, versionCode } = require('./pluginAndroid.json'); // 默认取安卓配置文件数�?

new WebpackDevServer(webpack(config), {
  hot: true,
  compress: true,
  historyApiFallback: true,
  contentBase: 'build/',
  publicPath: `/apps/${packageAlias}/${versionCode}/`,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: {
    colors: true
  },
  setup(app) {
    // app => express
    app.use(errorOverlayMiddleware());
    app.use(cookieParser());
    app.keys = ['HWKM_SESSION_CAT']; // cookie加密短语
    app.use(session({
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: webconfig.sessionTTL },
      secret: 'hwkm_sid'
    }));
    // 中间件，用户登录
    app.use(async (req, res, next) => {
      await CheckLogin(req, res, {
        domainAuth: true,
        domain: webconfig.domain
      });
      next();
    });
    // 代理配置Demo http://localhost:3000/km/m/w3bulletin/graphql -> http://3ms-beta.huawei.com/km/m/w3bulletin/graphql
    app.use('/km/m/w3bulletin/graphql', proxy({ target: 'http://3ms-beta.huawei.com', changeOrigin: true }));
    app.use('/m/Service/MEAPRESTServlet', proxy({ target: 'http://w3m-beta.huawei.com', changeOrigin: true }));
  }
}).listen(port, host, (err, result)=> {
  if (err) {
    return console.log(err);
  }
  return console.log(chalk.green(`Listening at: http://${host}:${port}
Local development environment access path: http://${host}:${port}/apps/${packageAlias}/${versionCode}/html/index.html`));
});
