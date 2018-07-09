// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Settings from '@/config/settings.js'
import 'signalr';
import Axios from 'axios'
import store from '@/vuex/store'
import filters from '@/filters/filters'
import {
  DatetimePlugin
} from 'vux'
Vue.use(DatetimePlugin)
import {
  ConfirmPlugin
} from 'vux'
Vue.use(ConfirmPlugin)
Vue.config.productionTip = false
import {
  ToastPlugin,
  LoadingPlugin,
  Scroller
} from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.component('scroller', Scroller)
Vue.prototype.$Axios = Axios;

Vue.use(Vuex)
// 直接使用 WeUI 样式并引入 fastclick 会导致一些点击问题，VUX 组件内部已经做了相关处理。
const FastClick = require('fastclick')
FastClick.attach(document.body)
// 注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}
// 服务器地址
Vue.prototype.$HTTPURL = Settings.server + '/';
var UrlData = getUrlCs();

function getUrlCs(name) {
  var href = location.href;
  if (href.indexOf('?') < -1) return;
  var query = href.substr(href.indexOf('?') + 1)
  query = query.split('&');
  let data = {};
  for (let i = 0; i < query.length; i++) {
    let key = query[i].substr(0, query[i].indexOf('='));
    let value = query[i].substr(query[i].indexOf('=') + 1);
    data[key] = value;
  }

  return data;
}
router.beforeEach((to, from, next) => {
  var userid = store.state.userid;
  var Token = store.state.Token;
  if (userid == "") { //没有token或者要去的path不是login就清除userinfo和token，并跳转到登录页面
    var userData = sessionStorage.getItem('userData');
    if (userData) {
      // 已经登录的
      console.log('------------我已经登陆了不在请求登陆接口-----')
      userData = JSON.parse(userData);
      ajaxConfig(userData);
      next();
      shareFx();
    } else {
      // 第一次登录
      loginUp(Settings.isWechat, next)
    }
  } else { //如果满足条件就什么都不做，
    next();
    shareFx();
  }
});

Vue.prototype.$getDate = function (AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期
  var d = dd.getDate();
  m = m >= 10 ? m : '0' + m;
  d = d >= 10 ? d : '0' + d;
  return y + "-" + m + "-" + d;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})


// 登录  正式还是测试
function loginUp(n, next) {
  var upData = {};
  var url = ""
  // 登录
  if (n) {
    url = "/api/WeChat/WeChatLogin";
    upData = {
      referid: UrlData.referid,
      code: UrlData.code
    };
  } else {
    url = "/api/WeChat/MoniWeChatLogin"
    upData = {
      referid: "2",
      openid: "okXzt0jXqVFnR4cY7YjBxvzB0W00",
      nickname: "4",
      headurl: "5"
    }
  }
  console.log("请求微信登陆")
  console.log(Settings.server + url);
  $.ajax({
    url: Settings.server + url,
    type: "get",
    data: upData,
    success: function (data) {
      console.log(data);
      //成功的处理
      loginFn(data, next)
    },
    error: function () {
      //错误处理
    }
  });
}

// 登录之后的设置
function loginFn(data, next) {
  if (data.Code !== 20000) {
    Vue.$vux.toast.show({
      type: 'warn',
      text: data.error
    })
    return;
  }
  //成功的处理
  var d = {
    userid: data.Data.userid,
    Token: data.Token,
    headurl: data.Data.headurl,
    username: data.Data.nickname
  };
  ajaxConfig(d);
  sessionStorage.setItem('userData', JSON.stringify(d))
  next();
  shareFx();
}


// 配置ajax
function ajaxConfig(d) {
  store.state.userid = d.userid;
  store.state.Token = d.Token;
  store.state.headurl = d.headurl;
  store.state.username = d.username;
  Vue.prototype.$http = function (fd) {
    return $.ajax({
      url: Settings.server + fd.url,
      headers: {
        "userid": d.userid,
        "Token": d.Token,
        "Content-Type": "application/json;charset=UTF-8"
      },
      type: fd.type,
      data: fd.data || {},
      success: function (data) {
        //成功的处理
        fd.success(data);
      },
      error: function (data) {
        //错误处理
        fd.error(data) || "";
      }
    });
  }
}

function shareFx() {
  if (!Settings.isWechat) return;
  //本页面url
  var url = location.href;
  //分享页面url
  var shareLink = location.href;
  var upUrl = Settings.server + "/api/wechat/GetShareParam";
  console.log("分享链接")
  $.ajax({
    type: "get",
    data: {
      url: url
    },
    headers: {
      "userid": store.state.userid,
      "Token": store.state.Token,
      "Content-Type": "application/json;charset=UTF-8"
    },
    url: upUrl, //发送请求获得配置参数
    success: function (data) {
      console.log(data.Data)
      shareLink = data.Data.link;
      wx.config({
        debug: false,
        appId: data.Data.appId, //appid
        timestamp: data.Data.timestamp, //时间戳
        nonceStr: data.Data.noncestr, //随机串
        signature: data.Data.signature, //签名
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
      });
      wx.ready(function () {
        var link = window.location.href;
        var protocol = window.location.protocol;
        var host = window.location.host;
        //分享朋友圈
        wx.onMenuShareTimeline({
          title: '小易饮食',
          link: shareLink,
          imgUrl: 'http://www.xyys.ltd/images/logo.jpg',
          trigger: function (res) {
            //alert('点击了分享'); 
          },
          success: function (res) {
            //alert('shared success'); 
          },
          cancel: function (res) {
            //alert('shared cancle'); 
          },
          fail: function (res) {
            //alert(JSON.stringify(res)); 
          }
        }); //分享给好友 
        wx.onMenuShareAppMessage({
          title: '小易饮食',
          desc: '带给你健康每一天-小易饮食！',
          link: shareLink,
          imgUrl: 'http://www.xyys.ltd/images/logo.jpg',
          type: 'link',
          dataUrl: '',
          success: function () {
            //alert('shared success'); 
          },
          cancel: function () {
            //alert('shared cancle');
          }
        });
        wx.error(function (res) {
          // alert(res.errMsg);
        });
      });
    },
    error: function (xhr, status, error) { //alert(status); //alert(xhr.responseText);
      console.log(xhr);
    }
  })
}
