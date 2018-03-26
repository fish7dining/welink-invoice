async function request(options, postData, protocol, cb) {
  var http = require('http');
  if (protocol === 'https') {
    http = require('https');
  }

  const promiseA = new Promise(((resolve, reject) => {
    var req1 = http.request(options, (res1) => {
      res1.setEncoding('utf-8');
      res1.on('data', (chunk) => {
        try {
          const chunkObj = JSON.parse(chunk);
          if (chunkObj && (chunkObj.data || chunkObj.user)) {
            resolve(chunk);
            return;
          } else {
            resolve('error');
          }
        } catch (e) {
          resolve('error');
        }
      });
    });

    postData && req1.write(postData);

    req1.on('error', (e) => {
      console.log(`exception:${e.message}`);
    });

    req1.end();
  }));

  promiseA.then(result => {
    cb(result);
  });

}

module.exports = request;
