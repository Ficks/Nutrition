// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Settings from '@/config/settings.js'
import Axios from 'axios'
import store from '@/vuex/store'


Vue.config.productionTip = false
import {
  ToastPlugin,
  LoadingPlugin,
  Scroller
} from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.component('scroller', Scroller)

Vue.use(Vuex)
// 直接使用 WeUI 样式并引入 fastclick 会导致一些点击问题，VUX 组件内部已经做了相关处理。
const FastClick = require('fastclick')
FastClick.attach(document.body)



router.beforeEach((to, from, next) => {
  var userid = store.state.userid;
  var Token = store.state.Token;

  if (userid == "") { //没有token或者要去的path不是login就清除userinfo和token，并跳转到登录页面
    $.ajax({
      url: "http://www.xyys.ltd/api/WeChat/MoniWeChatLogin",
      type: "get",
      data: {
        referid: "2",
        openid: "3",
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
            url: 'http://www.xyys.ltd' + fd.url,
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
    console.log("我已经登录")
    next();
  }
});

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
