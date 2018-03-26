import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

/*
* 获取npm依赖包的版本号，返回当前版本和最新版�?
*/
function getNpmVersion(packageName) {

  let current = null,
    latest = null;

  try {
    // 获取当前版本信息
    const packageJsonPath = path.resolve(
      process.cwd(),
      'node_modules',
      packageName,
      'package.json'
    );
    const currentPackageJSON = require(packageJsonPath);
    current = currentPackageJSON.version;

    // 查询最新版本信�?
    latest = execSync(`npm view ${packageName} dist-tags.latest`).toString().trim();
    console.log(`${chalk.green('Check version:')}`);
    if (current === latest) {
      console.log(`${packageName} current version is up to date.`);
    } else {
      console.log(`${packageName}  ${current} �?${chalk.green(latest)}`);
    }
  } catch (e) {
    console.log(chalk.greenBright(`Please make sure you had installed the package ${packageName}. npm install ${packageName}`));
  }
  return { current, latest };
}

export default getNpmVersion;
