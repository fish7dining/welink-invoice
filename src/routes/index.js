/**
 * 路由配置文件
 * 如果需要按需加载，可使用asyncComponent加载，用法请参考README.md文件
*/
import Home from './Home';
import asyncComponent from './AsyncComponent';
import matchUrlComponent from './MatchUrlComponent';

// webpackChunkName 可指定模块名称，访问路由按需加载
const routes = [
  { path: '/', defaultComponent: Home, exact: true },
  { path: '/editor', component: asyncComponent(() => import(/* webpackChunkName: 'welinkUI' */ './Editor')) }
];

routes[0].component = matchUrlComponent(routes);

export default routes;
