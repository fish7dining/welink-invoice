import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as home from '../../actions/home';
import * as global from '../../actions/global';

import './Home.less';
import openNewView from '../../utils/openNewView';
import List from '../../components/List';

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home, ...global }, dispatch)
)
export default class Home extends React.Component {

  async componentWillMount() {
    const userInfo = await this.props.getUserInfo();
    console.log(userInfo, 'window.HWH5.userInfo mock data.');
    const { homeInfo, dataList } = this.props;
    if (!homeInfo) {
      this.props.getHomeInfo().then((data)=>{
        const { title } = data;
        document.title = title;
      });
    }
    // fetch请求Demo，本地请求proxy服务器，在server.js中配置，解决本地调试接口跨域问题
    if (dataList.length === 0) {
      this.props.getFetchDemo();
    }
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '发票查询' });
  }

  more(key) {
    this.props.setInvoivceIndex(key);
    this.props.setPath(null);
    openNewView('/editor');
  }

  render() {
    const list = this.props.dataList;
    return (
      <div className="app">
        {
          list.map((item, index)=>(
            <List 
              more={this.more.bind(this)}
              key={index}
              index={index}
              companyName={item.companyName}
              taxNumber={item.taxNumber} 
              bank={item.bank}
            />
          ))
        }
      </div>
    );
  }
};

Home.propTypes = {
  homeInfo: PropTypes.object,
  dataList: PropTypes.array,
  getHomeInfo: PropTypes.func,
  getUserInfo: PropTypes.func,
  getFetchDemo: PropTypes.func,
  setInvoivceIndex: PropTypes.func
};
