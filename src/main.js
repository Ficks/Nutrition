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
import { DatetimePlugin } from 'vux'
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
    console.log("获取参数传给后台：");
    var UrlData = getUrlCs();
    console.log(UrlData)
    // $.ajax({
    //   url: Settings.server + "/api/WeChat/WeChatLogin",
    //   type: "get",
    //   data: {
    //     referid: UrlData.referid,
    //     code: UrlData.code
    //   },
    //   success: function (data) {
    //     console.log("请求后台授权成功：");
    //     console.log(data);
    //     if (data.code !== 20000) {
    //       this.$vux.toast.show({
    //         type: 'error',
    //         text: data.error
    //       })
    //       return;
    //     }
    //     //成功的处理
    //     var d = {
    //       userid: data.Data.userid,
    //       Token: data.Token,
    //       headurl: data.Data.headurl,
    //       username: data.Data.nickname
    //     };
    //     store.state.userid = d.userid;
    //     store.state.Token = d.Token;
    //     store.state.headurl = d.headurl;
    //     store.state.username = d.username;

    //     Vue.prototype.$http = function (fd) {
    //       return $.ajax({
    //         url: Settings.server + fd.url,
    //         headers: {
    //           "userid": d.userid,
    //           "Token": d.Token,
    //           "Content-Type": "application/json;charset=UTF-8"
    //         },
    //         type: fd.type,
    //         data: fd.data || {},
    //         success: function (data) {
    //           //成功的处理
    //           fd.success(data);
    //         },
    //         error: function () {
    //           //错误处理
    //           fd.error(data) || "";
    //         }
    //       });
    //     }
    //     next();
    //   }
    // })

    // 上面的是正式服务器

    $.ajax({
      url: Settings.server + "/api/WeChat/MoniWeChatLogin",
      type: "get",
      data: {
        referid: "2",
        openid: "okXzt0jXqVFnR4cY7YjBxvzB0W00",
        nickname: "4",
        headurl: "5"
      },
      success: function (data) {
        //成功的处理
        var d = {
          userid: data.Data.userid,
          Token: data.Token
        };
        store.state.userid = d.userid;
        store.state.Token = d.Token;

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
            error: function () {
              //错误处理
              fd.error(data) || "";
            }
          });
        }

        next();
      },
      error: function () {
        //错误处理
      }
    });
  } else { //如果满足条件就什么都不做，
    next();
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
