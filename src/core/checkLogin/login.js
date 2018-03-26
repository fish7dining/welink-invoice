var Contants = require('./contants');
var Request = require('./request');

// 获取w3登录信息
function getLogin(req, res, type, cb) {
  const { cookies } = req,
    url = 'w3.huawei.com';
  let loginBody = `{"token":{"hwsso_am":"${cookies['hwsso_am']
  }","hwsso_login":"${cookies['hwsso_login']
  }","hwssot":"${cookies['hwssot']
  }","hwssot3":"${cookies['hwssot3']
  }","login_logFlag":"${cookies['login_logFlag']
  }","login_sid":"${cookies['login_sid']
  }","login_sip":"${cookies['login_sip']
  }","login_uid":"${cookies['login_uid']
  }","LtpaToken":"${cookies['LtpaToken']
  }","w3Token":"${cookies['w3Token']}"},"url":"${url}"}`;

  let options = {
    host: Contants.loginHost.replace('https://', ''),
    port: 443,
    rejectUnauthorized: false, // 忽略证书
    path: '/login/rest/token',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  };

  if (type === 'unp') {
    // uniportal 登录
    options = {
      host: Contants.uniportalHost.replace('https://', ''),
      port: 443,
      rejectUnauthorized: false, // 忽略证书
      path: '/uniportal/rest/token',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };

    loginBody = `{"token":{"hwsso_am":"${cookies['hwsso_am']
    }","hwsso_uniportal":"${cookies['hwsso_uniportal']
    }","hwssot":"${cookies['hwssot']
    }","hwssotinter3":"${cookies['hwssotinter3']
    }","hwssotinter":"${cookies['hwssotinter']
    }","w3Token":"${cookies['w3Token']}"},"url":"${url}"}`;
  }

  return new Promise(((resolve, reject) => {
    Request(options, loginBody, 'https', (result) => {
      console.log('==get w3 userinfo==');
      if (result === 'error') {
        typeof cb === 'function' && cb('error');
      } else {
        req.session.userInfo = result;
        if (type === 'unp') {
          req.session.hwssotinter = cookies['hwssotinter'];
        } else {
          req.session.hwssoLogin = cookies['hwsso_login'];
        }
        options.domainAuth && (req.session.kmHiSession = cookies[Contants.hw3msCookieKey]); // 域认�?
        req.userInfo = JSON.parse(result);
        resolve();
      }
    });
  }));

}

// 获取3ms登录信息
const getLogin3ms = async function (req, res, redirectUrl) {
  console.log('==get 3ms userinfo==');
  const opts = {
    host: process.env.NODE_ENV === 'production' ? '3ms.huawei.com' : '3ms-beta.huawei.com',
    port: 80,
    path: '/hi/restnew/v1/mgroup/Get/curHiUser?app_id=45',
    headers: {
      cookie: req.cookies,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  };
  return new Promise(((resolve, reject) => {
    Request(opts, '', '', (result) => {
      if (result === 'error') {
        // 重新到w3取登录信�?
        getLogin(req, res, '', (error) => {
          if (error) {
            res.redirect(redirectUrl);
          }
        });
        return;
      }
      let resultObj = null;
      resultObj = JSON.parse(result);
      resultObj.data.uid = resultObj.data.w3_id;
      const data = {
        'user': {
          'uid': resultObj.data.w3_id,
          'displayNameCn': resultObj.data.name_cn,
          'displayNameEn': resultObj.data.name_en,
          'givenName': resultObj.data.name_en
        }
      };
      req.session.userInfo3ms = JSON.stringify(data);
      req.userInfo = data;
      resolve();
    });
  }));

};

module.exports = {
  getLogin,
  getLogin3ms
};
