import React from 'react';
import './index.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as home from '../../actions/home';
import * as global from '../../actions/global';
import PropTypes from 'prop-types';
var QRCode = require('qrcode.react');

@connect(
  state => ({ ...state.home }),
  dispatch => bindActionCreators({ ...home, ...global }, dispatch)
)
export default class Editor extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
    window.HWH5.navTitle({ title: '发票查询' });
  }

  utf16to8(str) {
    var out, 
      i, 
      len, 
      c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  } 

  change() {
    const { dataList, index } = this.props;
    const myArr = dataList[index];
    const arr = [];
    arr[0] = this.utf16to8(myArr.companyName);
    arr[1] = myArr.taxNumber;
    arr[2] = this.utf16to8(myArr.address);
    arr[3] = myArr.tell;
    arr[4] = this.utf16to8(myArr.bank);
    arr[5] = myArr.num;

    const path = arr.join('/');
    console.log(path);
    this.props.setPath(path);
  }

  render() {
    console.log(this.props, '-- this.props');
    const { index, path, dataList } = this.props;
    const data = dataList[index];
    return (
      <div>
        <div className="weui-cells weui-cells_form forms">
          <div className="weui-cell">
            <div className="weui-cell__hd">
              <span className="weui-span name">名称:</span>
            </div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="name_input">{data.companyName}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd">
              <span className="weui-span tax">税号:</span>
            </div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="num_input">{data.taxNumber}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span address">单位地址:</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="add_input">{data.address}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span phoneNumber">电话号码:</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="tell_input">{data.tell}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span bank">开户银�?</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="bank_input">{data.bank}</span>
            </div>
          </div>
          <div className="weui-cell">
            <div className="weui-cell__hd"><span className="weui-span bankAccount">银行账户:</span></div>
            <div className="weui-cell__bd">
              <span className="weui-input" id="num_input">{data.num}</span>
            </div>
          </div>
        </div>
        {
          !path &&
          <div className="page__bd page__bd_spacing" onClick={() => this.change()}>
            <a className="weui-btn weui-btn_primary save">生成二维�?/a>
          </div>
        }
        <div id="myimage">
          {
            path && <QRCode value={path} />
          }
        </div>
        <div className="my-footer" >
          {
            path && <p className="my-footer__text">如有问题请咨询SSE�?span>0086-755-28560168</span></p>
          }
        </div>
        <div className="weui-footer weui-footer_fixed-bottom">
          <p className="weui-footer__links">
            <a href="javascript:home();" className="weui-footer__link">WeLink</a>
          </p>
          <p className="weui-footer__text">Copyright &copy; 2015-2017 WeLink</p>
        </div>
      </div>
    );
  }
};

Editor.propTypes = {
  index: PropTypes.number,
  dataList: PropTypes.array,
  setPath: PropTypes.func,
  path: PropTypes.string
};
