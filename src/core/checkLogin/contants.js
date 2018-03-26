var hw3msCookieKey = '2D-4A-29-3E-6C-E6-DF-76-9C-49-A8-81-85-AA-1A-B2';
var loginHost = 'https://login-beta.huawei.com';
var uniportalHost = 'https://uniportal-beta.huawei.com';

if (process.env.NODE_ENV === 'production') {
  hw3msCookieKey = '2D-4A-29-3E-6C-E6-DF-76-1D-A3-0E-21-2C-88-0E-05';
  loginHost = 'https://login.huawei.com';
  uniportalHost = 'https://uniportal.huawei.com';
}

module.exports = {
  hw3msCookieKey,
  loginHost,
  uniportalHost
};
