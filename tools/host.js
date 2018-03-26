/**
 * window设置host文件为：127.0.0.1 dev.huawei.com，让浏览器支持访问：dev.huawei.com
 */
const hostile = require('hostile');
import chalk from 'chalk';

async function host() {
  console.log(`${chalk.green("Check host's config:")}`);
  const host = '127.0.0.1',
    domain = 'dev.huawei.com';

  // Chect host config
  const setHost = await new Promise(function (resolve, reject) {
    // If `preserveFormatting` is true, then include comments, blank lines and other
    // non-host entries in the result
    const preserveFormatting = false;
    hostile.get(preserveFormatting, function (err, lines) {
      let _set = 0;
      if (err) {
        console.error(err.message);
      }
      for (let i = 0; i < lines.length; i++) {
        if (typeof lines[i] === 'object' && lines[i][0] === host && lines[i][1] === domain) {
          _set = 1;
          break;
        }
      }
      resolve(_set);
    });
  });

  // Set Host
  if (setHost !== 1) {
    await new Promise(function (resolve, reject) {
      hostile.set(host, domain, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log(chalk.green('Set /etc/hosts `127.0.0.1 dev.huawei.com` successfully!'));
          resolve(null);
        }
      });
    });
  } else {
    console.log("Host's config is up to date.");
  }
};

export default host;
