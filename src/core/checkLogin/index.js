var Login = require('./login');
var Contants = require('./contants');

var checkLogin = async function (req, res, options) {
  if (!options || !options.domain) {
    res.status(500).send('sso middleware require domain option!');
    return;
  }
  if (!req.session) {
    res.status(500).send('please require `koa-session` module and  app.use(session(app)) ');
    return;
  }
  const { cookies } = req;
  const kmHiSession = req.get(Contants.hw3msCookieKey);

  const loninHost = options.loginType === 'uniportal' ? `${Contants.uniportalHost}/uniportal` : `${Contants.loginHost}/login`;
  const redirectUrl = `${loninHost}/?redirect=${encodeURIComponent(options.domain + req.originalUrl)}`;

  if ((cookies['hwsso_login'] && cookies['login_logFlag'] === 'in') || (options.loginType === 'uniportal' && cookies['hwssotinter']) || (kmHiSession && options.domainAuth)) {
    if ((cookies['hwsso_login'] && req.session.hwssoLogin === cookies['hwsso_login']) || (cookies['hwssotinter'] && req.session.hwssotinter === cookies['hwssotinter']) || (kmHiSession && kmHiSession === req.session.kmHiSession && req.session.userInfo3ms && options.domainAuth)) {
      if (kmHiSession && req.session.user_info_3ms && options.loginType !== 'uniportal') {
        req.userInfo = JSON.parse(req.session.userInfo3ms);
      } else {
        req.userInfo = JSON.parse(req.session.userInfo);
      }

    } else {
      if (kmHiSession && options.loginType !== 'uniportal') {
        // 获取3ms用户信息
        await Login.getLogin3ms(req, res, redirectUrl);
      } else {
        // w3取登录信�?
        const type = options.loginType === 'uniportal' ? 'unp' : '';
        await Login.getLogin(req, res, type, (error) => {
          if (error) {
            res.redirect(redirectUrl);
          }
        });
      }
    }
  } else {
    res.redirect(redirectUrl);

  }

};

module.exports = checkLogin;
