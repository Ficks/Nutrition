// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Settings from '@/config/settings.js'
import Axios from 'axios'
import store from '@/vuex/store'

Vue.prototype.$http = Axios;

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
